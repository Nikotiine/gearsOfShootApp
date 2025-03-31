import { defineStore } from 'pinia'
import { useApiStore } from '@/stores/api'
import { useQuery } from '@tanstack/vue-query'
import { ref } from 'vue'
import type { LegislationCategoryDto } from '@/api/Api'

export const useWeaponCategoryStore = defineStore('weapon-category', () => {
  const { api } = useApiStore()
  // Private Attibute

  const _GET_ALL_FN = 'getAllWeaponCategories'
  // const _GET_BY_ID_FN = 'getSoundNoiseReducerById'
  const categories = ref<LegislationCategoryDto[]>([])
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
    categories$: categories
  }
})
export enum LegislationCategory {
  B = 'B',
  C = 'C',
  D = 'D'
}
