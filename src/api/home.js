import axios from './axios'

export function login(users) {
  return axios.post('/manager/login', JSON.stringify(users))
}

export function logout(token) {
  return axios.get('/manager/logout', { params: { key: token } })
}
