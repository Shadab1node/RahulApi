const Purchase=require("../models/purchaseModel")

// ADD PURCHASE

exports.addpurchase=async (req,res)=>{
    try {
    const purchase=new Purchase(req.body);
    purchase.save()
    console.log(purchase)
    return res.status(200).json({msg:"purchase add successfully",purchase})
    }catch (error) {
        console.log(error)
    return res.status(400).json({msg:"something went wrong"})
    }
}



// GET PURCHASE PRODUCT

exports.getpurchase=async (req,res)=>{
    try {
    const purchase=await Purchase.find({});
    console.log(purchase)
    return res.status(200).json({msg:"purchase get successfully",purchase})
    }catch (error) {
        console.log(error)
    return res.status(400).json({msg:"something went wrong"})
    }
}

