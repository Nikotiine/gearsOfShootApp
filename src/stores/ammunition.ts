import { defineStore } from 'pinia'
import { useApiStore } from '@/stores/api'
import { useToastStore } from '@/stores/toast'
import { useMutation, useQuery } from '@tanstack/vue-query'
import type { AmmunitionDto, CreateAmmunitionDto } from '@/api/Api'
import { type Ref, ref } from 'vue'

export const useAmmunitionStore = defineStore('ammunition', () => {
  const { api } = useApiStore()
  const { successMessage } = useToastStore()
  const ammunitions = ref<AmmunitionDto[]>([])
  const queryPrerequisitesAmmunitionList = useQuery({
    queryKey: ['prerequis-ammunition'],
    queryFn: async () => {
      return await api.api.ammunitionControllerFindPrerequisitesAmmunitionList()
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

  const queryFindAllAmmunitionByCategory = (category: Ref<string>) =>
    useQuery({
      queryKey: ['ammunitionByCategory', category.value],
      queryFn: async () => {
        return await api.api.ammunitionControllerFindByCategory(category.value)
      },
      enabled: !!category.value
    })

  return {
    prerequisitesAmmoList: queryPrerequisitesAmmunitionList,
    create: createAmmunitionMutation,
    getByCategory: queryFindAllAmmunitionByCategory
  }
})
