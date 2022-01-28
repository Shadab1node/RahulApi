const Revenue=require("../../models/admin/revenueModel")

// ADD CUSTOMER

exports.addrevenue=async (req,res)=>{
    try {
    const revenue=new Revenue(req.body)
    revenue.save()
    return res.status(200).json({msg:"revenue add successfully",revenue})
    } catch (error) {
    console.log(error);
    return res.status(400).json({msg:"something went wrong"})     
    }
}

// GET CUSTOMER

exports.getrevenue=async (req,res)=>{
    try {
        const getrevenue=await Revenue.find({})
        return res.status(200).json({msg:"revenue get successfully",getrevenue})
    } catch (error) {
        console.log(error)
        return res.status(400).json({msg:"something went wrong"})       
     }
    }

// UPDATE CUSTOMER

exports.updaterevenue=async (req,res)=>{
    try {
        const {invoice,date,customerName,VenderName,total,revenue}=req.body
        const updaterevenue=await Revenue.findByIdAndUpdate(req.params.id,{
            invoice,
            date,
            customerName,
            VenderName,
            total,
            revenue
        })
        return res.status(200).json({msg:"ravenue update successfully",updaterevenue})
    } catch (error) {
        console.log(error)
        return res.status(400).json({msg:"something went wrong"})       
     } 
}

// DELETE CUSTOMER

exports.deleterevenue=async (req,res)=>{
    try {
        const deleterevenue=await Revenue.findByIdAndDelete(req.params.id)
        return res.status(200).json({msg:"revenue Delete successfully",deleterevenue})
    } catch (error) {
        console.log(error)
        return res.status(400).json({msg:"something went wrong"})       
    }
}