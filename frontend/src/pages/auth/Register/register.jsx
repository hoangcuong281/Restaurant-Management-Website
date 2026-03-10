import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as authService from 'services/authService'
import Header from  '@/components/NavBar/navBar.jsx'

function Register() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const validate = () => {
    if (!form.name || !form.email || !form.password) return 'Name, email and password are required.'
    const re = /^\S+@\S+\.\S+$/
    if (!re.test(form.email)) return 'Please enter a valid email.'
    if (form.password.length < 6) return 'Password must be at least 6 characters.'
    return ''
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    const v = validate()
    if (v) return setError(v)
    try {
      setLoading(true)
      await authService.signUp({ ...form, role: 'customer' })
      navigate('/login')
    } catch (err) {
      setError(err.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
      <div className="min-h-[70vh]">
        <Header />
        <div className="flex items-center justify-center p-4 mt-40">
            <form
                className="w-full max-w-md bg-white rounded-lg shadow-md p-6 flex flex-col gap-4"
                onSubmit={handleSubmit}
                noValidate
            >
                <h2 className="text-xl font-semibold text-center">Create an account</h2>

                <label className="flex flex-col text-sm">
                <span className="">Full name</span>
                <input
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    className="mt-2 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
                    placeholder="Your full name"
                    required
                />
                </label>

                <label className="flex flex-col text-sm">
                <span className="">Email</span>
                <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    className="mt-2 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
                    placeholder="you@example.com"
                    required
                />
                </label>

                <label className="flex flex-col text-sm">
                <span className="">Password</span>
                <input
                    name="password"
                    type="password"
                    value={form.password}
                    onChange={handleChange}
                    className="mt-2 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
                    placeholder="Choose a password"
                    required
                />
                </label>

                <label className="flex flex-col text-sm">
                <span className="">Phone (optional)</span>
                <input
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    className="mt-2 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
                    placeholder="0123-456-789"
                />
                </label>
                {error && <div className="text-red-700 bg-red-50 p-3 rounded">{error}</div>}


                <button
                    className="mt-2 py-2 px-4 bg-[var(--Aka)] border cursor-pointer text-white rounded-md font-semibold hover:bg-[var(--Shiro)] hover:text-black hover:border transition"
                    type="submit"
                    disabled={loading}
                >
                {loading ? 'Creating account...' : 'Create account'}
                </button>
            </form>
    </div>
      </div>
  )
}

export default Register
