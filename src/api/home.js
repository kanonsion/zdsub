import axios from './axios'

export function login(users) {
  return axios.post('/manager/login', JSON.stringify(users))
}

export function logout(token) {
  return axios.get('/manager/logout', { params: { key: token } })
}


/* 前台 */
export function work(page) {
  return axios.post('/home/work', JSON.stringify(page))
}
export function get_work(id) {
  return axios.get('/home/toWorkDynamicShow', { params: { id } })
}

export function policy(page) {
  return axios.post('/home/policy', JSON.stringify(page))
}
export function get_policy(id) {
  return axios.get('/home/policy/toAdverShow/' + id)
}

export function process(page) {
  return axios.post('/home/process', JSON.stringify(page))
}
export function get_process(id) {
  return axios.get('/home/process/toAdverShow/' + id)
}

export function need(page) {
  return axios.post('/home/need', JSON.stringify(page))
}
export function get_need(id) {
  return axios.get('/home/need/toAdverShow/' + id)
}

export function school(page) {
  return axios.post('/home/scholl', JSON.stringify(page))
}
export function get_school(id) {
  return axios.get('/home/scholl/toAdverShow/' + id)
}

export function adver(page) {
  return axios.post('/home/adver', JSON.stringify(page))
}
export function get_adver(id) {
  return axios.get('/home/adver/toAdverShow/' + id)
}