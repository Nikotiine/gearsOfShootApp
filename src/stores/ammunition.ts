import { defineStore } from 'pinia'
import { useApiStore } from '@/stores/api'
import { useToastStore } from '@/stores/toast'
import { useMutation, useQuery } from '@tanstack/vue-query'
import type { AmmunitionDto, CreateAmmunitionDto, UpdateAmmunitionDto } from '@/api/Api'
import { type Ref, ref } from 'vue'

export const useAmmunitionStore = defineStore('ammunition', () => {
  const { api } = useApiStore()
  const { successMessage } = useToastStore()
  const ammunitions = ref<AmmunitionDto[]>([])
  const ammunition = ref<AmmunitionDto>()
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

  const updateAmmunitionMutation = useMutation({
    mutationFn: async (ammunition: UpdateAmmunitionDto) => {
      return await api.api.ammunitionControllerEdit(ammunition.id, ammunition)
    },
    onSuccess(data) {
      const index = ammunitions.value.findIndex((ammunition) => ammunition.id === data.data.id)
      ammunitions.value.splice(index, 1)
      ammunitions.value.push(data.data)
      successMessage('ammunition.summary', 'ammunition.add.update')
    }
  })

  const queryFindAllAmmunitionByCategory = (category: Ref<string>) =>
    useQuery({
      queryKey: ['ammunitionByCategory', category.value],
      queryFn: async () => {
        console.log(category.value)
        return await api.api.ammunitionControllerFindByCategory(category.value)
      },
      enabled: !!category.value
    })

  const queryFindById = (id: Ref<number>) =>
    useQuery({
      queryKey: ['findById', id.value],
      queryFn: async () => {
        const res = await api.api.ammunitionControllerFindById(id.value)
        ammunition.value = res.data
        return res
      },
      enabled: () => id.value > 0
    })

  return {
    prerequisitesAmmoList: queryPrerequisitesAmmunitionList,
    create: createAmmunitionMutation,
    update: updateAmmunitionMutation,
    getByCategory: queryFindAllAmmunitionByCategory,
    getById: queryFindById,
    ammunition$: ammunition
  }
})
