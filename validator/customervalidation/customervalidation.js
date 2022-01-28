const {check, validationResult } = require('express-validator');

// VALIDATION FOR USER SIGNUP

exports.validateSignupRequest =[
   check('name')
   .notEmpty()
   .withMessage("name Is Required"),
   check('address')
   .notEmpty()
   .withMessage("Please Enter a address"),
   check('city')
   .notEmpty()
   .withMessage("Please Enter a city"),
   check('state')
   .notEmpty()
   .withMessage("Please Enter a state"),
   check('zipcode')
   .notEmpty()
   .withMessage("Please Enter a zipcode"),
   check('email')
   .isEmail()
   .withMessage("Please Enter a email"),
   check('Ein')
   .notEmpty()
   .withMessage("Please Enter a Ein"),
   check('username')
   .notEmpty()
   .withMessage("Please Enter a username"),
   check('password')
   .notEmpty()
   .withMessage("Please Enter a password"),
   check("phone")
   .isLength({ min: 10 })
   .withMessage("Please Enter a Valid phone number"),
   check('AuthorizedDistributers')
   .notEmpty()
   .withMessage("Please Enter a AuthorizedDistributers"),
   check('area')
   .notEmpty()
   .withMessage("Please Enter a area"),
   check('MinOrder')
   .notEmpty()
   .withMessage("Please Enter a MinOrder"),
   check('BankName')
   .notEmpty()
   .withMessage("Please Enter a BankName"),
   check('Routing')
   .notEmpty()
   .withMessage("Please Enter a Routing"),
   check('Account')
   .notEmpty()
   .withMessage("Please Enter a Account"),
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