import Order from "../models/order.model.js";

export async function createOrder(req, res) {
  try {
    const userId = req.user._id;
    const { orderItems } = req.body;
    if (orderItems.length === 0) {
      return res.status(400).json({
        message: "No items found in the order",
      });
    }
    const order = await Order.create({
      userId,
      orderItems,
      orderDate: new Date(),
    });

    return res.status(200).json({
      message: "Order creation successful",
      order,
    });
  } catch (error) {
    console.log(error);
  }
}

export async function fetchAllOrders(req, res) {
  try {
    const userId = req.user._id;
    const orders = await Order.find({ userId });
    if (!orders) {
      return res.status(400).json({
        message: "No orders present...pls order something first!",
      });
    }
    return res.status(200).json({
      message: "Successfully got all the orders of a particular user",
      orders,
    });
  } catch (error) {
    console.log(error);
  }
}
