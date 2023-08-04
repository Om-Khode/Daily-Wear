import User from "@/models/User";
import connetDb from "@/middleware/mongoose";
var CryptoJS = require("crypto-js");

const handler = async (req, res) => {
  if (req.method == "POST") {
    try {
      const { name, email } = req.body;
      let user = await User.findOne({ email: email });
      if (user) {
        res
          .status(409)
          .json({ success: false, message: "Email already exists!" });
        return;
      } else {
        user = new User({
          name,
          email,
          password: CryptoJS.AES.encrypt(
            JSON.stringify(req.body.password),
            process.env.AES_SECRET
          ).toString(),
        });
        await user.save();
        res.status(200).json({ success: "Success" });
      }
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
