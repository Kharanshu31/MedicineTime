const router = require('express').Router();
let Medicine = require('../model/user.model');

router.route("/").get((req,res)=>{
  Medicine.find()
    .then(medicines=>res.json(medicines))
    .catch(err=>res.status(400).json("Error:" + err));
})

router.route("/add").post((req,res)=>{
  const medicineName=req.body.name;
  const newMedicine=new Medicine({medicineName});

  newMedicine.save()
    .then(()=>res.json(medicineName))
    .catch(err=>res.status(400).json("Error:" + err));
})

module.exports = router;
