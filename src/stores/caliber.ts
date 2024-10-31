import { defineStore } from 'pinia'
import { useMutation, useQuery } from '@tanstack/vue-query'
import { useApiStore } from '@/stores/api'
import { ref } from 'vue'
import type { CaliberDto, CreateCaliberDto } from '@/api/Api'
import { useToastStore } from '@/stores/toast'

export const useCaliberStore = defineStore('caliber', () => {
  const { api } = useApiStore()
  const { successMessage } = useToastStore()
  const calibers = ref<CaliberDto[]>([])

  const getAllCalibersQuery = useQuery({
    queryKey: ['getAllCalibers'],
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
      successMessage('caliber.summary', 'bodyType.form.success')
    }
  })

  return { getAll: getAllCalibersQuery, calibers$: calibers, create: createCaliberMutation }
})
