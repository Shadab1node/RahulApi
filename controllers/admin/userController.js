const User=require("../../models/admin/userModel")
const bcrypt=require("bcrypt")

// ADD USER

exports.adduser = async (req, res) => {
    try {
      const email = req.body.email;
      const checkUser = await User.findOne({ email: email });
      if (checkUser) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Email is already taken" }] });
      }
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(req.body.password, salt);
      try {
        var user = new User(req.body);
        user.password = hash;
        user.save(function (err) {
          res.json({
            message: "user add Successfully",
            data: user,
          });
        });
      } catch (error) {
        console.log(error)
        res.json({ 
          message: "Error find in when adding the user",
        });
      }
    } catch (error) {
      console.log(error)
      return res.status(500).json({ errors: error });
    }
  };

// GET USER ADMIN

exports.getuseradmin=async (req,res)=>{
  try {
      const getuseradmin=await User.find({})
      return res.status(200).json({msg:"useradmin get successfully",getuseradmin})
  } catch (error) {
      console.log(error)
      return res.status(400).json({msg:"something went wrong"})       
   }
  }

  // UPDATE ADMIN USER

  exports.updateuseradmin=async (req,res)=>{
    console.log("sfjhdfuydsugfk")
    try {
        const {email,password,name,value1,value2,value3,value4,value5}=req.body
        const updateuseradmin=await User.findByIdAndUpdate(req.params.id,{
          email,
          password,
          name,
          value1,
          value2,
          value3,
          value4,
          value5
        })
        return res.status(200).json({msg:"update admin user successfully",updateuseradmin})
    } catch (error) {
        console.log(error)
        return res.status(400).json({msg:"something went wrong"})       
     } 
}

// DELETE USER ADMIN

exports.deleteadminuser=async (req,res)=>{
  try {
      const deleteadminuser=await User.findByIdAndDelete(req.params.id)
      return res.status(200).json({msg:"Delete admin user successfully",deleteadminuser})
  } catch (error) {
      console.log(error)
      return res.status(400).json({msg:"something went wrong"})       
  }
}

