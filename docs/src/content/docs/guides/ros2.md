---
title: Using RFDF with ROS 2
description: Publish an RFDF document from a robot and consume it from a ROS 2 app
---

RFDF currently ships a ROS 2 publisher and an example package. The format itself is [KDL](https://kdl.dev/).

## For robot developers

1. Write a `rfdf.kdl` file that describes the robot. See the [movement](/specification/movement/) section and the [example package](https://github.com/spikonado/rfdf/tree/main/rfdf_example_ros2).
2. Run `rfdf_publisher` with the `rfdf_file` parameter set to that path. The node reads the file once at startup and publishes it on `robot_features` with transient-local (latched) QoS.

The example launch file does this for you:

```yaml title="rfdf_publisher_launch.yaml"
launch:
  - arg:
      name: 'rfdf_file'
      default: '$(find-pkg-share rfdf_example_ros2)/description/rfdf.kdl'

  - node:
      pkg: 'rfdf_publisher'
      exec: 'rfdf_publisher'
      name: 'rfdf_publisher'
      param:
        - name: 'rfdf_file'
          type: 'str'
          value: '$(var rfdf_file)'
```

:::tip[Example package]{icon="code-branch"}
[`rfdf_example_ros2`](https://github.com/spikonado/rfdf/tree/main/rfdf_example_ros2) installs a sample `description/rfdf.kdl` and the launch file above.
:::

:::caution
The publisher parameter is `rfdf_file` (a filesystem path), not `description`.
:::

## For app developers

Subscribe to `/robot_features` (`rfdf_interfaces/msg/Rfdf`). The `rfdf` field is the KDL document as a string. Use a KDL parser in the app to decide whether the robot has the features you need.

Transient-local QoS is required to receive the last published document if you subscribe after the publisher has started.
