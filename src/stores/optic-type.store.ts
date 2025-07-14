import { defineStore } from 'pinia'
import { useApiStore } from '@/stores/api'

import { useQuery } from '@tanstack/vue-query'
import { getI18NPrefix } from '@/enum/I18NSuffix.enum'
import { ref } from 'vue'
import type { OpticTypeDto } from '@/api/Api'

export const useOpticTypeStore = defineStore('optic-type-store', () => {
  // Appel API
  const { api } = useApiStore()

  // Refs
  const opticTypes = ref<OpticTypeDto[]>([])
  // Private Attibute
  const _I18N_PREFIX = 'opticType'
  const _GET_ALL_FN = 'getAllOpticType'
  const getAllQuery = () =>
    useQuery({
      queryKey: [_GET_ALL_FN],
      queryFn: async () => _fetchAll(),
      retry: 0
    })
  const _fetchAll = async () => {
    const res = await api.api.opticTypeControllerFindAll()
    opticTypes.value = res.data
    return res.data
  }
  return {
    getAll: getAllQuery,
    getI18NPrefix: getI18NPrefix(_I18N_PREFIX),
    opticTypes$: opticTypes
  }
})
