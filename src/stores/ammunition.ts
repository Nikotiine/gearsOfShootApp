import { defineStore } from 'pinia'
import { useApiStore } from '@/stores/api'
import { useToastStore } from '@/stores/toast'
import { useMutation, useQuery } from '@tanstack/vue-query'
import type { AmmunitionDto, CreateAmmunitionDto, LegislationCategoryDto } from '@/api/Api'
import { ref } from 'vue'

export const useAmmunitionStore = defineStore('ammunition', () => {
  const { api } = useApiStore()
  const { successMessage } = useToastStore()
  const ammunitions = ref<AmmunitionDto[]>([])
  const categories = ref<LegislationCategoryDto[]>([])
  const categoryId = ref<number>(0)
  const queryPrerequisitesAmmunitionList = useQuery({
    queryKey: ['prerequis-ammunition'],
    queryFn: async () => {
      const res = await api.api.ammunitionControllerFindPrerequisitesAmmunitionList()
      categories.value = res.data.categories
      return res
    }
  })

  const createAmmunitionMutation = useMutation({
    mutationFn: async (ammunition: CreateAmmunitionDto) => {
      return await api.api.ammunitionControllerCreate(ammunition)
    },
    onSuccess(data) {
      ammunitions.value.push(data.data)
      successMessage('ammunition.summary', 'ammunition.add.success')
    }
  })

  const queryFindAllAmmunitionByCategory = useQuery({
    queryKey: ['ammunitionByCategory', categoryId],
    queryFn: async () => {
      const res = await api.api.ammunitionControllerFindByCategory(categoryId.value)
      ammunitions.value = res.data
      return res
    }
  })

  function setCategoryId(label: string): void {
    const category = categories.value.find((cat) => (cat.label = label))
    categoryId.value = category?.id || 0
  }

  return {
    prerequisitesAmmoList: queryPrerequisitesAmmunitionList,
    create: createAmmunitionMutation,
    getByCategory: queryFindAllAmmunitionByCategory,
    setCategory: setCategoryId,
    categories$: categories
  }
})
