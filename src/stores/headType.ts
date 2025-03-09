import { defineStore } from 'pinia'
import { useApiStore } from '@/stores/api'
import { useToastStore } from '@/stores/toast'
import { useMutation, useQuery } from '@tanstack/vue-query'
import type { AmmunitionHeadTypeDto, CreateAmmunitionHeadTypeDto } from '@/api/Api'
import { ref } from 'vue'

export const useHeadTypeStore = defineStore('headType', () => {
  // Appel API
  const { api } = useApiStore()
  // TOAST
  const { successMessage } = useToastStore()
  // Refs
  const headTypes = ref<AmmunitionHeadTypeDto[]>([])
  // Private Attibute
  const _SUMMARY = 'headType.summary'
  const _GET_ALL_FN = 'getAllHeadType'
  // *******************Methodes***************
  const headTypeCreateMutation = useMutation({
    mutationFn: async (headType: CreateAmmunitionHeadTypeDto) => {
      return await api.api.ammunitionHeadTypeControllerCreate(headType)
    },
    onSuccess(data) {
      successMessage(_SUMMARY, 'headType.form.success')
      headTypes.value.push(data.data)
    }
  })
  const getAllHeadTypesQuery = () =>
    useQuery({
      queryKey: [_GET_ALL_FN],
      queryFn: async () => {
        const res = await api.api.ammunitionHeadTypeControllerFindAllHeadTypes()
        headTypes.value = res.data
        return res
      }
    })
  return { create: headTypeCreateMutation, getAll: getAllHeadTypesQuery, headTypes$: headTypes }
})
