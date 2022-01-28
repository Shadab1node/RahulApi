const mongoose=require("mongoose")
const Schema=mongoose.Schema

const venderSchema=new Schema({
    vendername:{
        type:String
    },
    number:{
        type:Number
    },
    area:{
        type:String
    },
    distributer:{
        type:String
    },
},
    {
        timestamps: true,
    }
)

const Vender=mongoose.model("vender",venderSchema)
module.exports=Vender