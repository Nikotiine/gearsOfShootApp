import { defineStore } from 'pinia'
import { useApiStore } from '@/stores/api'

import { useQuery } from '@tanstack/vue-query'
import { I18nPrefix } from '@/i18n/i18n-prefix.enum'

export const useFocalPlaneStore = defineStore('focal-plane-store', () => {
  // Appel API
  const { api } = useApiStore()

  // Private Attibute
  const _I18N_PREFIX = I18nPrefix.FOCAL_PLANE
  const _GET_ALL_FN = 'getAllFocalPlane'
  const getAllQuery = () =>
    useQuery({
      queryKey: [_GET_ALL_FN],
      queryFn: async () => _fetchAll(),
      retry: 0
    })
  const _fetchAll = async () => {
    const res = await api.api.opticFocalPlaneControllerFindAll()
    return res.data
  }
  return {
    getAll: getAllQuery,
    getI18NPrefix: _I18N_PREFIX
  }
})
