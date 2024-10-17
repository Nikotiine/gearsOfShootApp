import { defineStore } from 'pinia'
import { ApiService } from '@/api/Api'
import axiosInstance from '../../axios.interceptor'
export const useApiStore = defineStore('api', () => {
  const api = new ApiService()
  api.instance = axiosInstance
  return { api }
})
