import { defineStore } from 'pinia'
import { useApiStore } from '@/stores/api'

import { useQuery } from '@tanstack/vue-query'
import { ref } from 'vue'
import type { OpticTypeDto } from '@/api/Api'
import { I18nPrefix } from '@/i18n/i18n-prefix.enum'

export const useOpticTypeStore = defineStore('optic-weapon-type-store', () => {
  // Appel API
  const { api } = useApiStore()

  // Refs
  const opticTypes = ref<OpticTypeDto[]>([])
  // Private Attibute
  const _I18N_PREFIX = I18nPrefix.OPTIC_TYPE
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
    getI18NPrefix: _I18N_PREFIX,
    opticTypes$: opticTypes
  }
})
