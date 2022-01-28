const Wholeseler=require("../../models/wholesaler/wholesalerModel")
const bcrypt=require("bcrypt");
const jwt = require("jsonwebtoken");
const otpGenerator = require('otp-generator');
const nodemailer = require("nodemailer");
const WholesalerOtp=require("../../models/wholesaler/wholeselerOtp")

const createToken = (wholeseler) => {
    return jwt.sign({ wholeseler}, process.env.PROCESS_KEY, {
      expiresIn: "7d",
    });
  };

// REGISTER WHOLESELER

exports.addwholeseler=async (req,res)=>{
    const email = req.body.email;
    const checkUser = await Wholeseler.findOne({ email: email });
    if (checkUser) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Email is already taken" }] });
    }
    const username = req.body.username;
    const checkUsername = await Wholeseler.findOne({ username: username });
    if (checkUsername) {
      return res
        .status(400)
        .json({ errors: [{ msg: "username is already taken" }] });
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);
    try {
    const wholeseler=new Wholeseler(req.body)
    wholeseler.password=hash
    wholeseler.save()
    return res.status(200).json({msg:"wholeseler register successfully",wholeseler})
    } catch (error) {
    console.log(error);
    return res.status(400).json({msg:"something went wrong"})     
    }
}

// LOGIN WHOLESELER

exports.wholeselerlogin = async (req, res) => {
    const { username, password } = req.body;
    try {
      const admin = await Wholeseler.findOne({ username });
      if (admin) {
        const matched = await bcrypt.compare(password, admin.password);
        console.log(matched);
        if (matched) {
          const token = createToken(admin);
          return res
            .status(200)
            .json({ msg: "You have login successfully", token, admin });
        } else {
          return res
            .status(401)
            .json({ errors: [{ msg: "Password is not correct" }] });
        }
      } else {
        return res.status(404).json({ errors: [{ msg: "Username not found" }] });
      }
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error: error.message });
    }
  };

// WHOLESELER MAIL SEND USING NODEMAILER

exports.wholeselermail = async (req, res) => {
    const { email } = req.body;
    if (email === "") {
      res.status(500).json({ msg: "Email is required" });
    } else {
      try {
        const checkUser = await Wholeseler.findOne({ email });
        if (checkUser) {
        const OTP = otpGenerator.generate(6, { digits: true, upperCaseAlphabets: false, specialChars: false });

          let otpData = new WholesalerOtp({
            email,
            otp: OTP
          });
  
          let optResponse = await otpData.save();
          mailer(email, otpData.otp);
          return res.status(200).json({ msg: "OTP sended to your mail" });
        } else {
          return res.status(400).json({ errors: [{ msg: "Email not exist" }] });
        }
      } catch (error) {
        console.log(error);
        return res.status(500).json({ errors: error });
      }
    }
  };
  
// WAY TO TRANSPORT A MAIL

  const mailer = (email, otp) => {
    let mailTransporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "shadabakhtar476@gmail.com",
        pass: "razaraza",
      },
    });
    var mailOptions = {
      from: "shadabakhtar476@gmail.com",
      to: email,
      subject: "OTP mail",
      text: otp,
    };
    mailTransporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  };
  
// FORGOT ADMIN PASSWORD

  exports.wholeselerforgotpassword = async (req, res) => {
    var { email, otp } = req.body;
    let code = await WholesalerOtp.find({ email: email, otp: otp });
    if (code) {
      let currentTime = new Date().getTime();
      let diff = code.expireIn - currentTime;
      if (diff < 0) {
        return res.status(400).json({ errors: [{ msg: "Token expire" }] });
      } else {
        var email = req.body.email;
        const user = await Wholeseler.findOne({ email });
        console.log(user);
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.body.password, salt);
        user.password = hash;
        const OTPDelete = await WholesalerOtp.deleteMany({
          email:email
        })
        user.save();
        return res.status(200).json({ msg: "Password changes successfully" });
      }
    } else {
      return res.status(400).json({ errors: [{ msg: "Token Expired" }] });
    }
  };

// // FORGOT ADMIN USERNAME

  exports.wholeselerforgotusername = async (req, res) => {
    var { email, otp } = req.body;
    let code = await WholesalerOtp.find({ email: email, otp: otp });
    if (code) {
      let currentTime = new Date().getTime();
      let diff = code.expireIn - currentTime;
      if (diff < 0) {
        return res.status(400).json({ errors: [{ msg: "Token expire" }] });
      } else {
        const username = req.body.username;
        const checkUsername = await Wholeseler.findOne({ username: username });
        if (checkUsername) {
          return res
            .status(400)
            .json({ errors: [{ msg: "username is already taken" }] });
        }
        var email = req.body.email;
        let user = await Wholeseler.findOne({ email });
        user.username=req.body.username

        const OTPDelete = await WholesalerOtp.deleteMany({
          email:email
        })
        user.save();
        return res.status(200).json({ msg: "username changes successfully" });
      }
    } else {
      return res.status(400).json({ errors: [{ msg: "Token Expired" }] });
    }
  };