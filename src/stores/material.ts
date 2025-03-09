import { defineStore } from 'pinia'
import { useApiStore } from '@/stores/api'
import { useToastStore } from '@/stores/toast'
import { ref } from 'vue'
import type { CreateMaterialDto, MaterialDto } from '@/api/Api'
import { useMutation, useQuery } from '@tanstack/vue-query'

export const useMaterialStore = defineStore('material', () => {
  // Appel API
  const { api } = useApiStore()
  // TOAST
  const { successMessage } = useToastStore()
  // Refs
  const materials = ref<MaterialDto[]>([])
  // Private Attibute
  const _SUMMARY = 'material.summary'
  const _GET_ALL_FN = 'getAllMaterial'
  // *******************Methodes***************
  const createMaterialMutation = useMutation({
    mutationFn: async (materialDto: CreateMaterialDto) => {
      return await api.api.materialControllerCreate(materialDto)
    },
    onSuccess(data) {
      successMessage(_SUMMARY, 'material.form.success')
      materials.value.push(data.data)
    }
  })

  const getAllMaterialsQuery = () =>
    useQuery({
      queryKey: [_GET_ALL_FN],
      queryFn: async () => {
        const res = await api.api.materialControllerFindAll()
        materials.value = res.data
        return res
      }
    })
  return { getAll: getAllMaterialsQuery, create: createMaterialMutation, materials$: materials }
})
