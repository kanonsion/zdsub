import axios from 'axios'
import { Message, Loading } from 'element-ui'
import router from './../routers'

axios.defaults.baseURL = 'http://localhost:8080/zdsub'
//请求头
axios.defaults.headers.post['Content-Type'] = 'application/json'

/* 加载层 */
let loadingInstance
// 添加请求拦截器
axios.interceptors.request.use(config => {
  // 在发送请求之前做些什么
  loadingInstance = Loading.service({ fullscreen: true})
  if (localStorage.token) {
    config.headers.Authorization = localStorage.token
  }
  loadingInstance.close()
  return config;
}, error => {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(response => {
  // 对响应数据做点什么
  loadingInstance = Loading.service({ fullscreen: true})
  let { status, msg } = response.data;
  if (status === 500) {
    Message.error(msg || '服务器错误')
  }
  loadingInstance.close()
  return response
}, error => {
  // 对响应错误做点什么
  console.log(error)
  if (error.response.status === 401) {
    Message.error('请重新登录')
    router.push('/login')
  }
  return Promise.reject(error);
});
export default axios