const Booking = require("../models/Booking");

class BookingController {
  async addOrder (req, res) {
    try {
      console.log(req.body)
      // const {day, type, title, email, phoneNumber, totalPrice} = req.body
      const order = new Booking({...req.body})
      console.log(order)
      order.save()
      res.send(order)
    } catch (e) {
      console.log(e)
      return res.status(500).send(e)
    }
  }
  async getOrders (req, res) {
    try {
      const { day, type } = req.body
      const orders = await Booking.find({day, type, isActive: true})
      res.send(orders)
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
  
}

module.exports = new BookingController()