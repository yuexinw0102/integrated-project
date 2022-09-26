import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 15 * 1000,
});

// 加上axios请求拦截器
instance.interceptors.request.use(
  (config) => {
    let token = JSON.parse(sessionStorage.getItem("token"));
    if (token !== null || token !== "" || token !== undefined) {
      config.headers["Authorization"] = token.token;
    }
    return config;
  },
  (err) => {
    console.log(err);
    return Promise.reject(err);
  }
);

export default instance;
