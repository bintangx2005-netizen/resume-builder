import React, { useState } from 'react'
import api from '../configs/api'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const ForgotPassword = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  })

  const handleChange = (e) => {
    const {name, value} = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      return toast.error("Password dan Confirm Password tidak sama")
    }

    try {
      const {data} = await api.post('/api/users/reset-password', {
        email: formData.email,
        newPassword: formData.password
      })
      toast.success(data.message)
      navigate("/login")
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message)
    }
  }

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-50'>
      <form onSubmit={handleSubmit} className="sm:w-[350px] w-full text-center border border-gray-300 rounded-2xl px-8 bg-white">
        <h1 className="text-2xl font-medium mt-10">Reset Password</h1>
        <p className="text-gray-500 text-sm mt-2">Enter your email and new password</p>

        <input type="email" name="email" className="w-full border mt-5 p-3 rounded-full"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
          required />

        <input type="password" name="password" className="w-full border mt-3 p-3 rounded-full"
          placeholder="New Password"
          value={formData.password}
          onChange={handleChange}
          required />

        <input type="password" name="confirmPassword" className="w-full border mt-3 p-3 rounded-full"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required />

        <button type="submit" className="w-full mt-4 mb-10 h-11 rounded-full bg-green-500 text-white">
          Reset Password
        </button>
      </form>
    </div>
  )
}

export default ForgotPassword
