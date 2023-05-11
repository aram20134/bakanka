const {model, Schema, ObjectId} = require('mongoose')

const Booking = new Schema({
  day:{ type: Date },
  type: { type: String },
  title: { type: Array },
  email: { type: String },
  phoneNumber: { type: String },
  totalPrice: { type: Number },
  isActive: { type: Boolean, default: false },
  description: { type: String }
})

module.exports = model('Booking', Booking)