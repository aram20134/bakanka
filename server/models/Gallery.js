const {model, Schema, ObjectId} = require('mongoose')

const Gallery = new Schema({
  image: { type: String },
  title: { type: String, default: null },
  description: { type: String, default: null },
  enabled: { type: Boolean, default: false },
  poster: { type: String },
  day: { type: Date }
})

module.exports = model('Gallery', Gallery)