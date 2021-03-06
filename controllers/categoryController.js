const Category=require("../models/category/categoryModel")

// ADD CATEGORY

exports.addcategory=async (req,res)=>{
    try {
    const category=new Category(req.body)
    category.wholesaler=req.wholesaler._id
    category.save()
    return res.status(200).json({msg:"category add successfully",category})
    } catch (error) {
        console.log(error)
    return res.status(400).json({msg:"something went wrong"})   
    }
}

// GET CATEGORY

exports.getcategory=async (req,res)=>{
    try {
    const getcategory=await Category.find({wholesaler:req.wholesaler._id})
    return res.status(200).json({msg:"category get successfully",getcategory})
    } catch (error) {
        console.log(error)
    return res.status(400).json({msg:"something went wrong"})   
    }
}

// GET CATEGORY BY ID

exports.getcategorybyid=async (req,res)=>{
    try {
    const getcategorybyid=await Category.findById({wholesaler: req.params.id})
    return res.status(200).json({msg:"category get by id successfully",getcategorybyid})
    } catch (error) {
        console.log(error)
    return res.status(400).json({msg:"something went wrong"})   
    }
}

// UPDATE CATEGORY

exports.updatecategory=async (req,res)=>{
    try {
        const category=req.body.category;
    const updatecategory=await Category.findByIdAndUpdate(req.params.id,{
        category
    })
    return res.status(200).json({msg:"category update successfully",updatecategory})
    } catch (error) {
        console.log(error)
    return res.status(400).json({msg:"something went wrong"})   
    }
}

// DELETE CATEGORY

exports.deletecategory=async (req,res)=>{
    try {
    const deletecategory=await Category.findByIdAndDelete({_id:req.params.id})
    return res.status(200).json({msg:"category delete successfully",deletecategory})
    } catch (error) {
        console.log(error)
    return res.status(400).json({msg:"something went wrong"})   
    }
}

exports.categorybywholesalerid=async (req,res)=>{
    try {
    const categorybywholesalerid=await Category.find({
        wholesaler:req.params.id
    })
    return res.status(200).json({msg:"get category by wholeseler id successfully",categorybywholesalerid})
    } catch (error) {
        console.log(error)
    return res.status(400).json({msg:"something went wrong"})   
    }
}
