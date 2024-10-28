import { defineStore } from 'pinia'
import { useMutation, useQuery } from '@tanstack/vue-query'
import { useApiStore } from '@/stores/api'
import { ref } from 'vue'
import type { CaliberDto } from '@/api/Api'

export const useCaliberStore = defineStore('caliber', () => {
  const { api } = useApiStore()
  const calibers = ref<CaliberDto[]>([])

  const getAllCalibersQuery = useQuery({
    queryKey: ['getAllCalibers'],
    queryFn: async () => {
      calibers.value = (await api.api.caliberControllerFindAllCalibers()).data
      return api.api.caliberControllerFindAllCalibers()
    }
  })

  const createCaliberMutation = useMutation({})

  return { getAll: getAllCalibersQuery, calibers$: calibers }
})
