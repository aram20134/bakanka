const Booking = require("../models/Booking");
const { default:axios } = require('axios')
const uuid = require('uuid')

class BookingController {
  async addOrder (req, res) {
    try {
      console.log(req.body)
      // const {day, type, title, email, phoneNumber, totalPrice} = req.body
      await Booking.updateOne({type: req.body.type, title: req.body.title}, {...req.body}, {upsert: true})
      const order = await Booking.findOne({...req.body})
      // console.log(order)
      // order.save()
      res.send(order)
    } catch (e) {
      console.log(e)
      return res.status(500).send(e)
    }
  }
  async getOrders (req, res) {
    try {
      const { day, type } = req.body
      const orders = await Booking.find({day, type, status: 'Оплачено'})
      res.send(orders)
    } catch (e) {
      console.log(e)
      return res.status(500).send(e)
    }
  }
  async getOrderById(req, res) {
    try {
      const {id} = req.body
      console.log(id)
      const order = await Booking.findOne({_id: id})
      res.send(order)
    } catch (e) {
      console.log(e)
      return res.status(500).send(e)
    }
  }
  async delOrder (req, res) {
    try {
      const {id} = req.body
      await Booking.deleteOne({_id: id})
      res.send('OK')
    } catch (e) {
      console.log(e)
      return res.status(500).send(e)
    }
  }
  async getAllOrders (req, res) {
    try {
      const orders = await Booking.find()
      res.send(orders)
    } catch (e) {
      console.log(e)
      return res.status(500).send(e)
    }
  }
  async changeDesc (req, res) {
    try {
      const {id, newDesc} = req.body
      const order = await Booking.updateOne({_id: id}, {description: newDesc})
      // Booking.up
      // order.description = 
      res.send({status:'OK'})
    } catch (e) {
      console.log(e)
      return res.status(500).send(e)
    }
  }
  async getPaymentInfo(req, res) {
    try {
      const {id} = req.body

      let config = {
        method: 'get',
        url: `https://api.yookassa.ru/v3/payments/${id}`,
        headers: { 
          'Authorization': 'Basic MzE2OTQ5OnRlc3RfRFRkWVBJMUxsSUVFa1dFUjhyUVVpZ2JvSDdNczYwR001MGlUTUpzX2ZHUQ=='
        }
      };
      const {data} = await axios.request(config)

      res.send(data)
    } catch (e) {
      console.log(e)
      return res.status(500).send(e)
    }
  }

  async getPriceYandex(req, res) {
    try {
      const {value, description, metadata} = req.body

      let body = JSON.stringify({
        "amount": {
          "value": value,
          "currency": "RUB"
        },
        "confirmation": {
          "type": "embedded"
        },
        "capture": true,
        "description": description,
        "metadata": metadata
      });

      const key = uuid.v4()

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://api.yookassa.ru/v3/payments',
        headers: { 
          'Idempotence-Key': key, 
          'Content-Type': 'application/json', 
          'Authorization': 'Basic MzE2OTQ5OnRlc3RfRFRkWVBJMUxsSUVFa1dFUjhyUVVpZ2JvSDdNczYwR001MGlUTUpzX2ZHUQ=='
        },
        data: body
      };
      
      const {data} = await axios.request(config)
      res.send(data)
    } catch (e) {
      console.log(e)
      return res.status(500).send(e)
    }
  }
  async acceptOrder(req, res) {
    try {
      const {id} = req.body
      await Booking.updateOne({_id: id}, {status: 'Оплачено'})
      res.send('OK')
    } catch (e) {
      console.log(e)
      return res.status(500).send(e)
    }
  }
}

module.exports = new BookingController()