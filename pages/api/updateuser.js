import User from "@/models/User";
import connetDb from "@/middleware/mongoose";
import jsonwebtoken from "jsonwebtoken";

const handler = async (req, res) => {
  if (req.method == "POST") {
    try {
      let token = req.body.token;
      let user = jsonwebtoken.verify(token, process.env.JWT_SECRET);
      await User.findOneAndUpdate(
        { email: user.email },
        {
          address: req.body.address,
          pincode: req.body.pincode,
          phone: req.body.phone,
          name: req.body.name,
        }
      );
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error,
        message: "Internal server error!",
      });
    }
  } else {
    res.status(400).json({ error: "error" });
  }
};

export default connetDb(handler);
