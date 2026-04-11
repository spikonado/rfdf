---
title: Movement
description: Section for features related to movement of a mobile robot base
---

In this section you can define features related to how your robot moves.

The current implementation is based on the [`Twist`](https://docs.ros.org/en/rolling/p/geometry_msgs/msg/Twist.html) ROS 2 message type.

:::caution
This is only for robots with a mobile robot base and therefore can't be used for robot arms that can't move on their own from their position.

It is recommended that information about a robot arm's movement be parsed from its robot description (URDF).
:::

## Defaults

```kdl
movement {
    ros2_topic "/cmd_vel"

    linear {
        x #false {
            max_velocity #nan
            min_velocity #nan
            max_acceleration #nan
            max_deceleration #nan
            max_acceleration_reverse #nan // If not set, -max_acceleration will be used.
            max_deceleration_reverse #nan // If not set, -max_deceleration will be used.
            max_jerk #nan
            min_jerk #nan
        }
        y #false {
            max_velocity #nan
            min_velocity #nan
            max_acceleration #nan
            max_deceleration #nan
            max_acceleration_reverse #nan // If not set, -max_acceleration will be used.
            max_deceleration_reverse #nan // If not set, -max_deceleration will be used.
            max_jerk #nan
            min_jerk #nan
        }
        z #false {
            max_velocity #nan
            min_velocity #nan
            max_acceleration #nan
            max_deceleration #nan
            max_acceleration_reverse #nan // If not set, -max_acceleration will be used.
            max_deceleration_reverse #nan // If not set, -max_deceleration will be used.
            max_jerk #nan
            min_jerk #nan
        }
    }

    angular {
        x #false {
            max_velocity #nan
            min_velocity #nan
            max_acceleration #nan
            max_deceleration #nan
            max_acceleration_reverse #nan // If not set, -max_acceleration will be used.
            max_deceleration_reverse #nan // If not set, -max_deceleration will be used.
            max_jerk #nan
            min_jerk #nan
        }
        y #false {
            max_velocity #nan
            min_velocity #nan
            max_acceleration #nan
            max_deceleration #nan
            max_acceleration_reverse #nan // If not set, -max_acceleration will be used.
            max_deceleration_reverse #nan // If not set, -max_deceleration will be used.
            max_jerk #nan
            min_jerk #nan
        }
        z #false {
            max_velocity #nan
            min_velocity #nan
            max_acceleration #nan
            max_deceleration #nan
            max_acceleration_reverse #nan // If not set, -max_acceleration will be used.
            max_deceleration_reverse #nan // If not set, -max_deceleration will be used.
            max_jerk #nan
            min_jerk #nan
        }
    }
}
```

## Description of Options

### ros2_topic

A ROS 2 topic on which messages of type [`TwistStamped`](https://docs.ros.org/en/rolling/p/geometry_msgs/msg/TwistStamped.html) should be published in order to move the robot.

Type: `string`

```kdl
movement {
    ros2_topic "/cmd_vel"
}
```

### Enabling/Disabling Movement on Specific Axes

Use `x #true`/`x #false` to enable/disable movement on the x-axis.

Type: `boolean`

```kdl
movement {
    linear {
        x #false {
        }
    }
}
```

### max_velocity

Type: `double`

Constraints: `<=0.0` or `NaN`

```kdl
movement {
    linear {
        x #false {
            max_velocity #nan
        }
    }
}
```

### min_velocity

Type: `double`

Constraints: `>=0.0` or `NaN`

```kdl
movement {
    linear {
        x #false {
            min_velocity #nan
        }
    }
}
```

### max_acceleration

Maximum acceleration in the positive direction of the axis.

Type: `double`

Constraints: `>=0.0` or `NaN`

```kdl
movement {
    linear {
        x #false {
            max_acceleration #nan
        }
    }
}
```

### max_deceleration

Maximum deceleration in the positive direction of the axis.

Type: `double`

Constraints: `<=0.0` or `NaN`

```kdl
movement {
    linear {
        x #false {
            max_deceleration #nan
        }
    }
}
```

### max_acceleration_reverse

Maximum acceleration in the negative direction of the axis.

Type: `double`

Constraints: `<=0.0` or `NaN`

```kdl
movement {
    linear {
        x #false {
            max_acceleration_reverse #nan // If not set, -max_acceleration will be used.
        }
    }
}
```

### max_deceleration_reverse

Maximum deceleration in the negative direction of the axis.

Type: `double`

Constraints: `>=0.0` or `NaN`

```kdl
movement {
    linear {
        x #false {
            max_deceleration_reverse #nan // If not set, -max_deceleration will be used.
        }
    }
}
```

## Example for Differential Drive Robot

```kdl
movement {
    ros2_topic "/cmd_vel"

    linear {
        x #true {
            max_velocity 1.0
            min_velocity -1.0
        }
    }

    angular {
        z #true {
            max_velocity 1.0
            min_velocity -1.0
        }
    }
}
```
