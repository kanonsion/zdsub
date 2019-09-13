import axios from 'axios'

/* 查询列表 */
export function getAdver(page) {
  return axios.post('/adver/page', JSON.stringify(page))
}

/* 删除单个 */
export function remove(id) {
  return axios.get('/adver/remove/' + id)
}

/* 查询 */
export function get(id) {
  return axios.get('/adver/get/' + id)
}

/* 修改 */
export function edit(data) {
  return axios.post('/adver/edit', JSON.stringify(data))
}

/* 添加 */
export function add(data){
  return axios.post('/adver/add',JSON.stringify(data))
}


/* enterName */
/* 查询 */
export function getenterName(page) {
  return axios.post('/enterName/getPage', JSON.stringify(page))
}