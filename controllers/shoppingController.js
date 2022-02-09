const Shoping=require("../models/shoppingModel")


async function getCart(userId) {
  try{
    const cart = await Shoping.findOne({customer: userId});
    return cart;
  } catch(error){
    throw error;
  }
}

async function updateCart(cart, item){
  try{
    let updated = false;
    for await(const item of cart.items){
      if(item.item == item){
        product.quantity += 1;
        updated = true;
        break;
      }
    }

    if(!updated){
      const item = {
        item,
        quantity: 1
      }
      item.items.push(item);
    }

    await cart.save();
    return cart;
  } catch(error){
    throw error;
  }
}
exports.addshoping = async (req, res) => {
  try { 
    let cart = await getCart(req.user._id);

    if(!cart){
      cart = new Shoping();
      cart.user = req.user._id
      cart.items = [{
        item: req.body.item,
//        quantity: req.body.quantity,      
      }];
    //  cart.coupenId=req.body.coupenId
      console.log(cart)
      await cart.save();
        
    } else {
      cart = await updateCart(cart, req.body.item);
      console.log(cart)
    }
    console.log(cart)
    return res.json({
      message: "shoping  Successfully",
      data: cart,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
};


























// ADD SHOPPING

// exports.addshoping=async (req,res)=>{
//     try {
//     const shoping=new Shoping(req.body);
//     shoping.save()
//     console.log(shoping)
//     return res.status(200).json({msg:"shoping add successfully",shoping})
//     }catch (error) {
//     return res.status(400).json({msg:"something went wrong"})
//     }
//     }

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

exports.itemgetbyvenderid = async (req, res) => {
    try {
      const itemgetbyvenderid = await Shoping.find({
        vender: req.params.id,
      }).populate("vender").populate("item");
      console.log(itemgetbyvenderid)
      return res.status(200).json(itemgetbyvenderid);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  };