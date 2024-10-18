// axios.interceptor.ts
import axios from 'axios'

// Créer une instance Axios avec une configuration de base
const axiosInstance = axios.create({
  baseURL: '', // Remplace par l'URL de ton API
  headers: {
    'Content-Type': 'application/json'
  }
})

// Interceptor de requête pour ajouter le Bearer Token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('token') // Récupérer le token du localStorage
    console.log('token')
    if (token && config.headers) {
      config.headers['Authorization'] = `Bearer ${token}` // Ajouter le Bearer Token
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Interceptor de réponse pour gérer les erreurs globales (optionnel)
/*axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Gérer les erreurs 401 (par exemple, rediriger vers la page de login)
      window.location.href = '/'
    }
    return Promise.reject(error)
  }
)*/

export default axiosInstance
