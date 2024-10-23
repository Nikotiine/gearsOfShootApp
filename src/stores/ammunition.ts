import { defineStore } from 'pinia'
import { useApiStore } from '@/stores/api'
import { useToastStore } from '@/stores/toast'
import { useMutation, useQuery } from '@tanstack/vue-query'
import type { CreateAmmunitionDto } from '@/api/Api'
import { computed, ref } from 'vue'
import type { LegislationCategories } from '@/stores/weapon'

export const useAmmunitionStore = defineStore('ammunition', () => {
  const { api } = useApiStore()
  const { successMessage } = useToastStore()
  const _createAmmunitionIsOnError = ref(false)
  const _createAmmunitionIsOnErrorMessage = ref('')
  const createAmmunitionIsOnError = computed(() => _createAmmunitionIsOnError)
  const createAmmunitionIsOnErrorMessage = computed(() => _createAmmunitionIsOnErrorMessage)
  const queryPrerequisitesAmmunitionList = useQuery({
    queryKey: ['prerequis-ammunition'],
    queryFn: () => api.api.ammunitionControllerFindPrerequisitesAmmunitionList()
  })

  const { mutate } = useMutation({
    mutationFn: async (ammunition: CreateAmmunitionDto) => {
      return await api.api.ammunitionControllerCreate(ammunition)
    },
    onError(error: any) {
      _createAmmunitionIsOnError.value = true
      _createAmmunitionIsOnErrorMessage.value = error.response.data.message
    },
    onSuccess(data) {
      successMessage('ammunition.summary', 'ammunition.add.success')
    }
  })

  function queryFindAllAmmunitionByCategory(category: LegislationCategories) {
    return useQuery({
      queryKey: ['ammunitionByCategory', category],
      queryFn: () => {
        return api.api.ammunitionControllerFindByCategory(category)
      }
    })
  }

  return {
    prerequisitesAmmoList: queryPrerequisitesAmmunitionList,
    createAmmunition: mutate,
    createAmmunitionIsOnError,
    createAmmunitionIsOnErrorMessage,
    getAmmunitionByCategoryQuery: queryFindAllAmmunitionByCategory
  }
})
