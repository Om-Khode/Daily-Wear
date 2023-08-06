import User from "@/models/User";
import connetDb from "@/middleware/mongoose";
import jsonwebtoken from "jsonwebtoken";
var cryptoJs = require("crypto-js");

const handler = async (req, res) => {
  if (req.method == "POST") {
    try {
      let token = req.body.token;
      let user = jsonwebtoken.verify(token, process.env.JWT_SECRET);
      let dbuser = await User.findOne({ email: user.email });
      const bytes = cryptoJs.AES.decrypt(
        dbuser.password,
        process.env.AES_SECRET
      );
      let decryptedPass = bytes.toString(cryptoJs.enc.Utf8);
      if (
        decryptedPass == '"' + req.body.password + '"' &&
        req.body.npassword == req.body.cpassword
      ) {
        await User.findOneAndUpdate(
          { email: dbuser.email },
          {
            password: cryptoJs.AES.encrypt(
              JSON.stringify(req.body.cpassword),
              process.env.AES_SECRET
            ).toString(),
          }
        );
        res.status(200).json({ success: true });
        return;
      }
      res.status(200).json({ success: false });
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
