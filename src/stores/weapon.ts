import { defineStore } from 'pinia'
import { useApiStore } from '@/stores/api'
import { useMutation, useQuery } from '@tanstack/vue-query'
import type { CreateWeaponDto, LegislationCategoryDto } from '@/api/Api'
import { useToastStore } from '@/stores/toast'
import { ref } from 'vue'

export const useWeaponStore = defineStore('weapon', () => {
  const { api } = useApiStore()
  const { successMessage } = useToastStore()
  const categoryId = ref<number>(0)
  const categories = ref<LegislationCategoryDto[]>([])

  const queryPrerequisitesWeaponList = useQuery({
    queryKey: ['prerequisite-weapon'],
    queryFn: async () => {
      const res = await api.api.weaponControllerFindPrerequisitesWeaponList()
      categories.value = res.data.categories
      return res
    }
  })
  const queryFindAllWeaponByCategory = useQuery({
    queryKey: ['weaponsByCategory', categoryId],
    queryFn: async () => {
      const res = await api.api.weaponControllerFindAllByCategory(categoryId.value)

      return res
    },
    staleTime: 10000
  })

  const createWeaponMutation = useMutation({
    mutationFn: async (weapon: CreateWeaponDto) => {
      return await api.api.weaponControllerCreate(weapon)
    },
    onSuccess(data) {
      successMessage('weapon.summary', 'weapon.add.success')
    }
  })

  function setId(label: string): void {
    const category = categories.value.find((c) => c.label === label)
    categoryId.value = category?.id || 0
  }

  return {
    prerequisitesWeaponList: queryPrerequisitesWeaponList,
    create: createWeaponMutation,
    getWeaponsByCategoryQuery: queryFindAllWeaponByCategory,
    setCategory: setId,
    categories$: categories
  }
})
