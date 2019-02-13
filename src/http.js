// 引入axios以及element ui中的loading和message组件
import axios from 'axios'
import store from './store';
import { Loading, Message } from 'element-ui'
// 超时时间
axios.defaults.timeout = 5000
// http请求拦截器
axios.interceptors.request.use(config => {
  $store.state.isLoading=true;
  return config
}, error => {
  $store.state.isLoading=false;
  return Promise.reject(error)
})
// http响应拦截器
axios.interceptors.response.use(data => {// 响应成功关闭loading
  $store.state.isLoading=true;
  return data
}, error => {
  $store.state.isLoading=false;
  return Promise.reject(error)
})

export default axios
