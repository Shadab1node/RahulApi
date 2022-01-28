const Customer=require("../../models/Customer/customerModel")
const customerOtp=require("../../models/Customer/customerOtp")
const bcrypt=require("bcrypt");
const jwt = require("jsonwebtoken");
const otpGenerator = require('otp-generator');
const nodemailer = require("nodemailer");