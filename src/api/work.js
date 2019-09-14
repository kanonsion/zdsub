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


/* policy */
/* 上传图片 */
export function upload(file) {
  return axios.post('/policy/upload', file, { 'Content-Type': 'multipart/form-data' })
}

/* 下载 */
export function download(path) {
  return axios.get('/policy/download', { params: { path } })
}

/* 删除图片 */
export function uploadRemove(relaPath) {
  return axios.get('/policy/uploadRemove', { params: { relaPath } })
}

/* 查询列表 */
export function getpolicy(page) {
  return axios.post('/policy/getPage', JSON.stringify(page))
}

/* 删除单个 */
export function delById_policy(id) {
  return axios.get('/policy/delById?id=' + id)
}
/* 删除单个 */
export function findById_policy(id) {
  return axios.get('/policy/findById?id=' + id)
}

/* 添加 */
export function add_policy(page) {
  return axios.post('/policy/add', JSON.stringify(page))
}



/* work */
export function getwork(page) {
  return axios.post('/work/page', JSON.stringify(page))
}

/* 删除单个 */
export function remove_work(id) {
  return axios.get('/work/remove/' + id)
}

/* 查询 */
export function get_work(id) {
  return axios.get('/work/get/' + id)
}

/* 修改 */
export function edit_work(data) {
  return axios.post('/work/edit', JSON.stringify(data))
}

/* 添加 */
export function add_work(data) {
  return axios.post('/work/add', JSON.stringify(data))
}
