import axios from 'axios'

/* 查询列表 */
export function getSchool(page) {
  return axios.post('/school/page', JSON.stringify(page))
}

/* 删除单个 */
export function remove(id){
  return axios.get('school/remove/'+id)
}