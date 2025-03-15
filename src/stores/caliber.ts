import { defineStore } from 'pinia'
import { useMutation, useQuery } from '@tanstack/vue-query'
import { useApiStore } from '@/stores/api'
import { ref } from 'vue'
import type { CaliberDto, CreateCaliberDto } from '@/api/Api'
import { useToastStore } from '@/stores/toast'

export const useCaliberStore = defineStore('caliber', () => {
  // Appel API
  const { api } = useApiStore()
  // TOAST
  const { successMessage } = useToastStore()
  // Refs
  const calibers = ref<CaliberDto[]>([])
  // Private Attibute
  const _SUMMARY = 'caliber.summary'
  const _GET_ALL_FN = 'getAllCaliber'
  // *******************Methodes***************
  const getAllCalibersQuery = () =>
    useQuery({
      queryKey: [_GET_ALL_FN],
      queryFn: async () => {
        calibers.value = (await api.api.caliberControllerFindAllCalibers()).data
        return api.api.caliberControllerFindAllCalibers()
      }
    })

  const createCaliberMutation = useMutation({
    mutationFn: async (caliber: CreateCaliberDto) => {
      return api.api.caliberControllerCreate(caliber)
    },
    onSuccess(data, variables, context) {
      calibers.value.push(data.data)
      successMessage(_SUMMARY, 'bodyType.form.success')
    }
  })

  return { getAll: getAllCalibersQuery, calibers$: calibers, create: createCaliberMutation }
})
