import { defineStore } from 'pinia'
import { useApiStore } from '@/stores/api'
import { useToastStore } from '@/stores/toast'
import { useMutation, useQuery } from '@tanstack/vue-query'
import type { ColorDto, CreateColorDto } from '@/api/Api'
import { ref } from 'vue'

export const useColorStore = defineStore('color', () => {
  // Appel API
  const { api } = useApiStore()
  // TOAST
  const { successMessage } = useToastStore()
  // Refs
  const colors = ref<ColorDto[]>([])
  // Private Attibute
  const _SUMMARY = 'color.summary'
  const _GET_ALL_FN = 'getAllColor'
  // *******************Methodes***************
  const createColorMutation = useMutation({
    mutationFn: async (color: CreateColorDto) => {
      return await api.api.colorControllerCreate(color)
    },
    onSuccess(data) {
      colors.value.push(data.data)
      successMessage(_SUMMARY, 'color.form.success')
    }
  })

  const getAllColorQuery = () =>
    useQuery({
      queryKey: [_GET_ALL_FN],
      queryFn: async () => {
        const res = await api.api.colorControllerFindAll()
        colors.value = res.data
        return res
      }
    })

  return { getAll: getAllColorQuery, colors$: colors, create: createColorMutation }
})
