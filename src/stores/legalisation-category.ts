import { defineStore } from 'pinia'
import { useApiStore } from '@/stores/api'
import { useQuery } from '@tanstack/vue-query'
import { getI18NPrefix } from '@/enum/I18NSuffix.enum'

export const useLegalisationCategoryStore = defineStore('weapon-category', () => {
  const { api } = useApiStore()
  // Private Attibute
  const _I18N_PREFIX = 'legalisationCategory'
  const _GET_ALL_FN = 'getAllWeaponCategories'
  // const _GET_BY_ID_FN = 'getSoundNoiseReducerById'
  const getAllQuery = () =>
    useQuery({
      queryKey: [_GET_ALL_FN],
      queryFn: async () => _fetchAll(),
      retry: 0
    })
  const _fetchAll = async () => {
    const res = await api.api.legislationCategoryControllerFindAll()
    return res.data
  }

  return {
    getAll: getAllQuery,
    getI18NPrefix: getI18NPrefix(_I18N_PREFIX)
  }
})
export enum LegislationCategory {
  B = 'B',
  C = 'C',
  D = 'D'
}
