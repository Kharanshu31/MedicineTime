const express=require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const mongoose =  require("mongoose");

require('dotenv').config();

const app=express();
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({extended:true,useUnifiedTopology:true}));
app.use(cors());
app.use(express.json());


const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})


const medicineRouter=require("./routes/user");

app.use("/user",medicineRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
