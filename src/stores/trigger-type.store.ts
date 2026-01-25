import { defineStore } from 'pinia'
import { useApiStore } from '@/stores/api'
import { useQuery } from '@tanstack/vue-query'
import { I18nPrefix } from '@/i18n/i18n-prefix.enum'

export const useTriggerTypeStore = defineStore('trigger-weapon-type-store', () => {
  // Appel API
  const { api } = useApiStore()
  // Private Attibute
  const _I18N_PREFIX = I18nPrefix.TRIGGER_TYPE
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
    getI18NPrefix: _I18N_PREFIX
  }
})
