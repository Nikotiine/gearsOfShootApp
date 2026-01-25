import { defineStore } from 'pinia'
import { useApiStore } from '@/stores/api'
import { useQuery } from '@tanstack/vue-query'
import { I18nPrefix } from '@/i18n/i18n-prefix.enum'

export const useBarrelTypeStore = defineStore('barrelType', () => {
  const { api } = useApiStore()
  const _I18N_PREFIX = I18nPrefix.BARREL_TYPE
  const _GET_ALL_FN = 'getAllBarrelType'
  const _fetchAll = async () => {
    const res = await api.api.barrelTypeControllerFindAll()
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
    getI18NPrefix: _I18N_PREFIX
  }
})
