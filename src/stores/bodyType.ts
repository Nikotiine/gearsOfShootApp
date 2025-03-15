import { defineStore } from 'pinia'
import { useApiStore } from '@/stores/api'
import { useToastStore } from '@/stores/toast'
import { ref } from 'vue'
import { useMutation, useQuery } from '@tanstack/vue-query'
import type { AmmunitionBodyTypeDto, CreateAmmunitionBodyTypeDto } from '@/api/Api'

export const useBodyTypeStore = defineStore('bodyType', () => {
  // Appel API
  const { api } = useApiStore()
  // TOAST
  const { successMessage } = useToastStore()
  // Refs
  const bodyTypes = ref<AmmunitionBodyTypeDto[]>([])
  // Private Attibute
  const _SUMMARY = 'bodyType.summary'
  const _GET_ALL_FN = 'getAllBodyType'

  // *******************Methodes***************
  const createAmmunitionBodyTypeMutation = useMutation({
    mutationFn: async (bodyType: CreateAmmunitionBodyTypeDto) => {
      return await api.api.ammunitionBodyTypeControllerCreate(bodyType)
    },
    onSuccess: (data) => {
      successMessage(_SUMMARY, 'bodyType.form.success')

      bodyTypes.value.push(data.data)
    }
  })

  const getAllQuery = () =>
    useQuery({
      queryKey: [_GET_ALL_FN],
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
