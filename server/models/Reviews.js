const {model, Schema, ObjectId} = require('mongoose')

const Reviews = new Schema({
  day: { type: Date },
  name: { type: String },
  rating: { type: Number },
  phoneNumber: { type: Number },
  worth: { type: String },
  flaws: { type: String },
  comment: { type: String },
  images: { type: Array },
  allowed: { type: Boolean, default: false }
})

module.exports = model('Reviews', Reviews)