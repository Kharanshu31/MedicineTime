const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const medicineSchema=new Schema({
  name:{
    type:String,
  }
},{
  timestamps: true,
})

const Medicine=mongoose.model("Medicine",medicineSchema);

module.exports = Medicine;
