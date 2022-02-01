var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const categorySchema = new Schema(
  { 
      category:{
          type:String
      }
},
    {
    timestamps: true,
  });

var category = mongoose.model("category",categorySchema);
module.exports = category;
