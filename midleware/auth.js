const jwt = require("jsonwebtoken");
// const User = require("../models/user-model");
const Admin =require("../models/admin/adminModel")
const Wholesaler=require("../models/wholesaler/wholesalerModel")
const Customer=require("../models/Customer/customerModel")
// FOR USER AUTHENTICATION 

// exports.userloggedIn = async function(req, res, next){
//   try{
//       console.log('entered loggedin middleware..................')
//       const authHeader = req.get('Authorization');
//       if(!authHeader){
//           return res.status(401).json({
//               success: false,
//               msg: 'token not provided or user not logged in'
//           });
//       }
//       const authHeaderStringSplit = authHeader.split(' ');
//       if(!authHeaderStringSplit[0] || authHeaderStringSplit[0].toLowerCase() !== 'bearer' || !authHeaderStringSplit[1]){
//           return res.status(401).json({
//               success: false,
//               msg: 'token not provided or user not logged in'
//           });
//       }
      
//       const token = authHeaderStringSplit[1];
//       const decodedToken = await jwt.verify(token, process.env.PROCESS_KEY);
//       console.log(`decoded token: ${decodedToken.email}`)
//       const user = await User.findById(decodedToken.user);
//       if(!user){
//           return res.status(404).json({
//               error: 'user not found'
//           })
//       }
//       console.log(`user name ${user.email}`)
//       req.user = user.toObject();
//       //delete req.user['password']
//       next();

//   } catch(err) {
//       console.log('error in auth middleware/////////////////////////////////')
//       console.log(err)
//       if(err.name == 'TokenExpiredError' || err.name == 'JsonWebTokenError'){
//           return res.status(400).json({
//               success: false,
//               msg: 'token expired, please login again'
//           })
//       }
//       next(err);
//   }
// }

//For Admin Authenticate


exports.adminloggedIn = async function(req, res, next){
    try{
        console.log('entered loggedin middleware..................')
        const authHeader = req.get('Authorization');
        if(!authHeader){
            return res.status(401).json({
                success: false,
                msg: 'token not provided or user not logged in'
            });
        }
        const authHeaderStringSplit = authHeader.split(' ');
        if(!authHeaderStringSplit[0] || authHeaderStringSplit[0].toLowerCase() !== 'bearer' || !authHeaderStringSplit[1]){
            return res.status(401).json({
                success: false,
                msg: 'token not provided or user not logged in'
            });
        }
        
        const token = authHeaderStringSplit[1];
        const decodedToken = await jwt.verify(token, process.env.PROCESS_KEY);
        console.log(`decoded token: ${decodedToken.email}`)
        const user = await Admin.findById(decodedToken.admin);
        if(!user){
            return res.status(404).json({
                error: 'user not found'
            })
        }
        console.log(`user name ${user.email}`)
        req.user = user.toObject();
        //delete req.user['password']
        next();
  
    } catch(err) {
        console.log('error in auth middleware/////////////////////////////////')
        console.log(err)
        if(err.name == 'TokenExpiredError' || err.name == 'JsonWebTokenError'){
            return res.status(400).json({
                success: false,
                msg: 'token expired, please login again'
            })
        }
        next(err);
    }
}

// For Wholesaler

exports.wholesalerloggedIn = async function(req, res, next){
    try{
        console.log('entered loggedin middleware..................')
        const authHeader = req.get('Authorization');
        if(!authHeader){
            return res.status(401).json({
                success: false,
                msg: 'token not provided or user not logged in'
            });
        }
        const authHeaderStringSplit = authHeader.split(' ');
        if(!authHeaderStringSplit[0] || authHeaderStringSplit[0].toLowerCase() !== 'bearer' || !authHeaderStringSplit[1]){
            return res.status(401).json({
                success: false,
                msg: 'token not provided or user not logged in'
            });
        }
        
        const token = authHeaderStringSplit[1];
        const decodedToken = await jwt.verify(token, process.env.PROCESS_KEY);
        console.log(`decoded token: ${decodedToken.email}`)
        const wholesaler = await Wholesaler.findById(decodedToken.wholeseler);
        if(!wholesaler){
            return res.status(404).json({
                error: 'distributer not found'
            })
        }
        console.log(wholesaler);
        console.log(`user name ${wholesaler.email}`)
        req.wholesaler = wholesaler.toObject();
        //delete req.user['password']
        next();
  
    } catch(err) {
        console.log('error in auth middleware/////////////////////////////////')
        console.log(err)
        if(err.name == 'TokenExpiredError' || err.name == 'JsonWebTokenError'){
            return res.status(400).json({
                success: false,
                msg: 'token expired, please login again'
            })
        }
        next(err);
    }
}


// FOR CUSTOMER AUTHENTICATION


exports.customerloggedIn = async function(req, res, next){
    try{
        console.log('entered loggedin middleware..................')
        const authHeader = req.get('Authorization');
        if(!authHeader){
            return res.status(401).json({
                success: false,
                msg: 'token not provided or user not logged in'
            });
        }
        const authHeaderStringSplit = authHeader.split(' ');
        if(!authHeaderStringSplit[0] || authHeaderStringSplit[0].toLowerCase() !== 'bearer' || !authHeaderStringSplit[1]){
            return res.status(401).json({
                success: false,
                msg: 'token not provided or user not logged in'
            });
        }
        
        const token = authHeaderStringSplit[1];
        const decodedToken = await jwt.verify(token, process.env.PROCESS_KEY);
        console.log(`decoded token: ${decodedToken.email}`)
        const customer = await Customer.findById(decodedToken.customer);
        if(!customer){
            return res.status(404).json({
                error: 'customer not found'
            })
        }
        console.log(customer);
        console.log(`user name ${customer.email}`)
        req.customer = customer.toObject();
        //delete req.user['customer']
        next();
  
    } catch(err) {
        console.log('error in auth middleware/////////////////////////////////')
        console.log(err)
        if(err.name == 'TokenExpiredError' || err.name == 'JsonWebTokenError'){
            return res.status(400).json({
                success: false,
                msg: 'token expired, please login again'
            })
        }
        next(err);
    }
}