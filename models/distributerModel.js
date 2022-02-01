var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const distributerSchema = new Schema(
  { 
        name:{
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
        }
},
    {
    timestamps: true,
  });

var Distibuter = mongoose.model("distibuter",distributerSchema);
module.exports = Distibuter;
