import axios from 'axios'

const API_URL = 'http://localhost:3005/auth'

// register user
const register = async (userData) => {
    const response = await axios.post(`${API_URL}/register`, userData)

    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

// login user
const login = async (userData) => {
    const response = await axios.post(`${API_URL}/login`, userData)

    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

// logout user 
const logout = async () => {
    
    const response = await axios.get(`${API_URL}/logout`)
    
    if(response.data) {
        localStorage.removeItem('user')
    }

    return response.data
}

const authService = {
    register,
    login,
    logout
}

export default authService