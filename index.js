require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const fs = require("fs");
const csv = require("csv-parser");
const mongoose = require("mongoose");
const Docket = require("./Models/docket");
app.use(cors());
const data = [];

fs.createReadStream("parshva-table.csv")
.pipe(csv())
.on("data", (row) => {
    data.push(row);
})
.on("end", () => {
    // console.log(data);
});
app.use(express.json())

app.get("/api/data", (req, res) => {
    const allSuppliers = [];
  data.forEach((obj) => {
    if (obj.Supplier) {
      allSuppliers.push({
        supplier: obj.Supplier,
        PoNumber: obj.PO_Number,
        description: obj.Description,
      });
    }
  });
  res.json(allSuppliers);
});
app.get("/api/getAllDocket",async (req,res)=>{
    const docketList=await Docket.find()
    if(!docketList){
      return res.status(500).json({
        success:false,
        message:"Data not availbale",
      })
    }
    res.status(200).json({success:true,
        message:"Data availbale",docketList}) 
})
app.post("/api/add-docket", async (req, res) => {
  try {

    let docket = new Docket({
      name: req.body.name,
      startTime: req.body.startTime,
      endTime:req.body.endTime ,
      hoursWorked: req.body.hoursWorked,
      ratePerHour: req.body.ratePerHour,
      supplier: req.body.supplier,
      purchaseOrder: req.body.purchaseOrder,
      PoNumber: req.body.PoNumber,
      description:req.body.description
    });
    docket=await docket.save();
    res.status(200).json({message:"Successfully Posted",success:true})
  } catch (err) {
    console.log(err);
  }
});
const URL = process.env.DATABASE_URL;
mongoose
  .connect(URL)
  .then((res) => {
    console.log("connected to database");
  })
  .catch((err) => console.log(err));

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
