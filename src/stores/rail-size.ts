import { defineStore } from 'pinia'
import { useApiStore } from '@/stores/api'
import { useQuery } from '@tanstack/vue-query'

export const useRailSizeStore = defineStore('rail-size', () => {
  // Appel API
  const { api } = useApiStore()
  // Refs
  // Private Attibute

  const _GET_ALL_FN = 'getAllRailSizes'
  // *******************Methodes***************
  const getAllQuery = () =>
    useQuery({
      queryKey: [_GET_ALL_FN],
      queryFn: async () => {
        return api.api.railSizeControllerFindAll()
      }
    })

  return {
    getAll: getAllQuery
  }
})
