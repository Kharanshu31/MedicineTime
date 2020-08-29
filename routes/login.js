const router = require('express').Router();
const Login = require("../model/login.model");

router.route("/").get((req,res)=>{
  Login.find()
    .then(time=>res.json(time))
    .catch(err=>res.status(400).json("Error:" + err));
})

router.route("/add").post((req,res)=>{
  const userLogin=req.body.email;
  const newLogin=new Login(req.body);

  newLogin.save()
    .then(()=>res.json(userLogin))
    .catch(err=>res.status(400).json("Error:" + err));
})

module.exports = router;
