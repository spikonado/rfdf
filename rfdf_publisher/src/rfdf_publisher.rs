use anyhow::Result;
use rclrs::{
    Context, CreateBasicExecutor, Executor, IntoPrimitiveOptions, MandatoryParameter, Node,
    Publisher, RclrsError, RclrsErrorFilter, SpinOptions,
};
use rfdf_interfaces::msg::Rfdf as RfdfMsg;
use std::sync::Arc;

fn main() -> Result<(), RclrsError> {
    let context: Context = Context::default_from_env()?;
    let mut executor: Executor = context.create_basic_executor();

    let node: Node = executor.create_node("minimal_publisher")?;

    let rfdf_file_parameter: MandatoryParameter<Arc<str>> =
        node.declare_parameter("rfdf_file").mandatory()?;

    let publisher: Publisher<RfdfMsg> =
        node.create_publisher::<RfdfMsg>("robot_features".transient_local())?;

    let rfdf_file: Arc<str> = rfdf_file_parameter.get();
    let message: RfdfMsg = RfdfMsg {
        rfdf: std::fs::read_to_string(rfdf_file.as_ref()).unwrap_or_else(|e| {
            panic!(
                "Failed to read rfdf_file at path: '{}'. Due to error: '{}'",
                rfdf_file.as_ref(),
                e
            )
        }),
        ..Default::default()
    };

    publisher.publish(&message)?;

    executor.spin(SpinOptions::default()).first_error()
}
