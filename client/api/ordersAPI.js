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

export const getPriceYandex = async ({value, description, metadata}) => {
  const {data} = await host.post('/getPriceYandex', {value, description, metadata})
  return data
}

export const getOrderById = async (id) => {
  const {data} = await host.post('/getOrderById', {id})
  return data
}

export const getPaymentInfo = async (id) => {
  const {data} = await host.post('/getPaymentInfo', {id})
  return data
}

export const acceptOrder = async (id) => {
  const {data} = await host.post('/acceptOrder', {id})
  return data
}

export const getPriceList = async () => {
  const {data} = await host.get('/pl/getPriceList')
  return data
}

export const verifyToken = async (token) => {
  const {data} = await authHost.post('/verifyToken', {token})
  return data
}

export const changePriceListRows = async (id, rows) => {
  const {data} = await authHost.post('/changePriceListRows', {id, rows})
  return data
}

export const delPriceListRow = async (id, rows) => {
  const {data} = await authHost.post('/delPriceListRow', {id, rows})
  return data
}