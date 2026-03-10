const TOKEN_KEY = 'rb_token'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

export async function login(email, password) {
    console.log(email, password);
    const res = await fetch(`${API_BASE}/auth/log-in/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    })

    const data = await res.json().catch(() => ({}))
    if (!res.ok) {
        const msg = data?.message || res.statusText || 'Login failed'
        throw new Error(msg)
    }
    return data
}

export async function signUp({ name, email, password, phone, role }) {
    const res = await fetch(`${API_BASE}/auth/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, phone, role }),
    })

    const data = await res.json().catch(() => ({}))
    if (!res.ok) {
        const msg = data?.message || res.statusText || 'Registration failed'
        throw new Error(msg)
    }
    return data
}

export function setToken(token) {
    try { localStorage.setItem(TOKEN_KEY, token) } catch (e) {
        console.error('Failed to set token', e)
    }
}

export function getToken() {
    try { return localStorage.getItem(TOKEN_KEY) } catch (e) { 
        console.error('Failed to get token', e)
        return null 
    }
}

export function removeToken() {
    try { localStorage.removeItem(TOKEN_KEY) } catch (e) {
        console.error('Failed to remove token', e)
    }
}

export function getAuthHeaders() {
    const token = getToken()
    return token ? { Authorization: `Bearer ${token}` } : {}
}

export default { login, signUp, setToken, getToken, removeToken, getAuthHeaders }
