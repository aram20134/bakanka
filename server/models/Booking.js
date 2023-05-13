const {model, Schema, ObjectId} = require('mongoose')

const Booking = new Schema({
  day:{ type: Date },
  type: { type: String },
  title: { type: Array },
  name: { type: String },
  phoneNumber: { type: String },
  totalPrice: { type: Number },
  status: { type: String, default: 'Не оплачено' },
  description: { type: String }
})

module.exports = model('Booking', Booking)