---
title: Introduction
description: Introduction to RFDF and its documentation
---

The Robot Feature Description Format is a way for:

- Robot developers to define the various features present in their robot and describe ways to use them.
- Robot app developers to make their apps work on various robots and figure out if a particular robot has the necessary features to support the app.

RFDF uses [KDL](https://kdl.dev/).

## How To Use

Currently only ROS 2 is supported.

### For Robot Developers

See [Using RFDF with ROS 2](/guides/ros2/) and the [example package](https://github.com/spikonado/rfdf/tree/main/rfdf_example_ros2).

- Create a `rfdf.kdl` file and pass its path to the `rfdf_publisher` node through its `rfdf_file` parameter.
- The description will be automatically published on the `/robot_features` topic.

### For Robot App Developers

Subscribe to the `/robot_features` topic and use one of our parsers in your apps's code to read the document.

## Per-Section Documentation

You can find documentation for various sections of the format on these wiki pages:

- [`movement {}`](../movement)
