import axios from 'axios';
import { getCookie } from 'cookies-next';

const host = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL
})
    
const authHost = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL
})

const authInterceptor = (config) => {
    config.headers.Authorization = `Bearer ${getCookie('token')}`
    return config
}
authHost.interceptors.request.use(authInterceptor)

export {
  host,
  authHost
}