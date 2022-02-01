const {check, validationResult } = require('express-validator');

// VALIDATION FOR USER SIGNUP

exports.validateSignupRequest =[
   check('username')
   .notEmpty()
   .withMessage("username Is Required"),
   check('password')
   .notEmpty()
   .withMessage("password Is Required"),
   check('Ein')
   .notEmpty()
   .withMessage("Please Enter a Ein"),
   check('Address')
   .notEmpty()
   .withMessage("Please Enter a Address"),
   check('city')
   .notEmpty()
   .withMessage("Please Enter a city"),
   check('email')
   .isEmail()
   .withMessage("Please Enter a email"),
   check('state')
   .notEmpty()
   .withMessage("Please Enter a state"),
   check('zip')
   .notEmpty()
   .withMessage("Please Enter a zip"),
   check("phone")
   .isLength({ min: 10 })
   .withMessage("Please Enter a Valid phone number")
];

// VALIDATION FOR SIGNUP

exports.validateSigninRequest = [
    check('username').not()
    .isEmpty()
    .withMessage('Valid username is required'),
    check('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 character long')
];

// VALIDATION FOR IS REQUEST VALID OR NOT

exports.isRequestValidated = (req, res, next) => {
    const errors = validationResult(req);
    if(errors.array().length > 0){
        return res.status(400).json({ error: errors.array()[0].msg })
    }
    next();
}