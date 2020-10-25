const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
{
  fname: String,
  lname: String,
  email:String,
  phone:String,
  password:String 
}
);

module.exports = mongoose.model("User",userSchema);