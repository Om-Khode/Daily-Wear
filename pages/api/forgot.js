export default function handler(req, res) {
  let email = ` We have sent you this email in response to your request to reset your password on Codesware.com. 
   
    To reset your password, please follow the link below:

    <a href="http://localhost:3000/forgot">Click here to reset your password</a>

    <br/><br/>

    We recommend that you keep your password secure and not share it with anyone. If you feel your password has been compromised, you can change it by going to your My Account Page and change your password.
    
    <br/><br/>`;

  res.status(200).json({ name: "John Doe" });
}
