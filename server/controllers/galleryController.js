const Gallery = require("../models/Gallery");
const uuid = require('uuid')
const path = require('path');
const sharp = require("sharp");
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path
const ffmpeg = require('fluent-ffmpeg');
const { default:axios } = require('axios')
const FormData = require('form-data');
const fs = require("fs");
ffmpeg.setFfmpegPath(ffmpegPath);

const compress = async (image) => {
  const isImage = image.mimetype.split('/').shift() === 'image' ? true : false

  if (isImage) {
    const fileName = uuid.v4() + '.webp'
    await sharp(image.data).withMetadata().webp({quality: 70}).toFile(path.join(__dirname, '..', `static/gallery/${fileName}`))
    const gallery = await new Gallery({image: fileName, day: new Date().toLocaleString()}).save()
    return
  }

  const data = new FormData()
  data.append('videoFormat', 'mp4')
  data.append('1', image.data, image.name)
  const response = await axios.post('https://api.products.aspose.app/video/compress/api/compress', data, {headers: {"Content-Type": `multipart/form-data; boundary=${data.getBoundary()}`}})
  
  const fetching = setInterval(async () => {
    const status = await axios.get(`https://api.products.aspose.app/video/compress/api/compress/HandleStatus?fileRequestId=${response.data.Data.FileRequestId}`)
    console.log(new Date().getMinutes(), status.data.Data.DownloadLink, response.data.Data.FileRequestId)
   
    if (status.data.Data.DownloadLink) {
      console.log('all gud')
      axios.get(status.data.Data.DownloadLink, {responseType:'stream'})
      .then(async (res) => {
        const fileName = uuid.v4() + '.mp4'
        const posterName = uuid.v4() + '.webp'
        res.data.pipe(fs.createWriteStream(path.resolve(__dirname, '..', 'static/gallery', fileName)).on('finish', () => {
          ffmpeg(path.resolve(__dirname, '..', `static/gallery/${fileName}`)).takeScreenshots({count:1, timemarks:['0'], filename: posterName, folder: path.resolve(__dirname, '..', 'static/poster')})
        }))
        
        new Gallery({image: fileName, poster: posterName, day: new Date().toLocaleString()}).save()
      })
      clearInterval(fetching)
    }
  }, 5000);

  return response.data.Data
}

class GallertContoller {
  async addImage(req, res) {
    try {
      const { images } = req.files
      console.log(images)
      var response = []

      if (!Array.isArray(images)) {
        await compress(images).then((res) => response.push(res))
      } else {
        for (const image of images) {
         await compress(image).then((res) => response.push(res))
        }
      }

      res.send(response)
    } catch (e) {
      console.log(e)
      return res.status(500).send(e)
    }
  }
  async delImage(req, res) {
    try {
      const { id } = req.body
      const gallery = await Gallery.findOne({_id: id})
      console.log(gallery)
      fs.unlink(path.resolve(__dirname, '..', 'static/gallery', gallery.image), () => {
        console.log('image deleted')
      })
      
      if (gallery.image.split('.').pop() === 'mp4') {
        fs.unlink(path.resolve(__dirname, '..', 'static/poster', gallery.poster), () => {
          console.log('poster deleted')
        })
      }
      await Gallery.deleteOne({_id: id})

      res.send('OK')
    } catch (e) {
      console.log(e)
      return res.status(500).send(e)
    }
  }

  async getImages(req, res) {
    try {
      const images = await Gallery.find().sort({day: -1})
      res.send(images)
    } catch (e) {
      console.log(e)
      return res.status(500).send(e)
    }
  }
  async getAdminImages(req, res) {
    try {
      const images = await Gallery.find().sort({day: -1})
      res.send(images)
    } catch (e) {
      console.log(e)
      return res.status(500).send(e)
    }
  }
  async getImage(req, res) {
    try {
      const { w, h, q, image, poster } = req.query

      var imagePath = path.resolve(__dirname, '..', `static/gallery/${image}`)
      if (poster) {
        imagePath = path.resolve(__dirname, '..', `static/poster/${image}`)
      }
      
      if (image.split('.').pop() === 'webp') {
        const stream = fs.createReadStream(imagePath).on('error', () => console.log('no image'))
        const transform = sharp().withMetadata().resize({width: Number(w), height: Number(h)}).webp({quality: Number(q)})

        res.set('Content-Type', 'image/webp')
        return stream.pipe(transform).pipe(res)
      }
      res.download(imagePath)

      // res.send(imagePath)
    } catch (e) {
      console.log(e)
      return res.status(500).send(e)
    }
  }
  async changeImage(req, res) {
    try {
      const { id, title, description } = req.body
      await Gallery.updateOne({_id: id}, {title, description})

      res.send('OK')
    } catch (e) {
      console.log(e)
      return res.status(500).send(e)
    }
  }
}

module.exports = new GallertContoller()