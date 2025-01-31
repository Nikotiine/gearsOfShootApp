import { defineStore } from 'pinia'
import { useApiStore } from '@/stores/api'
import { useToastStore } from '@/stores/toast'
import { useMutation, useQuery } from '@tanstack/vue-query'
import type { ColorDto, CreateColorDto } from '@/api/Api'
import { ref } from 'vue'

export const useColorStore = defineStore('color', () => {
  const { api } = useApiStore()
  const { successMessage } = useToastStore()
  const colors = ref<ColorDto[]>([])

  const createColorMutation = useMutation({
    mutationFn: async (color: CreateColorDto) => {
      return await api.api.colorControllerCreate(color)
    },
    onSuccess(data) {
      colors.value.push(data.data)
      successMessage('color.summary', 'color.form.success')
    }
  })

  const getAllColorQuery = useQuery({
    queryKey: ['getAllColorQuery'],
    queryFn: async () => {
      const res = await api.api.colorControllerFindAll()
      colors.value = res.data
      return res
    }
  })

  return { getAll: getAllColorQuery, colors$: colors, create: createColorMutation }
})
