const mongoose=require("mongoose")
const Schema=mongoose.Schema

const userSchema=new Schema({
    name:{
        type:String
    },
    password:{
        type:String
    },
    email:{
        type:String
    },
    value1:{
        type:String
    },
    value2:{
        type:String
    },
    value3:{
        type:String
    },
    value4:{
        type:String
    },
    value5:{
        type:String
    },
},
    {
        timestamps: true,
    }
)

const User=mongoose.model("useradmin",userSchema)
module.exports=User