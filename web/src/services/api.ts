import axios from "axios";
import Cookies from "js-cookie";

axios.interceptors.request.use((config)=> {
  config.headers["Authorization"] = `Bearer ${Cookies.get('@jrpanfletos-1.0.0')}`
  return config;
})

export const api = axios.create({ baseURL : "http://localhost:3333/", headers : { Authorization : `Bearer ${Cookies.get('@jrpanfletos-1.0.0')}`}})