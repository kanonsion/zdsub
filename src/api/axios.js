import axios from 'axios'
import { Message, Loading } from 'element-ui'
import router from './../routers'

axios.defaults.baseURL = 'http://182.92.64.223:8080/zdsub'
//请求头
axios.defaults.headers.post['Content-Type'] = 'application/json'
/*  */
/* 加载层 */
let loadingInstance
// 添加请求拦截器
axios.interceptors.request.use(config => {
  // 在发送请求之前做些什么
  loadingInstance = Loading.service({
    fullscreen: true, text: "加载中",
    background: 'rgba(0, 0, 0, .7)'
  })
  if (sessionStorage.token) {
    config.headers.Authorization = sessionStorage.token
  }
  return config;
}, error => {
  // 对请求错误做些什么
  loadingInstance.close()
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(response => {
  // 对响应数据做点什么
  loadingInstance.close()
  let { status, msg } = response.data;
  if (status === 500) {
    Message.error(msg || '服务器错误')
  }
  loadingInstance.close()
  return response
}, error => {
  // 对响应错误做点什么
  loadingInstance.close()
  if (error.response.status === 401) {
    Message.error('请重新登录')
    router.push('/login')
  }
  if (error.response.status === 402) {
    Message.error('没有权限')
    router.push('/layout')
  }
  return Promise.reject(error);
});
export default axios