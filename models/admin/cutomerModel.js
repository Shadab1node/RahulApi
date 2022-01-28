const mongoose=require("mongoose")
const Schema=mongoose.Schema

const customerSchema=new Schema({
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

const Customer=mongoose.model("admincustomer",customerSchema)
module.exports=Customer