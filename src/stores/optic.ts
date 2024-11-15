import { defineStore } from 'pinia'
import { useApiStore } from '@/stores/api'
import { useToastStore } from '@/stores/toast'
import { useMutation, useQuery } from '@tanstack/vue-query'
import type { CreateOpticDto, OpticDto, OpticUnitDto } from '@/api/Api'
import { ref } from 'vue'

export const useOpticStore = defineStore('optic', () => {
  const { api } = useApiStore()
  const { successMessage } = useToastStore()
  const opticUnits = ref<OpticUnitDto[]>([])
  const optics = ref<OpticDto[]>([])
  const queryPrerequisitesOpticList = useQuery({
    queryKey: ['prerequisite-optic'],
    queryFn: async () => {
      const res = await api.api.opticControllerFindPrerequisitesOpticList()
      opticUnits.value = res.data.units
      return res
    }
  })

  const getAllOpticsQuery = useQuery({
    queryKey: ['all-optics'],
    queryFn: async () => {
      const res = await api.api.opticControllerFindAllOptics()
      optics.value = res.data
      return res
    }
  })

  const createOpticMutation = useMutation({
    mutationFn: async (optic: CreateOpticDto) => {
      return await api.api.opticControllerCreate(optic)
    },
    onSuccess(data) {
      optics.value.push(data.data)
      successMessage('optic.summary', 'optic.form.success')
    }
  })

  return {
    prerequisiteOpticQuery: queryPrerequisitesOpticList,
    create: createOpticMutation,
    units$: opticUnits,
    getAll: getAllOpticsQuery
  }
})
