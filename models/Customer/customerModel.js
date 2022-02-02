const mongoose=require("mongoose")
const Schema=mongoose.Schema

const customerSchema=new Schema({
    email:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    Ein:{
        type:String,
        required:true
    },
    Address:{
        type:String,
        required:true  
    },
    city:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    zip:{
        type:String,
        required:true
    }
},
    {
        timestamps: true,
    }
)

const Customer=mongoose.model("customer",customerSchema)
module.exports=Customer