import axios from "axios";
import config from '../config';
const request = axios.create({
  //   baseURL: config.API_ROOT,
  baseURL: "http://45.138.158.137:92",
  // baseURL:'http://192.168.1.107:8000/web/v1',
  params: {},
});

request.interceptors.request.use(
  (config) => {
    if (!config.headers.Authorization) {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        config.headers["Content-Type"] = "application/json";
      }
    }
    return config;
  },
  (error) => {
    console.log(error);
  }
);

export default request;