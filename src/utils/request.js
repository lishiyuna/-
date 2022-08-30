// 封装ajax
import axios from "axios";
import router from "../router/index";
import "element-plus/es/components/message/style/css";
import { ElMessage } from "element-plus";
//引入element ui 库里面的弹出层
const service = axios.create({
  baseURL: process.env.VUE_APP_URL,
  //请求超时时间
  timeout: 1000 * 60 * 5,
});

//添加请求拦截器 为了携带token
service.interceptors.request.use(
  function (config) {
    // console.log('请求拦截', config);
    // 在发送请求之前做些什么
    if (!config.url.includes("/login")) {
      // config.headers["AUTHORIZATION"] = "Bearer " + localStorage.getItem('token')
      config.headers.authorization = localStorage.getItem("VUE_ADMIN_TOKEN");
    }
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
service.interceptors.response.use(
  function (response) {
    // console.log("响应拦截器", response);
    
      if (response.data.code == 403) {
        // 跳转到对应的页面
        // console.log(router);
        router.push("/login");
      }
    
    // 对响应数据做点什么
    return response.data;
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

export default service;
