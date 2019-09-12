import axios from 'axios'

/* 查询列表 */
export function getSchool(page) {
  return axios.post('/school/page', JSON.stringify(page))
}

/* 删除单个 */
export function remove(id) {
  return axios.get('/school/remove/' + id)
}

/* 查询 */
export function get(id) {
  return axios.get('/school/get/' + id)
}

/* 修改 */
export function edit(data) {
  return axios.post('/school/edit', JSON.stringify(data))
}

/* 添加 */
export function add(data) {
  return axios.post('/school/add', JSON.stringify(data))
}


/* need */
/* 查询列表 */
export function getNeed(page) {
  return axios.post('/need/page', JSON.stringify(page))
}

/* 删除单个 */
export function removeNeed(id) {
  return axios.get('/need/remove/' + id)
}

/* 查询 */
export function getNeedOne(id) {
  return axios.get('/need/get/' + id)
}

/* 修改 */
export function editNeed(data) {
  return axios.post('/need/edit', JSON.stringify(data))
}

/* 添加 */
export function addNeed(data) {
  return axios.post('/need/add', JSON.stringify(data))
}

/* 学校列表 */
export function schoolList() {
  return axios.get('/school/listAll')
}