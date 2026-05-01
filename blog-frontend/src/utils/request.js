import axios from 'axios'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/user'

const request = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 5000
})

request.interceptors.request.use(config => {
  const userStore = useUserStore()

  if (userStore.token) {
    config.headers.Authorization = userStore.token
  }

  return config
})

request.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    ElMessage.error(error.message || '请求失败')
    return Promise.reject(error)
  }
)

export default request