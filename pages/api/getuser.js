import User from "@/models/User";
import connetDb from "@/middleware/mongoose";
import jsonwebtoken from "jsonwebtoken";

const handler = async (req, res) => {
  if (req.method == "POST") {
    try {
      let token = req.body.token;
      let user = jsonwebtoken.verify(token, process.env.JWT_SECRET);
      let dbuser = await User.findOne({ email: user.email });
      const { name, email, phone, address, pincode } = dbuser;
      res.status(200).json({ name, email, phone, address, pincode });
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
