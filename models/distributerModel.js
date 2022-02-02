var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const distributerSchema = new Schema(
  { 
        name:{
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
        area:{
          type:String,
          required:true
        }
},
    {
    timestamps: true,
  });

var Distibuter = mongoose.model("distibuter",distributerSchema);
module.exports = Distibuter;
