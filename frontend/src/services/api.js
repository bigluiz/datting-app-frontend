import axios from 'axios'
const API = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api' })

export function setAuthToken(token) {
  if (token) {
    API.defaults.headers.common['Authorization'] = `Bearer ${token}`
  } else {
    delete API.defaults.headers.common['Authorization']
  }
}

export async function logout() {
  try {
    // Chama o endpoint de logout (opcional)
    if (API.defaults.headers.common['Authorization']) {
      await API.post('/logout')
    }
  } catch (error) {
    console.warn('Error during server logout:', error)
  } finally {
    // Limpa dados do localStorage
    localStorage.removeItem('token')
    localStorage.removeItem('user')

    // Remove o token do cabeçalho das requisições
    delete API.defaults.headers.common['Authorization']
  }
}

export default API
