import axios from 'axios'

/* 查询列表 */
export function getProcess(page) {
  return axios.post('/process/page', JSON.stringify(page))
}

/* 删除单个 */
export function remove(id) {
  return axios.get('/process/remove/' + id)
}

/* 查询 */
export function get(id) {
  return axios.get('/process/get/' + id)
}

/* 修改 */
export function edit(data) {
  return axios.post('/process/edit', JSON.stringify(data))
}

/* 添加 */
export function add(data) {
  return axios.post('/process/add', JSON.stringify(data))
}

/* 上传图片 */
export function upload(file) {
  console.log(file.getAll('file'))
  return axios.post('/policy/upload', file, { 'Content-Type': 'multipart/form-data' })
}

/* 删除图片 */
export function uploadRemove(relaPath) {
  return axios.get('/policy/uploadRemove', { params: { relaPath } })
}