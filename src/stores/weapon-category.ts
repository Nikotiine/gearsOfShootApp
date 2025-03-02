import { defineStore } from 'pinia'
import { useApiStore } from '@/stores/api'
import { useQuery } from '@tanstack/vue-query'
import { ref } from 'vue'
import type { LegislationCategoryDto } from '@/api/Api'

export const useWeaponCategoryStore = defineStore('weapon-category', () => {
  const { api } = useApiStore()
  const categories = ref<LegislationCategoryDto[]>([])
  const getAllQuery = () =>
    useQuery({
      queryKey: ['get-all-categories'],
      queryFn: async () => {
        return await api.api.legislationCategoryControllerFindAll()
      }
    })
  const getIdWithName = async (name: string) => {
    if (categories.value.length === 0) {
      console.log('awa')
      // getAllQuery.isFetched
      console.log(categories.value)
    }
    const category = categories.value.find((cat) => cat.name === name)
    console.log(category)
    return category ? category.id : 0
  }

  return {
    getAll: getAllQuery,
    categories$: categories,
    getCategoryIdByCategoryName: getIdWithName
  }
})
export enum LegislationCategory {
  B = 'B',
  C = 'C',
  D = 'D'
}
