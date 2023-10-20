const mongoose = require("mongoose");

const docketSchema = mongoose.Schema({
  name: { type: String },
  startTime: { type: String },
  endTime: { type: String },
  hoursWorked: { type: Number },
  ratePerHour: { type: Number },
  supplier: { type: String },
  purchaseOrder: { type: String },
  PoNumber: { type: String },
  description:{type:String}
});
module.exports = mongoose.model("Docket", docketSchema);
