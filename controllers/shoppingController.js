const Shoping=require("../models/shoppingModel")

// ADD SHOPPING

exports.addshoping=async (req,res)=>{
    try {
    const shoping=new Shoping(req.body);
    shoping.save()
    console.log(shoping)
    return res.status(200).json({msg:"shoping add successfully",shoping})
    }catch (error) {
    return res.status(400).json({msg:"something went wrong"})
    }
    }

// GET SHOPING

exports.getshoping=async (req,res)=>{
    try {
    const shoping=await Shoping.find({})
    .populate("vender").populate("item")
    return res.status(200).json({msg:"shoping get successfully",shoping})
    }catch (error) {
        console.log(error)
    return res.status(400).json({msg:"something went wrong"})
    }
    }

// GET SHOPPING BY ID

exports.getshopingbyid=async (req,res)=>{
    try {
    const shoping=await Shoping.findById({_id:req.params.id})
    .populate("vender").populate("item")
    return res.status(200).json({msg:"shoping get by id successfully",shoping})
    }catch (error) {
        console.log(error)
    return res.status(400).json({msg:"something went wrong"})
    }
}

