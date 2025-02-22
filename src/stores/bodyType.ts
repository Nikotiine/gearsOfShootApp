import { defineStore } from 'pinia'
import { useApiStore } from '@/stores/api'
import { useToastStore } from '@/stores/toast'
import { ref } from 'vue'
import { useMutation, useQuery } from '@tanstack/vue-query'
import type { AmmunitionBodyTypeDto, CreateAmmunitionBodyTypeDto } from '@/api/Api'

export const useBodyTypeStore = defineStore('bodyType', () => {
  const { api } = useApiStore()
  const { successMessage } = useToastStore()

  const bodyTypes = ref<AmmunitionBodyTypeDto[]>([])
  const createAmmunitionBodyTypeMutation = useMutation({
    mutationFn: async (bodyType: CreateAmmunitionBodyTypeDto) => {
      return await api.api.ammunitionBodyTypeControllerCreate(bodyType)
    },
    onSuccess: (data) => {
      successMessage('bodyType.summary', 'bodyType.form.success')

      bodyTypes.value.push(data.data)
    }
  })

  const getAllQuery = () =>
    useQuery({
      queryKey: ['bodyTypeList'],
      queryFn: async () => {
        const res = await api.api.ammunitionBodyTypeControllerFindAllBodyTypes()
        bodyTypes.value = res.data
        return res
      }
    })

  return {
    create: createAmmunitionBodyTypeMutation,
    getAll: getAllQuery,
    bodyTypes$: bodyTypes
  }
})
