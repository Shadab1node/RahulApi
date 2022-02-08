var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const categorySchema = new Schema({
  wholesaler:{
    type:Schema.Types.ObjectId,
    ref:"wholeseler"
  },
  distributer:{
    type:Schema.Types.ObjectId,
    ref:"distributer"
  },
    vender:{
      type:Schema.Types.ObjectId,
      ref:"vender"
  },
      category:{
          type:String
      }
},
    {
    timestamps: true,
  });

var category = mongoose.model("category",categorySchema);
module.exports = category;
