import Product from "@/models/Product";
import connetDb from "@/middleware/mongoose";

const handler = async (req, res) => {
  if (req.method == "POST") {
    try {
      for (let i = 0; i < req.body.length; i++) {
        await Product.findByIdAndUpdate(req.body[i]._id, req.body[i]);
      }
      res.status(200).json({ success: "Success" });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error,
        message: "Internal server error!",
      });
    }
  } else {
    res.status(400).json({ error: "This is not allowed" });
  }
};

export default connetDb(handler);
