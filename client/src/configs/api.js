import axios from 'axios'

// Base URL hanya domain backend, **tanpa /api/users**
const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL, 
    withCredentials: true,
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token && !config.url.includes('login') && !config.url.includes('register')) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

export default api
