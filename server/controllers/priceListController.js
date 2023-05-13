const PriceList = require("../models/PriceList")


class PriceListController {
  async addPriceList(req, res) {
    try {
      const priceList = await new PriceList({...req.body}).save()
      res.send(priceList)
    } catch (e) {
      console.log(e)
      return res.status(500).send(e)
    }
  }
  async getPriceList(req, res) {
    try {
      const priceList = await PriceList.find()
      res.send(priceList)
    } catch (e) {
      console.log(e)
      return res.status(500).send(e)
    }
  }
  async changePriceListRows(req, res) {
    try {
      const {id, rows} = req.body
      await PriceList.updateOne({_id: id}, {rows})
      const newPriceList = await PriceList.find()
      res.send(newPriceList)
    } catch (e) {
      console.log(e)
      return res.status(500).send(e)
    }
  }
  async delPriceListRow(req, res) {
    try {
      const {id, rows} = req.body
      await PriceList.updateOne({_id: id}, {rows})
      const newPriceList = await PriceList.find()
      res.send(newPriceList)
    } catch (e) {
      console.log(e)
      return res.status(500).send(e)
    }
  }
}

module.exports = new PriceListController()