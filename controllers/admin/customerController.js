const Customer=require("../../models/admin/cutomerModel")

// ADD CUSTOMER

exports.addcustomer=async (req,res)=>{
    try {
    const customer=new Customer(req.body)
    customer.save()
    return res.status(200).json({msg:"customer add successfully",customer})
    } catch (error) {
    console.log(error);
    return res.status(400).json({msg:"something went wrong"})     
    }
}

// GET CUSTOMER

exports.getcustomer=async (req,res)=>{
    try {
        const getcustomer=await Customer.find({})
        return res.status(200).json({msg:"customer get successfully",getcustomer})
    } catch (error) {
        console.log(error)
        return res.status(400).json({msg:"something went wrong"})       
     }
    }

// UPDATE CUSTOMER

exports.updatecustomer=async (req,res)=>{
    try {
        const {vendername,number,area,distributer}=req.body
        const customerbooking=await Customer.findOneAndUpdate(req.params.id,{
            vendername,
            number,
            area,
            distributer
        })
        return res.status(200).json({msg:"customer update successfully",customerbooking})
    } catch (error) {
        console.log(error)
        return res.status(400).json({msg:"something went wrong"})       
     } 
}

// DELETE CUSTOMER

exports.deletecustomer=async (req,res)=>{
    try {
        const deletecustomer=await Customer.findByIdAndDelete(req.params.id)
        return res.status(200).json({msg:"customer Delete successfully",deletecustomer})
    } catch (error) {
        console.log(error)
        return res.status(400).json({msg:"something went wrong"})       
    }
}