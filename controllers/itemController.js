const Item=require("../models/itemModel")

// ADD ITEM

exports.additem=async (req,res)=>{
    try {
        const url="https://rahul-api-1.herokuapp.com/upload/Image/"
    const itemImage = req.file ? req.file.filename : null;
    const item=new Item(req.body);
    item.photo=`${url}${itemImage}`
    item.wholesaler=req.wholesaler._id
    item.save()
    console.log(item)
    return res.status(200).json({msg:"item add successfully",item})
    }catch (error) {
    return res.status(400).json({msg:"something went wrong"})
    }
    }

// GET ITEM

exports.getitem=async (req,res)=>{
    try{
    const getitem=await Item.find({wholesaler:req.wholesaler._id}).populate("distributer","name area")
    console.log(getitem)
    return res.status(200).json({msg:"Item get successfully",getitem})
    }catch (error) {
    console.log(error)
    return res.status(400).json({msg:"something went wrong",error:error.message})
    }
    }

    // GET ITEM BY ID

    exports.getitembyid=async (req,res)=>{
        try{
        const getitembyid=await Item.findById({_id:req.params.id})
        console.log(getitembyid)
        return res.status(200).json({msg:"Item get successfully",getitembyid})
        }catch (error) {
        console.log(error)
        return res.status(400).json({msg:"something went wrong",error:error.message})
        }
        }

// UPDATE ITEM

exports.updateitem=async (req,res)=>{
        try{
        const {date,discount,active,msrmt,photo,item,brand,description,itemname,price,Qty,}=req.body
        const itemImage = req.file ? req.file.filename : null;
        const updateitem=await Item.findByIdAndUpdate(req.params.id,{
        item,
        brand,
        description,
        itemname,   
        price,
        Qty,
        msrmt,
        active,
        discount,
        date,
        photo:itemImage
        })
        console.log(updateitem)
        return res.status(200).json({msg:"Item update successfully",updateitem})
        }catch (error){
        console.log(error)
        return res.status(400).json({msg:"something went wrong"})
        }
    }

    // DELETE ITEM

    exports.deleteitem=async (req,res)=>{
        try{
        const deleteitem=await Item.findByIdAndDelete({_id:req.params.id})
        console.log(deleteitem)
        return res.status(200).json({msg:"delete item successfully",deleteitem})
        }catch(error){
        console.log(error)
        return res.status(400).json({msg:"something went wrong"})
        }
        }


        exports.productcategorybyId = async (req, res) => {
            try {
              const productCategorybyID = await Item.find({
                category: req.params.id,
              }).populate("category","category");
              console.log(productCategorybyID)
              return res.status(200).json(productCategorybyID);
            } catch (error) {
              return res.status(500).json({ msg: error.message });
            }
          };