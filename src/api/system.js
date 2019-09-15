import axios from 'axios'

/* 查询列表 */
export function getManager(page) {
  return axios.post('/manager/getPage', JSON.stringify(page))
}

/* 删除单个 */
export function delById(id) {
  return axios.get('/manager/delById?id=' + id)
}

/* 查询 */
export function get(id) {
  return axios.get('manager/getById?id=' + id)
}
/* 查询 */
export function verifyByName(name) {
  return axios.get('manager/verifyByName?name=' + name)
}

/* 修改 */
export function add(data) {
  return axios.post('/manager/add', JSON.stringify(data))
}

export function update(data) {
  return axios.post('/manager/update', JSON.stringify(data))
}

/* 级别列表 */
export function roleList() {
  return axios.get('/role/findAll')
}


/* role */

/* 查询列表 */
export function getrole(page) {
  return axios.post('/role/getPage', JSON.stringify(page))
}

/* 删除单个 */
export function delById_role(id) {
  return axios.get('/role/delById?id=' + id)
}

/* 查询 */
export function get_role(id) {
  return axios.get('role/findById?id=' + id)
}

/* 修改 */
export function add_role(data) {
  return axios.post('/role/add', JSON.stringify(data))
}

export function update_role(data) {
  return axios.post('/role/update', JSON.stringify(data))
}

export function findNotParent(id) {
  return axios.get('/menu/findNotParent', { params: { id } })
}