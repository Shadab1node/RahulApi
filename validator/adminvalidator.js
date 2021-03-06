const {check, validationResult } = require('express-validator');

// VALIDATOR FOR ADMIN SIGNUP

exports.validateSignupRequest =[
//    check('name')
//    .notEmpty()
//    withMessage("Name Is Required"),
   check('username')
   .notEmpty()
   .withMessage("Please Enter a valid username"),
//    check("username")
//    .isLength({ min: 10 })
//    .withMessage("Please Enter a Valid number"),
   check("password")
   .isLength({ min:6 })
   .withMessage("Password must be at least 6 character long")

];

// VALIDATION FOR SIGN IN

exports.validateSigninRequest = [
    check('username')
    .notEmpty()
    .withMessage('Valid username is required'),
    check('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 character long')
];

// VALIDATOR FOR CHECK REQUEST VALID OR NOT


exports.isRequestValidated = (req, res, next) => {
    const errors = validationResult(req);
    if(errors.array().length > 0){
        return res.status(400).json({ error: errors.array()[0].msg })
    }
    next();
}