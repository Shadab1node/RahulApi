const Vender=require("../../models/admin/venderModel")

// ADD VENDER

exports.addvender=async (req,res)=>{
    try {
    const vender=new Vender(req.body)
    vender.save()
    return res.status(200).json({msg:"vender add successfully",vender})
    } catch (error) {
    console.log(error);
    return res.status(400).json({msg:"something went wrong"})     
    }
}

// GET VENDER

exports.getvender=async (req,res)=>{
    try {
        const getvender=await Vender.find({})
        return res.status(200).json({msg:"vender get successfully",getvender})
    } catch (error) {
        console.log(error)
        return res.status(400).json({msg:"something went wrong"})       
     }
    }

// UPDATE VENDER

exports.updatevender=async (req,res)=>{
    try {
        const {vendername,number,area,distributer}=req.body
        const updatevender=await Vender.findOneAndUpdate(req.params.id,{
            vendername,
            number,
            area,
            distributer
        })
        return res.status(200).json({msg:"vender update successfully",updatevender})
    } catch (error) {
        console.log(error)
        return res.status(400).json({msg:"something went wrong"})       
     } 
}

// DELETE CUSTOMER

exports.deletevender=async (req,res)=>{
    try {
        const deletevender=await Vender.findByIdAndDelete(req.params.id)
        return res.status(200).json({msg:"vender Delete successfully",deletevender})
    } catch (error) {
        console.log(error)
        return res.status(400).json({msg:"something went wrong"})       
    }
}