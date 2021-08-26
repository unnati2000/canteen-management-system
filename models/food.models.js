const mongoose = require('mongoose');
const FoodItemSchema = new mongoose.Schema({
  foodType: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required:true
  },
  quantity:{
    type:String,
    required:true
  }
});

module.exports = mongoose.model('food', FoodItemSchema);
