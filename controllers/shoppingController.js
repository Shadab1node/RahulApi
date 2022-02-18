const Shoping = require("../models/shoppingModel")
const moment = require('moment');
const mongoose = require('mongoose');

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

async function generateInvoiceId(){
  try{
    const numbers = "1234567890";
    let invoiceExists = true;
    let invoiceId = '';
    do{
      invoiceId = '';
      for(let i = 0; i < 6; ++i){
        invoiceId += numbers[Math.floor(Math.random() * 10)];
      }

      invoiceExists = await Shoping.findOne({invoiceId});
    }while(invoiceExists)

    return invoiceId;
  } catch(error){
    throw error;
  }
}

exports.addshoping = async (req, res) => {
  try {
    let shoping = await Shoping.findOne({ 
      customer: req.customer._id,
      wholeseler: req.body.wholeseler,
      status: 'pending'
    });

    if (!shoping) {
      const invoiceId = await generateInvoiceId();
      shoping = new Shoping({
        customer: req.customer._id,
        wholeseler: req.body.wholeseler,
        pickup: req.body.pickup,
        distributor: req.body.items[0].distributer._id,
        date: moment().format('YYYY-MM-DD'),
        invoiceId
      });
    }
    const items = [];
    console.log(typeof date);
    for(const item of req.body.items){
      items.push({
        item: item._id,
        qty: item.Qty,
        newQty: item.newQty ? item.newQty : 1,
        price: item.price,
        actualPrice: item.actualPrice,
        vendorQty: item.Qty
      })
    }
    shoping.items = items;
    await shoping.save();
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
    }).populate("customer");
    return res.status(200).json({ msg: "shoping get successfully", shoping })
  } catch (error) {
    console.log(error)
    return res.status(400).json({ msg: "something went wrong" })
  }
}

// exports.updateShopingViaWholesaler = async (req, res) => {
//   try{
//     const shoping = await Shoping.findOne({
//       _id: req.body.shopingId,
//       wholeseler: req.wholesaler._id
//     })

//     if(!shoping){
//       return res.status(404).json({msg: "order with given id not found"})
//     }

//     shoping.pickup = req.body.pickup;
//     shoping.shippingCost = req.body.shippingCost || 0 ;
//     let total = shoping.shippingCost;
//     const items = [];
//     for(const item of req.body.items){
//       const vendorQty = item.vendorQty || item.Qty;
//       const actualPrice = item.price * vendorQty;
//       total += actualPrice;
//       items.push({
//         item: item.item,
//         qty: item.Qty,
//         newQty: item.newQty ? item.newQty : 1,
//         price: item.price,
//         vendorQty,
//         actualPrice,
//       });
//     }
//     shoping.total = total;
//     shoping.items = items;
//     await shoping.save();

//     return res.status(200).json({msg: "shopping updated successfuly", shoping})
//   } catch(error){
//     console.log(error);
//     return res.status(400).json({msg: 'something went wrong'})
//   }
// }

// GET SHOPPING BY ID

exports.updateShopingViaWholesaler = async (req, res) => {
  try{
    const shoping = await Shoping.findOne({
      _id: req.body.shopingId,
      wholeseler: req.wholesaler._id
    });
    
    if(!shoping){
      return res.status(404).json({msg: "order with given id not found"});
    }

    // const itemIndex = shoping.items.indexOf(req.body.itemId);
    const itemIndex = shoping.items.findIndex((item) => {
      return item.item.toString() === req.body.itemId;
    })
    if(itemIndex < 0){
      return res.status(404).json({msg: "item with given id not found in current order"});
    }

    shoping.items[itemIndex].vendorQty = req.body.vendorQty;
    shoping.items[itemIndex].vendorPrice = req.body.vendorPrice;

    await shoping.save();

    return res.status(200).json({msg: 'item updated'});
  } catch(error){
    return res.status(400).json({msg: 'something went wrong'});
  }
}

exports.submitUpdatedShoping = async (req, res) => {
  try{
    const shoping = await Shoping.findOne({
      _id: req.body.shopingId,
      wholeseler: req.wholesaler._id
    });

    if(!shoping){
      return res.status(404).json({msg: "order with given id not found"});
    }

    shoping.shippingCost = req.body.shippingCost || 0;
    shoping.vendorSubmit = true;
    shoping.pickup = req.body.pickup || shoping.pickup;
    shoping.total = 0;

    for (const item of shoping.items){
      shoping.total += item.vendorPrice || item.actualPrice;
    }
    await shoping.save();
    return res.status(200).json({msg: 'shoping submitted'});
  } catch(error){
    return res.status(400).json({msg: 'something went wrong'});
  }
}

exports.getUpdatedShoping = async (req, res) => {
  try{
    const shoping = await Shoping.find({
      customer: req.customer._id,
      vendorSubmit: true
    }).populate('wholeseler');

    if(!shoping){
      return res.status(404).json({msg: 'shoping with given id not found'});
    }
    return res.status(200).json({ msg: "shoping get successfully", shoping });
  } catch(error){
    console.log(error);
    return res.status(500).json({msg: 'something went wrong'});
  }
}

exports.getUpdatedShopingById = async (req, res) => {
  try{
    const shoping = await Shoping.findOne({
      customer: req.customer._id,
      _id: req.params.shopingId,
      vendorSubmit: true
    }).populate('items.item');

    if(!shoping){
      return res.status(404).json({msg: 'shoping with given id not found'});
    }
    return res.status(200).json({ msg: "shoping get by id successfully", shoping });
  } catch(error){
    console.log(error);
    return res.status(500).json({msg: 'something went wrong'});
  }
}

exports.acceptShoping = async (req, res) => {
  try{
    const shoping = await Shoping.findOne({
      customer: req.customer._id,
      _id: req.body.shopingId
    });

    if(!shoping){
      return res.status(404).json({msg: 'shoping with given id not found'});
    }

    shoping.status = 'accepted';
    await shoping.save();

    return res.status(200).json({mag: 'order placed'});
  } catch(error){
    console.log(error);
    return res.status(500).json({msg: 'something went wrong'});
  }
}

exports.getAcceptedShoping = async (req, res) => {
  try{
    const shoping = await Shoping.find({
      wholeseler: req.wholesaler._id,
      status: 'accepted'
    }).populate('customer');

    return res.status(200).json({msg: 'accepted shopings', shoping});
  } catch(error){
    console.log(error);
    return res.status(500).json({msg: 'something went wrong'});
  }
}

exports.getAcceptedShopingByID = async (req, res) => {
  try{
    const shoping = await Shoping.findOne({
      wholeseler: req.wholesaler._id,
      status: 'accepted',
      _id: req.params.shopingId
    }).populate('items.item');

    if(!shoping){
      return res.status(404).json({msg: 'shoping with given id not found'});
    }

    return res.status(200).json({ msg: "shoping get by id successfully", shoping })
  } catch(error){
    console.log(error);
    return res.status(500).json({msg: 'something went wrong'});
  }
}

exports.updateAcceptedShoping = async (req, res) => {
  try{
    const shoping = await Shoping.findOne({
      wholeseler: req.wholesaler._id,
      status: 'accepted',
      _id: req.body.shopingId
    })

    if(!shoping){
      return res.status(404).json({msg: 'shoping with given id not found'});
    }

    const itemIndex = shoping.items.findIndex((item) => {
      return item.item.toString() === req.body.itemId;
    });

    if(itemIndex < 0){
      return res.status(404).json({msg: 'item not found in current order'});
    }

    shoping.items[itemIndex].updatedQty = req.body.qty;
    const item = shoping.items[itemIndex];
    shoping.credit += (item.vendorQty - item.updatedQty) * item.price;

    await shoping.save();

    return res.status(200).json({msg: 'item quantity updated'});
  } catch(error){
    console.log(error);
    return res.status(500).json({msg: 'something went wrong'});
  }
}

exports.deleteItemFromAccepted = async (req, res) => {
  try{
    const shoping = await Shoping.findOne({
      wholeseler: req.wholesaler._id,
      _id: req.body.shopingId
    });

    if(!shoping){
      return res.status(404).json({msg: 'shoping with given id not found'});
    }

    const itemIndex = shoping.items.findIndex((item) => {
      return item.item.toString() === req.body.itemId;
    });

    if(itemIndex < 0){
      return res.status(404).json({msg: 'item not found in current order'});
    }

    shoping.credit += shoping.items[itemIndex].vendorQty * shoping.items[itemIndex].price;

    shoping.items.splice(itemIndex, 1);

    await shoping.save();

    return res.status(200).json({msg: 'item deleted' });
  } catch(error){
    console.log(error);
    return res.status(500).json({msg: 'something went wrong'});
  }
}

exports.getshopingbyid = async (req, res) => {
  try {
    console.log(req.params.id);
    console.log(req.wholesaler._id);
    const shoping = await Shoping.findOne({
      _id: req.params.id,
      wholeseler: req.wholesaler._id
    }).populate("items.item");
    return res.status(200).json({ msg: "shoping get by id successfully", shoping })
  } catch (error) {
    console.log(error)
    return res.status(400).json({ msg: "something went wrong" })
  }
}

exports.deleteItemInShoping = async (req, res) => {
  try{
    const shoping = await Shoping.findOne({
      _id: req.body.shopingId,
      wholeseler: req.wholesaler._id
    });

    if(!shoping){
      return res.status(404).json({msg: "order with given id not found"})
    }
    console.log(req.body.itemId);
    await shoping.updateOne({
      $pull: {items: {item: req.body.itemId}}
    })
    // shoping.items.pull({item: mongoose.Types.ObjectId(req.body.itemId)});
    await shoping.save();
    return res.status(200).json({msg: 'item deleted', shoping});
  } catch(error){
    console.log(error);
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