import axios from 'axios'
import {Message } from 'element-ui'

axios.defaults.baseURL = 'http://localhost:8080/zdsub'
//请求头
axios.defaults.headers.post['Content-Type'] = 'application/json'

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  console.log(error)
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  let { status, msg } = response.data;
  if(status === 500) {
    Message.error(msg || '服务器错误')
    return false
  }
  return response
}, function (error) {
  // 对响应错误做点什么
  console.log(error)
  if(error.status === 401) alert(401)
  return Promise.reject(error);
});

export default axios