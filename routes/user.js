const router = require('express').Router();
let Medicine = require('../model/user.model');

router.route("/").get((req,res)=>{
  Medicine.find()
    .then(medicines=>res.json(medicines))
    .catch(err=>res.status(400).json("Error:" + err));
})

router.route("/add").post((req,res)=>{
  const medicineName=req.body.name;
  const newMedicine=new Medicine(req.body);
  //console.log(req.body.name);
  newMedicine.save()
    .then(()=>res.json(medicineName))
    .catch(err=>res.status(400).json("Error:" + err));
})

router.route("/remove/").delete(async(req,res)=>{

  try {
    const n=req.body.medicine_name;

    console.log(n);

    const m=await Medicine.findOne({name:n})

    if(!m)
    {
      return res.json("medicine not found");
    }

    console.log(m);

    await m.remove().then().catch(err=>console.log(err));

    res.json("Successfully removed");
  } catch(err) {
    console.log(err);
    res.status(500).json("Server Error!!")
  }


})

router.delete("/:name_id",async (req,res)=>{

  try {

    const q=await Medicine.findOne({name:req.params.name_id});

    if(!q) {
        return res.json("medicine not found");
    }

    await q.remove();

    res.json("Successfully deleted");

  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error")
  }

})

// router.route("/update").post((req,res)=>{
//   Medicine.updateOne(
//   {email:req.body.email},
//   {password:req.body.password},
//   )
// })

module.exports = router;
