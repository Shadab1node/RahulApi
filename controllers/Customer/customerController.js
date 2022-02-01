const Customer=require("../../models/Customer/customerModel")
const customerOtp=require("../../models/Customer/customerOtp")
const bcrypt=require("bcrypt");
const jwt = require("jsonwebtoken");
const otpGenerator = require('otp-generator');
const nodemailer = require("nodemailer");

const createToken = (wholeseler) => {
    return jwt.sign({ wholeseler}, process.env.PROCESS_KEY, {
      expiresIn: "7d",
    });
  };

// REGISTER CUSTOMER

exports.customeradd=async (req,res)=>{
        const email = req.body.email;
        const checkUser = await Customer.findOne({ email: email });
        if (checkUser) {
        return res
        .status(400)
        .json({ errors: [{ msg: "Email is already taken" }] });
    }
        const username = req.body.username;
        const checkUsername = await Customer.findOne({ username: username });
        if (checkUsername) {
        return res
        .status(400)
        .json({ errors: [{ msg: "username is already taken" }] });
    }
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.body.password, salt);
        try {
        const customer=new Customer(req.body)
        customer.password=hash
        customer.save()
        return res.status(200).json({msg:"Customer register successfully",customer})
    } 
        catch (error) {
        console.log(error);
        return res.status(400).json({msg:"something went wrong"})     
    }
}

// CUSTOMER LOGIN

exports.customerlogin = async (req, res) => {
        const { username, password } = req.body;
        try{
        const admin = await Customer.findOne({ username });
        if(admin){
        const matched = await bcrypt.compare(password, admin.password);
        console.log(matched);
        if(matched) {
        const token = createToken(admin);
        return res
        .status(200)
        .json({ msg: "You have login successfully", token, admin });
        } 
        else 
        {
        return res
        .status(401)
        .json({ errors: [{ msg: "Password is not correct" }] });
        }
        } 
        else 
        {
        return res.status(404).json({ errors: [{ msg: "Username not found" }] });
        }
        } 
        catch (error) 
        {
        console.log(error);
        return res.status(400).json({ error: error.message });
    }
};

//   CUSTOMER SEND MAIL BY OTP

  exports.customermail = async (req, res) => {
        const { email } = req.body;
        if (email === "") {
        res.status(500).json({ msg: "Email is required" });
        } 
        else
        {
        try{
        const checkUser = await Customer.findOne({ email });
        if (checkUser){
        const OTP = otpGenerator.generate(6, { digits: true, upperCaseAlphabets: false, specialChars: false });
        let otpData = new customerOtp({
        email,
        otp: OTP
        });
        let optResponse = await otpData.save();
        mailer(email, otpData.otp);
        return res.status(200).json({ msg: "OTP sended to your mail" });
        }else {
        return res.status(400).json({ errors: [{ msg: "Email not exist" }] });
        }
        }catch (error) {
        console.log(error);
        return res.status(500).json({ errors: error });
      }
    }
  };
  
// WAY TO TRANSPORT A MAIL

const mailer =async (email, otp) => {
        var nodemailer = require("nodemailer");
        let mailTransporter = nodemailer.createTransport({
        host: "smtp.sendgrid.net",
        port: 587,
        auth: {
        user: "apikey",
        pass:
          "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",
        },
        });
        var mailOptions = {
        from: "node1flyweis@gmail.com",
        to: email,
        subject: "OTP for forgot password",
        text: otp,
        };
        mailTransporter.sendMail(mailOptions, (error, info) => {
        if(error) {
        console.log(error);
        }
        else 
        {
        console.log("Email sent: " + info.response);
      }
    });
  };

//   FORGOT PASSWORD

exports.customrforgotpassword = async (req, res) => {
        var { email, otp } = req.body;
        let code = await customerOtp.find({ email: email, otp: otp });
        if(code) {
        let currentTime = new Date().getTime();
        let diff = code.expireIn - currentTime;
        if(diff < 0) {
        return res.status(400).json({ errors: [{ msg: "Token expire" }] });
        }
        else
        {
        var email = req.body.email;
        let user = await Customer.findOne({ email });
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.body.password, salt);
        user.password = hash;
        const OTPDelete = await customerOtp.deleteMany({
          email:email
        })
        user.save();
        return res.status(200).json({ msg: "Password changes successfully" });
        }
        }else{
        return res.status(400).json({ errors: [{ msg: "Token Expired" }] });
    }
  };


// FORGOT USERNAME

exports.customerforgotusername = async (req, res) => {
    var { email, otp } = req.body;
    let code = await customerOtp.find({ email: email, otp: otp });
    if (code) {
      let currentTime = new Date().getTime();
      let diff = code.expireIn - currentTime;
      if (diff < 0) {
        return res.status(400).json({ errors: [{ msg: "Token expire" }] });
      } else {
        const username = req.body.username;
        const checkUsername = await Customer.findOne({ username: username });
        if (checkUsername) {
          return res
            .status(400)
            .json({ errors: [{ msg: "username is already taken" }] });
        }
        var email = req.body.email;
        let user = await Customer.findOne({ email });
        user.username=req.body.username
        const OTPDelete = await customerOtp.deleteMany({
          email:email
        })
        user.save();
        return res.status(200).json({ msg: "username changes successfully" });
      }
    } else {
      return res.status(400).json({ errors: [{ msg: "Token Expired" }] });
    }
  };