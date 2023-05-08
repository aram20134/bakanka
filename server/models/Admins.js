const {model, Schema, ObjectId} = require('mongoose')

const Admins = new Schema({
  login: { type: String },
  password: { type: String },
  name: { type: String }
})

module.exports = model('Admins', Admins)