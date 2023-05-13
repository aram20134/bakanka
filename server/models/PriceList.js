const {model, Schema, ObjectId} = require('mongoose')

const PriceList = new Schema({
  title: { type: String },
  rows: { type: Array },
  icon: { type: String },
  booking: { type: Boolean },
  withHumans: { type: Boolean},
  type: { type: String }
})

module.exports = model('PriceList', PriceList)