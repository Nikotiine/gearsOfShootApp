import { defineStore } from 'pinia'
import { useApiStore } from '@/stores/api'
import { useQuery } from '@tanstack/vue-query'

export const useOpticClickValueStore = defineStore('optic-click-value-store', () => {
  const { api } = useApiStore()
  const _GET_ALL_FN = 'getAllOpticClickValue'
  const _fetchAll = async () => {
    const res = await api.api.opticClickControllerFindAll()
    return res.data
  }
  const getAllQuery = () =>
    useQuery({
      queryKey: [_GET_ALL_FN],
      queryFn: async () => _fetchAll(),
      retry: 0
    })
  return {
    getAll: getAllQuery
  }
})
