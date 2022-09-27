// 物流信息接口地址 https://lianghj.top:8888/api/private/v1/
import axios from 'axios';

const instance = axios.create({
  baseURL: "https://lianghj.top:8888/api/private/v1/",
  timeout: 15 * 1000
})

// 加上axios请求拦截器
instance.interceptors.request.use(config => {
  config.headers['Authorization'] = JSON.parse(sessionStorage.getItem("token"));
  return config;
}, err => {
  console.log(err);
  return Promise.reject(err)
});

export default instance;