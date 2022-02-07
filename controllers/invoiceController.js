const Invoice=require("../models/invoiceModel")

exports.addinvoice=async (req,res)=>{
    try {
    const invoice=new Invoice(req.body)
    invoice.save()
    return res.status(200).json({msg:"invoice add successfully",invoice})
    } catch (error) {
        console.error(error)
        return res.status(400).json({msg:"something went wrong"})
    }
}

exports.getinvoice=async (req,res)=>{
    try {
        const getinvoice=await Invoice.find({})
        .populate("shoping")
        .populate("customer")
        .populate("vender")
    return res.status(200).json({msg:"Invoice get successfully",getinvoice})
    } catch (error) {
        console.log(error)
    return res.status(400).json({msg:"something went wrong"})

    }
}
exports.getinvoicebyid=async (req,res)=>{
    try {
        const getinvoicebyid=await Invoice.findById({_id:req.params.id})
        .populate("shoping")
        .populate("customer")
        .populate("vender")
    return res.status(200).json({msg:"Invoice get successfully",getinvoicebyid})
    } catch (error) {
        console.log(error)
    return res.status(400).json({msg:"something went wrong"})

    }
}