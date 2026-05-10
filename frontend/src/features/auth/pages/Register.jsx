import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router'
import axios from 'axios'
import { useAuth } from '../hooks/useAuth'


const Register = () => {
  const {loading , handelRegister}= useAuth()
    const navigate = useNavigate()
  const [form, setForm] = useState({
    username:"",
    email: "",
    password: ""
  })
  
  const [serverError, setServerError] = useState('')

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setServerError('')
    
    try {
      await handelRegister({username:form.username,email:form.email,password:form.password})
      setForm({ username:"",email: "", password: "" })
      navigate('/')
    } catch (error) {
      if (error.response) {
        setServerError(error.response.data.message || "Failed to register")
      } else {
        setServerError("Network error, please try again")
      }
    }
  }
  
  if (loading) {
    return (
      <main className="min-h-screen w-full flex justify-center items-center bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          {/* Spinner */}
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <h1 className="text-lg font-semibold text-gray-600">Loading...</h1>
        </div>
      </main>
    )
  }

  return (
   <main className="min-h-screen w-full flex justify-center items-center bg-gray-900 px-4 py-8">

      <div className="w-full max-w-sm sm:max-w-md bg-white rounded-2xl shadow-lg p-6 sm:p-8 md:p-10 flex flex-col gap-6">

        {/* Title */}
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Welcome 
          </h1>
          <p className="text-sm sm:text-base text-gray-500 mt-1">
            Create account 
          </p>
        </div>

        {/* Server error */}
        {serverError && (
          <div className="bg-red-50 border border-red-300 text-red-600 text-sm rounded-xl px-4 py-3 text-center">
            {serverError}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
             {/* username */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="username"
              className="text-sm sm:text-base font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="username"
              id="username"
              name="username"
              placeholder="Enter your username"
              value={form.username}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 text-black rounded-xl border border-gray-300 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition placeholder:text-gray-900"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="email"
              className="text-sm sm:text-base font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 text-black rounded-xl border border-gray-300 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition placeholder:text-gray-900"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="password"
              className="text-sm sm:text-base font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 text-black rounded-xl border border-gray-300 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition  placeholder:text-gray-900"
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full py-3 rounded-xl bg-blue-600 text-white text-base sm:text-lg font-semibold hover:bg-blue-700 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
          >
            {loading ? "Logging in..." : "Sign up"}
          </button>

        </form>

        {/* Footer */}
        <p className="text-center text-sm sm:text-base text-gray-500">
          Don't have an account?
          <Link
            to="/login"
            className="text-blue-600 font-medium hover:underline"
          >
            Login
          </Link>
        </p>

      </div>
    </main>
  )
}

export default Register
