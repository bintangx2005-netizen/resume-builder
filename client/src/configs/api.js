import axios from 'axios'

// Base URL hanya domain backend, tanpa /api/users
const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL, 
    withCredentials: true, // jika backend perlu credentials
})

// Interceptor untuk otomatis menambahkan token JWT
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

export default api
