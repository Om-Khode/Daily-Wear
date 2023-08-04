import User from "@/models/User";
import connetDb from "@/middleware/mongoose";
var CryptoJS = require("crypto-js");
var jwt = require("jsonwebtoken");
import NextCors from "nextjs-cors";

const handler = async (req, res) => {
  await NextCors(req, res, {
    // Options
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });

  if (req.method == "POST") {
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        const bytes = CryptoJS.AES.decrypt(
          user.password,
          process.env.AES_SECRET
        );
        let decryptedPass = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        if (
          req.body.email === user.email &&
          req.body.password === decryptedPass
        ) {
          var token = jwt.sign(
            { email: user.email, name: user.name },
            process.env.JWT_SECRET,
            { expiresIn: "2d" }
          );
          res.status(200).json({ success: true, token, email: user.email });
        } else {
          res
            .status(400)
            .json({ success: false, error: "Invalid Credentials" });
        }
      } else {
        res.status(400).json({ success: false, error: "User not found" });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error,
        message: "Internal server error!",
      });
    }
  } else {
    res.status(400).json({ success: false, error: "This is not allowed" });
  }
};

export default connetDb(handler);
