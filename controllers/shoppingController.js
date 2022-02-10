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
    let shoping = await Shoping.findOne({ 
      customer: req.customer._id,
      wholeseler: req.body.wholeseler,
      status: 'pending'
    });

    if (!shoping) {
      shoping = new Shoping({
        customer: req.customer._id,
        wholeseler: req.body.wholeseler,
        pickup: req.body.pickup,
        distributor: req.body.distributer
      });
    }
    const items = [];
    for(const item of req.body.items){
      items.push({
        item: item._id,
        qty: item.Qty,
        newQty: item.newQty,
        price: item.price
      })
    }
    shoping.items = items;
    await shoping.save();
    console.log(shoping.items)
    // shoping.items.addToSet(req.body.items);
    // shoping.customer = req.customer._id
    // await shoping.save();
    return res.status(200).json({ msg: "shoping add successfully", shoping })
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: "something went wrong", error: error.message })
  }
}

// GET SHOPING

exports.getshoping = async (req, res) => {
  try {
    console.log(req.wholesaler)
    const shoping = await Shoping.find({
      wholeseler: req.wholesaler._id
    }).populate("customer items.item");
    return res.status(200).json({ msg: "shoping get successfully", shoping })
  } catch (error) {
    console.log(error)
    return res.status(400).json({ msg: "something went wrong" })
  }
}

exports.updateShopingViaWholesaler = async (req, res) => {
  try{

  } catch(error){
    console.log(error);
    return res.status(400).json({msg: 'something went wrong'})
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