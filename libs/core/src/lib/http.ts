// import { useAuthStore } from "../stores/auth";
import axios from "axios";
import { transformReq } from "./helper";
import cache from './cache';

const LOCAL_USER_KEY = 'local_user';

const HTTP = axios.create({
  baseURL: `${import.meta.env.VITE_PUBLIC_API_URL}`
})

HTTP.interceptors.request.use((req) => {
  const token = cache.getCache(LOCAL_USER_KEY)?.data?.token;
  if (token && req.headers) {
    req.headers['Authorization'] = `Bearer ${token}`
  }
  if(req.method === 'get'){
   req.params =  transformReq(req.params)
  }
  return req;
})

HTTP.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    const data = err.response && err.response.data;
    if (err.response && err.response.status === 401 && Event !== undefined) {
      //logout user
    }
    console.error('HTTP error: ', err);
    err.message = data?.message || err.message;
    throw err;
  } 
)



export default HTTP;