const mongoose=require("mongoose")
const Schema=mongoose.Schema

const adminSchema=new Schema({
    username:{
        type:String
    },
    password:{
        type:String
    },
    email:{
        type:String
    },
},
    {
        timestamps: true,
    }
)

const Admin=mongoose.model("admin",adminSchema)
module.exports=Admin