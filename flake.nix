{
  inputs = {
    nix-ros-overlay.url = "github:lopsided98/nix-ros-overlay/master";
    nixpkgs.follows = "nix-ros-overlay/nixpkgs"; # IMPORTANT!!!
  };
  outputs =
    {
      self,
      nix-ros-overlay,
      nixpkgs,
    }:
    nix-ros-overlay.inputs.flake-utils.lib.eachDefaultSystem (
      system:
      let
        pkgs = import nixpkgs {
          inherit system;
          overlays = [ nix-ros-overlay.overlays.default ];
        };

        rosDistro = "kilted";

        rosPkgs = pkgs.rosPackages.${rosDistro};

        devTools = with pkgs; [
          cargo
          colcon
          commitlint
          bun
          gcc
          gh
          git
          git-lfs
          prek
          prettier
          python3Packages.colcon-cargo
          python3Packages.colcon-ros-cargo
          rustc
          rustfmt
        ];

        # Define the ROS environment with all necessary dependencies
        rosEnv = rosPkgs.buildEnv {
          paths = with rosPkgs; [
            ros-core
            ament-lint-common

            # Work around https://github.com/lopsided98/nix-ros-overlay/pull/624
            ament-cmake-core
            python-cmake-module

            # Dependencies from package.xml files
            rosidl-default-generators
            rosidl-default-runtime

            # Needed for rclrs, https://github.com/ros2-rust/ros2_rust/issues/557
            example-interfaces
            test-msgs
          ];
        };
      in
      {
        formatter = pkgs.nixfmt-tree;
        legacyPackages = rosPkgs;

        devShells.default = pkgs.mkShell.override { stdenv = pkgs.clangStdenv; } {
          name = "rfdf-shell";
          packages = [
            devTools
            rosEnv
          ];

          shellHook = ''
            # Setup ROS 2 shell completion
            if [[ ! $DIRENV_IN_ENVRC ]]; then
                eval "$(${pkgs.python3Packages.argcomplete}/bin/register-python-argcomplete ros2)"
                eval "$(${pkgs.python3Packages.argcomplete}/bin/register-python-argcomplete colcon)"
            fi
          '';
        };
      }
    );
  nixConfig = {
    extra-substituters = [
      "https://spikonado.cachix.org"
      "https://ros.cachix.org"
      "https://attic.iid.ciirc.cvut.cz/ros"
    ];
    extra-trusted-public-keys = [
      "spikonado.cachix.org-1:MwA4hqRN0+DdP7/UnTn0yvJgVu65S1S0QVnAnsguev4="
      "ros.cachix.org-1:dSyZxI8geDCJrwgvCOHDoAfOm5sV1wCPjBkKL+38Rvo="
      "ros:JR95vUYsShSqfA1VTYoFt1Nz6uXasm5QrcOsGry9f6Q="
    ];
  };
}
