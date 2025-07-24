import { defineStore } from 'pinia'
import { useApiStore } from '@/stores/api'
import { useQuery } from '@tanstack/vue-query'
import { getI18NPrefix } from '@/enum/I18NSuffix.enum'

export const useTriggerTypeStore = defineStore('trigger-type-store', () => {
  // Appel API
  const { api } = useApiStore()
  // Private Attibute
  const _I18N_PREFIX = 'triggerType'
  const _GET_ALL_FN = 'getAllTriggerType'

  const getAllQuery = () =>
    useQuery({
      queryKey: [_GET_ALL_FN],
      queryFn: async () => _fetchAll(),
      retry: 0
    })
  const _fetchAll = async () => {
    const res = await api.api.triggerTypeControllerFindAll()
    return res.data
  }
  return {
    getAll: getAllQuery,
    getI18NPrefix: getI18NPrefix(_I18N_PREFIX)
  }
})
