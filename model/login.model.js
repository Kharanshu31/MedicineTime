const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const loginSchema=new Schema({
  email:{type:String},
  password:{type:String},
  isLoggedIn:{type:Boolean}
},{
  timestamps: true,
})

const Login=mongoose.model("Login",loginSchema);

module.exports = Login;
