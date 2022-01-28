const mongoose=require("mongoose")
const Schema=mongoose.Schema

const wholeselerSchema=new Schema({
    name:{
        type:String
    },
    address :{
        type:String
    },
    city :{
        type:String
    },
    state :{
        type:String
    },
    zipcode  :{
        type:String
    },
    phone  :{
        type:Number
    },
    email  :{
        type:String
    },
    Ein  :{
        type:String
    },
    username  :{
        type:String
    },
    password  :{
        type:String
    },
    AuthorizedDistributers :{
        type:String
    },
    area  :{
        type:String
    },
    MinOrder :{
        type:String,
        default:0
    },
    BankName :{
        type:String
    },
    Routing  :{
        type:String
    },
    Account  :{
        type:String
    },
},
    {
        timestamps: true,
    }
)

const Wholeseler=mongoose.model("wholeseler",wholeselerSchema)
module.exports=Wholeseler