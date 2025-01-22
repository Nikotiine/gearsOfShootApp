import { defineStore } from 'pinia'
import { useApiStore } from '@/stores/api'
import { useQuery } from '@tanstack/vue-query'
import { ref } from 'vue'
import type { LegislationCategoryDto } from '@/api/Api'

export const useWeaponCategoryStore = defineStore('weapon-category', () => {
  const { api } = useApiStore()
  const categories = ref<LegislationCategoryDto[]>([])
  const getAllQuery = useQuery({
    queryKey: ['get-all-categories'],
    queryFn: async () => {
      const res = await api.api.legislationCategoryControllerFindAll()
      categories.value = res.data
      return res
    }
  })
  const getIdWithName = (name: string) => {
    const category = categories.value.find((cat) => cat.name === name)
    return category ? category.id : 0
  }

  return {
    getAll: getAllQuery,
    categories$: categories,
    getCategoryIdByCategoryName: getIdWithName
  }
})
