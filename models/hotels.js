const mongoose = require("mongoose");

const HotelSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  Type: {
    type: String,
    required: true,
  },
  City: {
    type: String,
    required: true,
  },
  Address: {
    type: String,
    required: true,
  },
  Distance: {
    type: String,
    required: true,
  },
  Photos: {
    type: [String],
    // required: true,
    default: null,
  },
  Title: {
    type: String,
    required: true,
  },
  Desc: {
    type: String,
    required: true,
  },
  Rating: {
    type: Number,
    min: 0,
    max: 5,
  },
  Rooms: {
    type: [String],
  },
  CheepestPrice: {
    type: Number,
    required: true,
  },
  Featured: {
    type: Boolean,
    default: false,
  },
});

const Hotels = mongoose.model("Hotel", HotelSchema);

module.exports = Hotels;
