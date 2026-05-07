const router = require("express").Router();
const Task = require("../models/Task");
const auth = require("../middleware/auth");

// create task
router.post("/", auth, async (req,res)=>{
  if(req.user.role !== "Admin") return res.status(403).send("Only Admin");
  const task = await Task.create(req.body);
  res.json(task);
});

// get tasks
router.get("/", auth, async (req,res)=>{
  const tasks = await Task.find().populate("assignedTo");
  res.json(tasks);
});

// update status
router.put("/:id", auth, async (req,res)=>{
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new:true});
  res.json(task);
});

module.exports = router;
