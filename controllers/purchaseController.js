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
    const purchase=await Purchase.find({}).populate("customer")
    .populate("shoping");
    console.log(purchase)
    return res.status(200).json({msg:"purchase get successfully",purchase})
    }catch (error) {
        console.log(error)
    return res.status(400).json({msg:"something went wrong"})
    }
}

exports.purchasebycustomerid = async (req, res) => {
    try {
      const purchasebycustomerid = await Purchase.find({
        cutomer: req.params.id,
      }).populate("customer").populate("shoping");
      console.log(purchasebycustomerid)
      return res.status(200).json(purchasebycustomerid);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  };
