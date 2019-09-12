import axios from 'axios'

/* 查询列表 */
export function getManager(page) {
  return axios.post('/manager/getPage', JSON.stringify(page))
}

/* 删除单个 */
export function remove(id) {
  return axios.get('/school/remove/' + id)
}

/* 查询 */
export function get(id) {
  return axios.get('manager/getById?id=' + id)
}

/* 修改 */
export function add(data) {
  console.log(JSON.stringify(data))
  return axios.post('/manager/add', JSON.stringify(data))
}

/* 级别列表 */
export function roleList() {
  return axios.get('/role/findAll')
}