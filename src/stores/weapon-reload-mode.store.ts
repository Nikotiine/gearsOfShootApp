import { defineStore } from 'pinia'
import { useApiStore } from '@/stores/api'
import { useQuery } from '@tanstack/vue-query'
import { I18nPrefix } from '@/i18n/i18n-prefix.enum'

export const useWeaponReloadModeStore = defineStore('reload-mode-store', () => {
  const { api } = useApiStore()
  // Private Attibute
  const _I18N_PREFIX = I18nPrefix.RELOAD_MODE
  const _GET_ALL_FN = 'getAllReloadModes'
  // const _GET_BY_ID_FN = 'getSoundNoiseReducerById'
  const getAllQuery = () =>
    useQuery({
      queryKey: [_GET_ALL_FN],
      queryFn: async () => _fetchAll(),
      retry: 0
    })
  const _fetchAll = async () => {
    const res = await api.api.reloadModeControllerFindAll()
    return res.data
  }

  return {
    getAll: getAllQuery,
    getI18NPrefix: _I18N_PREFIX
  }
})
