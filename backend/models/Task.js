const mongoose = require("mongoose");

module.exports = mongoose.model("Task", new mongoose.Schema({
  title:String,
  status:{type:String, enum:["Pending","In Progress","Done"], default:"Pending"},
  assignedTo:{type:mongoose.Schema.Types.ObjectId, ref:"User"},
  dueDate:Date
}));
