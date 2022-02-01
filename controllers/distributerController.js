    const Distributer=require("../models/distributerModel")
    const bcrypt=require("bcrypt")

// ADD DISTRIBUTER
       
        exports.adddistributer=async (req,res)=>{
        try{
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.body.password, salt);
        const distributer=new Distributer(req.body)
        distributer.password=hash
        distributer.save()
        return res.status(200).json({msg:"Distibuter add successfully",distributer})
        } 
        catch(error)
        {
        console.log(error)
        return res.status(400).json({msg:"something went wrong"})   
        }
        }

// GET CATEGORY

        exports.getdistributer=async (req,res)=>{
        try{
        const getdistributer=await Distributer.find({})
        console.log(getdistributer)
        return res.status(200).json({msg:"Distributer get successfully",getdistributer})
        }catch (error) {
        console.log(error)
        return res.status(400).json({msg:"something went wrong",error:error.message})
        }
        }

// // UPDATE CATEGORY

        exports.updatedistributer=async (req,res)=>{
        try{
        const {name,phone}=req.body
        const updatedistributer=await Distributer.findByIdAndUpdate(req.params.id,{
        name,
        phone
        })
        console.log(updatedistributer)
        return res.status(200).json({msg:"distributer update successfully",updatedistributer})
        }catch (error) {
        console.log(error)
        return res.status(400).json({msg:"something went wrong"})
        }
        }

// DELETE DISTRIBUTER

        exports.deletedistributer=async (req,res)=>{
        try{
        const deletedistributer=await Distributer.findByIdAndDelete({_id:req.params.id})
        console.log(deletedistributer)
        return res.status(200).json({msg:"delete distributer successfully",deletedistributer})
        }catch(error){
        console.log(error)
        return res.status(400).json({msg:"something went wrong"})
        }
        }
