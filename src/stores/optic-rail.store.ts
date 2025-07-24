import { defineStore } from 'pinia'
import { useApiStore } from '@/stores/api'
import { useQuery } from '@tanstack/vue-query'
import { getI18NPrefix } from '@/enum/I18NSuffix.enum'

export const useOpticRailStore = defineStore('optic-rail-store', () => {
  const { api } = useApiStore()
  const _I18N_PREFIX = 'opticRail'
  const _GET_ALL_FN = 'getAllOpticRail'
  const _fetchAll = async () => {
    const res = await api.api.railSizeControllerFindAll()
    return res.data
  }
  const getAllQuery = () =>
    useQuery({
      queryKey: [_GET_ALL_FN],
      queryFn: async () => _fetchAll(),
      retry: 0
    })
  return {
    getAll: getAllQuery,
    getI18NPrefix: getI18NPrefix(_I18N_PREFIX)
  }
})
