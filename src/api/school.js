import axios from 'axios'

export function getSchool(page) {
  return axios.post('/school/page', JSON.stringify(page))
}