import axios from 'axios';

const instance = axios.create({
    baseURL: "http://localhost:3000",
    timeout: 15 * 1000
})

// 加上请求拦截器
instance.interceptors.request.use(config => {
    config.headers['Authorization'] = sessionStorage.getItem("token");
    return config;
}, err => {
    console.log(err);
    return Promise.reject(err)
});

export default instance;