const Admins = require("../models/Admins");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const TelegramBot = require('node-telegram-bot-api')
const token = '5917550299:AAEXpVROrb2boEMjwnA51QKb5nwM8VxvIZ8'

const bot = new TelegramBot(token);

const signJWT = ({name}) => {
  return jwt.sign(
      {name}, 
      process.env.SECRET_KEY,
      {expiresIn: '1024h'}
  )
}

class AdminsController {
  async reg (req, res) {
    try {
      const {login, name, password} = req.body
      console.log(req.body)
      const hashPassword = await bcrypt.hash(password, 3)
      console.log(hashPassword)
      const admin = new Admins({login, name, password: hashPassword}).save()
      res.send('OK')
    } catch (e) {
      console.log(e)
    }
  }
  async log (req, res) {
    try {
      const {login, password} = req.body
      const admin = await Admins.findOne({login})
      console.log(req.body)
      if (!admin) {
        return res.status(403).send('Не авторизован')
      }
      const comparePasswd = bcrypt.compareSync(password, admin.password)
      if (!comparePasswd) {
        return res.status(404).send('Не верный пароль')
      }
      const token = signJWT(admin)
      res.send(token)
    } catch (e) {
      console.log(e)
      res.status(500).send(e)
    }
  }
  
  async orderPhone(req, res) {
    try {
      const { phone, name, comm } = req.body
      console.log(phone, name, comm)
      bot.sendMessage(681427377, `Заказ на звонок:\nИмя: ${name},\nНомер: +${phone},\nКомментарий: ${comm}\n\nБаканское озеро`)
      res.send('OK')
    } catch (e) {
      console.log(e)
      res.status(500).send(e)
    }
  }
  async verifyToken(req, res) {
    try {
      const {token} = req.body
      if (!token) {
          return res.status(401).json({message:"Не авторизован"})
      }
      const decoded = jwt.verify(token, process.env.SECRET_KEY)
      const newToken = signJWT({name: decoded.name})
      res.send(newToken)
    } catch (e) {
      console.log(e)
      res.status(500).send(e)
    }
  }
}

module.exports = new AdminsController()