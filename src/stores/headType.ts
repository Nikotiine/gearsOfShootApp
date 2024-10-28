import { defineStore } from 'pinia'
import { useApiStore } from '@/stores/api'
import { useToastStore } from '@/stores/toast'
import { useMutation, useQuery } from '@tanstack/vue-query'
import type { AmmunitionHeadTypeDto, CreateAmmunitionHeadTypeDto } from '@/api/Api'
import { ref } from 'vue'

export const useHeadTypeStore = defineStore('headType', () => {
  const { api } = useApiStore()
  const { successMessage } = useToastStore()
  const getAllData = ref<AmmunitionHeadTypeDto[]>([])
  const headTypeCreateMutation = useMutation({
    mutationFn: async (headType: CreateAmmunitionHeadTypeDto) => {
      return await api.api.ammunitionHeadTypeControllerCreate(headType)
    },
    onSuccess(data) {
      successMessage('headType.summary', 'headType.form.success')
      getAllData.value.push(data.data)
    }
  })
  const getAllHeadTypesQuery = useQuery({
    queryKey: ['headTypesQuery'],
    queryFn: async () => {
      getAllData.value = (await api.api.ammunitionHeadTypeControllerFindAllHeadTypes()).data
      return api.api.ammunitionBodyTypeControllerFindAllBodyTypes()
    }
  })
  return { create: headTypeCreateMutation, getAll: getAllHeadTypesQuery, getAllData$: getAllData }
})
