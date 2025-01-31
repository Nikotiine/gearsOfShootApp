import { defineStore } from 'pinia'
import { useApiStore } from '@/stores/api'
import { useToastStore } from '@/stores/toast'
import { ref } from 'vue'
import type { CreateMaterialDto, MaterialDto } from '@/api/Api'
import { useMutation, useQuery } from '@tanstack/vue-query'

export const useMaterialStore = defineStore('material', () => {
  const { api } = useApiStore()
  const { successMessage } = useToastStore()
  const materials = ref<MaterialDto[]>([])

  const createMaterialMutation = useMutation({
    mutationFn: async (materialDto: CreateMaterialDto) => {
      return await api.api.materialControllerCreate(materialDto)
    },
    onSuccess(data) {
      successMessage('material.summary', 'material.form.success')
      materials.value.push(data.data)
    }
  })

  const getAllMaterialsQuery = useQuery({
    queryKey: ['getAllMaterialsQuery'],
    queryFn: async () => {
      const res = await api.api.materialControllerFindAll()
      materials.value = res.data
      return res
    }
  })
  return { getAll: getAllMaterialsQuery, create: createMaterialMutation, materials$: materials }
})
