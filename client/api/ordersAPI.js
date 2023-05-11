import axios from "axios";
import { authHost, host } from ".";
import { v4 as uuidv4 } from 'uuid';

export const addOrder = async (props) => {
  const {data} = await host.post('/', {...props})
  return data
}

export const getOrders = async ({type, day}) => {
  const {data} = await host.post('/orders', {type, day})
  return data
}

export const getAllOrders = async () => {
  const {data} = await host.post('/allorders')
  return data
}

export const changeDesc = async ({id, newDesc}) => {
  const {data} = await host.post('/changeDesc', {id, newDesc})
  return data
}

export const delOrder = async (id) => {
  const {data} = await host.post('/delOrder', {id})
  return data
}

export const logAdmin = async (props) => {
  console.log(props)
  const {data} = await host.post('/log', props)
  return data
}

export const addReview = async (props) => {
  const {data} = await host.post('/addReview', props)
  return data
}

export const getReviews = async () => {
  const {data} = await host.get('/getReviews')
  return data
}

export const getAdminReviews = async () => {
  const {data} = await authHost.get('/getAdminReviews')
  return data
}

export const changeStatusReview = async (props) => {
  const {data} = await authHost.post('/changeStatusReview', props)
  return data
}

export const getImages = async () => {
  const {data} = await host.get('/gallery/getImages')
  return data
}

export const getAdminImages = async () => {
  const {data} = await authHost.get('/gallery/getAdminImages')
  return data
}

export const addImage = async (form) => {
  const {data} = await authHost.post('/gallery/addImage', form)
  return data
}

export const delImage = async (id) => {
  const {data} = await authHost.post('/gallery/delImage', {id})
  return data
}

export const changeImage = async ({id, title, description}) => {
  const {data} = await authHost.post('/gallery/changeImage', {id, title, description})
  return data
}

export const orderPhoneApi = async ({phone, name, comm}) => {
  const {data} = await host.post('/orderPhone', {phone, name, comm})
  return data
}

export const getPriceYandex = async ({value, description}) => {
  let body = JSON.stringify({
    "amount": {
      "value": `"${value}"`,
      "currency": "RUB"
    },
    "confirmation": {
      "type": "embedded"
    },
    "capture": true,
    "description": `"${description}"`
  });
  const key = uuidv4()
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://api.yookassa.ru/v3/payments',
    headers: { 
      'Idempotence-Key': key, 
      'Content-Type': 'application/json', 
      'Authorization': 'Basic MzE3NjA4OnRlc3RfRFRkWVBJMUxsSUVFa1dFUjhyUVVpZ2JvSDdNczYwR001MGlUTUpzX2ZHUQ=='
    },
    data: body
  };

  const {data} = await axios.request(config)
  return data
}