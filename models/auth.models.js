const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  branch: {
    type: String,
    required: true,
    enum: ["COMPUTER","IT", "EXTC", "ETRX","MECHANICAL", "CIVIL" ]
  },
  role:{
    type:String,
    enum:["student", "teacher", "admin"],
    required: true
  },  
  isAdmin: {
    type: Boolean,
  },
});

module.exports = mongoose.model('user', UserSchema);
