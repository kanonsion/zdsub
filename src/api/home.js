import axios from './axios'

export function login(users){
  return axios.post('/manager/login',users)
}