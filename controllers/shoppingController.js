const Shoping = require("../models/shoppingModel")

// ADD SHOPPING
async function getCart(userId) {
  try {
    const cart = await Shoping.findOne({ user: userId });
    return cart;
  } catch (error) {
    throw error;
  }
}

// async function updateCart(cart, productId){
//   try{
//     let updated = false;
//     for await(const product of cart.products){
//       if(product.productId == productId){
//         product.quantity += 1;
//         updated = true;
//         break;
//       }
//     }
//   }

exports.addshoping = async (req, res) => {
  try {
    // const shoping=new Shoping(req.body);
    // shoping.customer=req.customer._id
    // console.log(req.body.items);
    // shoping.items=[req.body.items]
    // //shoping.items.set(req.body.items);
    // shoping.save();
    // console.log(shoping)
    let shoping = await Shoping.findOne({ customer: req.body.customer });

    if (!shoping) {
      shoping = new Shoping(req.body);
    }
    console.log(shoping.items)
    shoping.items.addToSet(req.body.items);
    shoping.customer = req.customer._id
    await shoping.save();
    return res.status(200).json({ msg: "shoping add successfully", shoping })
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: "something went wrong", error: error.message })
  }
}

// GET SHOPING

exports.getshoping = async (req, res) => {
  try {
    const shoping = await Shoping.find({})
      .populate("wholeseler").populate("items")
    return res.status(200).json({ msg: "shoping get successfully", shoping })
  } catch (error) {
    console.log(error)
    return res.status(400).json({ msg: "something went wrong" })
  }
}

// GET SHOPPING BY ID

exports.getshopingbyid = async (req, res) => {
  try {
    const shoping = await Shoping.findById({ _id: req.params.id })
      .populate("vender").populate("item")
    return res.status(200).json({ msg: "shoping get by id successfully", shoping })
  } catch (error) {
    console.log(error)
    return res.status(400).json({ msg: "something went wrong" })
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