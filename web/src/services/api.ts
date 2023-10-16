import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({ baseURL : "http://localhost:3333/"})
api.interceptors.request.use(
  async (config) => {
    config.headers['Authorization'] = `Bearer ${ await Cookies.get('jrpanfletos-1.0.0')}`;
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export { api }