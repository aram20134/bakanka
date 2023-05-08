require('dotenv').config()
const express = require("express")
const mongoose = require("mongoose")
const cors = require('cors')
const router = require('./routes/main')
const fileUpload = require('express-fileupload')
const path = require('path')
const TelegramBot = require('node-telegram-bot-api')
const token = process.env.token

const bot = new TelegramBot(token, {polling: true});
const app = express()

app.use(cors())
app.use(express.json())
app.use('/static', express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload())

app.use('/api', router)


const start = async () => {
  try {
    await mongoose.connect(process.env.DB_URL)
    bot.on('message', (msg) => {
      console.log(`new message: ${msg.from.username}, chatId: ${msg.chat.id}, msg: ${msg.text}`)
    })
    app.listen(process.env.PORT, () => {
      console.log('Server started on port ' + process.env.PORT)
    })
    
  } catch (e) {
    console.log(e)
  }
}

start()