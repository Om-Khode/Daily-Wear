import Order from "@/models/Order";
import connetDb from "@/middleware/mongoose";
import jsonwebtoken from "jsonwebtoken";

const handler = async (req, res) => {
  try {
    const token = req.body.token;
    const data = jsonwebtoken.verify(token, process.env.JWT_SECRET);
    let orders = await Order.find({ email: data.email, status: "Paid" });
    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error,
      message: "Internal server error!",
    });
  }
};

export default connetDb(handler);
