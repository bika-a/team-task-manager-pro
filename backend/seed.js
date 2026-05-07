const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const UserSchema = new mongoose.Schema({
  name:String,
  email:String,
  password:String,
  role:{type:String, enum:["Admin","Member"], default:"Member"}
});

async function seed(){
  await mongoose.connect(process.env.MONGO_URI);
  const User = mongoose.model("User", UserSchema);
  
  // Clear existing users
  await User.deleteMany({});
  
  // Create test users
  const users = await User.create([
    {name: "Admin User", email: "admin@test.com", password: await bcrypt.hash("admin123",10), role: "Admin"},
    {name: "John Doe", email: "john@test.com", password: await bcrypt.hash("john123",10), role: "Member"},
    {name: "Jane Smith", email: "jane@test.com", password: await bcrypt.hash("jane123",10), role: "Member"}
  ]);
  
  console.log("Users seeded:", users.map(u=>u.email));
  process.exit();
}

seed();
