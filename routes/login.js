const router = require('express').Router();
const Login = require("../model/login.model");

router.route("/").get((req,res)=>{
  Login.find()
    .then(time=>res.json(time))
    .catch(err=>res.status(400).json("Error:" + err));
})

router.route('/getUser').get(async(req,res)=>{
  try {

    const l=await Login.findOne({_id:req.query.id})

    console.log(l);

    if(!l)
    {
      return res.json("User not found")
    }

    res.json(l);

  } catch(err) {
    console.log(err);
    res.status(500).json("Server Error!!")
  }

})

// router.route('/find').post((req,res)=>{
//   Login.findOne({email:req.body.email,password:req.body.password})
//   .then((response)=>{
//     res.json(response.data)
//   })
//   .catch(err=>res.json("User does not exist"));
// })

router.route('/find').post(async(req,res)=>{
  try {

    const u=await Login.findOne({email:req.body.email})

    if(!u)
    {
      return res.json("Email does not exist")
    }

    console.log(u);

    if(u.password!==req.body.password)
    {
      return res.json("Password does not match")
    }

    //const up=await Login.update({email:req.body.email},{$set:{isLoggedIn:true}})

    res.json(u);

  } catch(err){
    console.log(err);
    res.status(500).json("Server Error!!")
  }
})

router.route("/add").post((req,res)=>{
  const userLogin=req.body.email;
  const newLogin=new Login(req.body);

  newLogin.save()
    .then(()=>res.json(newLogin))
    .catch(err=>res.status(400).json("Error:" + err));
})

module.exports = router;
