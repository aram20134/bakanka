const Reviews = require("../models/Reviews");


class ReviewController {
  async addReview (req, res) {
    try {
      const review = new Reviews({...req.body}).save()
      res.send({status: true})
    } catch (e) {
      console.log(e)
      return res.status(500).send(e)
    }
  }
  async getReviews (req, res) {
    try {
      // const {offset, limit} = req.query .skip(offset).limit(limit)
      const reviews = await Reviews.find({allowed: true}).sort({day: -1})
      res.send(reviews)
    } catch (e) {
      console.log(e)
      return res.status(500).send(e)
    }
  }
  async getAdminReviews (req, res) {
    try {
      const reviews = await Reviews.find().sort({day: -1})
      res.send(reviews)
    } catch (e) {
      console.log(e)
      return res.status(500).send(e)
    }
  }
  async changeStatusReview (req, res) {
    try {
      const {action, id} = req.body
      console.log(action, id)
      switch (action) {
        case 'allow':
          await Reviews.updateOne({_id: id}, {allowed: true})
          return res.send('OK')
        case 'disallow':
          await Reviews.updateOne({_id: id}, {allowed: false})
          return res.send('OK')
        case 'delete':
          await Reviews.deleteOne({_id: id})
          return res.send('OK')
        default:
          break;
      }
    } catch (e) {
      console.log(e)
      return res.status(500).send(e)
    }
  }
}

module.exports = new ReviewController()