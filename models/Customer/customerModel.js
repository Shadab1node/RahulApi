const mongoose=require("mongoose")
const Schema=mongoose.Schema

const customerSchema=new Schema({
    email:{
        type:String
    },
    username:{
        type:String
    },
    password:{
        type:String
    },
    phone:{
        type:Number
    },
    Ein:{
        type:String
    },
    Address:{
        type:String
    },
    city:{
        type:String
    },
    state:{
        type:String
    },
    zip:{
        type:String
    }
},
    {
        timestamps: true,
    }
)

const Customer=mongoose.model("customer",customerSchema)
module.exports=Customer