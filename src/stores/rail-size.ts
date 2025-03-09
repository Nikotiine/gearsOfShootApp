import { defineStore } from 'pinia'
import { useApiStore } from '@/stores/api'
import { useQuery } from '@tanstack/vue-query'

export const useRailSizeStore = defineStore('rail-size', () => {
  // Appel API
  const { api } = useApiStore()
  // Refs

  // *******************Methodes***************
  const getAllQuery = () =>
    useQuery({
      queryKey: ['rail-size-get-all'],
      queryFn: async () => {
        return api.api.railSizeControllerFindAll()
      }
    })

  return {
    getAll: getAllQuery
  }
})
