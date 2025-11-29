import React, { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Toaster } from 'react-hot-toast'
import api from './configs/api'
import { login, setLoading } from './app/features/authSlice'

// Pages
import Home from './pages/Home'
import Layout from './pages/Layout'
import Dashboard from './pages/Dashboard'
import ResumeBuilder from './pages/ResumeBuilder'
import Preview from './pages/Preview'
import Login from './pages/Login'

// Admin
import AdminRoute from './Routes/AdminRoute'
import AdminLayout from './pages/Admin/AdminLayout'
import AdminDashboard from './pages/Admin/AdminDashboard'
import UserManagement from './pages/Admin/UserManagement'
import ForgotPassword from './pages/ForgotPassword'

const App = () => {
  const dispatch = useDispatch()
  const { user, loading } = useSelector(state => state.auth)
  const navigate = useNavigate()

  useEffect(() => {
    const initAuth = async () => {
      dispatch(setLoading(true))

      const token = localStorage.getItem('token')
      const savedUser = JSON.parse(localStorage.getItem('user'))

      // 1. Kembalikan nilai awal dari localStorage
      if (token && savedUser) {
        dispatch(login({ token, user: savedUser }))
      }

      // 2. Ambil data terbaru dari API
      if (token) {
        try {
          const { data } = await api.get('/api/users/data', {
            headers: { Authorization: token }
          })

          if (data.user) {
            dispatch(login({ token, user: data.user }))
            localStorage.setItem('user', JSON.stringify(data.user))
          }
        } catch (err) {
          console.log("Token invalid:", err.message)
          localStorage.removeItem('token')
          localStorage.removeItem('user')
        }
      }

      dispatch(setLoading(false))
    }

    initAuth()
  }, [])

  // Redirect awal setelah user terload
  useEffect(() => {
    if (!loading && user?.role) {
      if (window.location.pathname === '/') {
        if (user.role === 'admin') navigate('/admin')
        else navigate('/app')
      }
    }
  }, [loading, user])

  if (loading) return <div className="text-center p-10">Loading...</div>

  return (
    <>
      <Toaster />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='login' element={<Login />} />
        <Route path='forgot-password' element={<ForgotPassword />} />

        {/* USER ROUTE */}
        <Route path='app' element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path='builder/:resumeId' element={<ResumeBuilder />} />
        </Route>

        <Route path='view/:resumeId' element={<Preview />} />

        {/* ADMIN ROUTE */}
        <Route
          path='admin'
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path='users' element={<UserManagement />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
