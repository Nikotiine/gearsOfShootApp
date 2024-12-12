import { defineStore } from 'pinia'
import { useApiStore } from '@/stores/api'
import { useToastStore } from '@/stores/toast'
import { useMutation, useQuery } from '@tanstack/vue-query'
import type { CreateHandGunDto, HandGunDto } from '@/api/Api'
import { ref } from 'vue'

export const useHandGunStore = defineStore('hand-gun', () => {
  const { api } = useApiStore()
  const { successMessage } = useToastStore()
  const categoryId = ref<number>(0)
  const handguns = ref<HandGunDto[]>([])
  const createHandGunMutation = useMutation({
    mutationFn: async (handgun: CreateHandGunDto) => {
      const res = await api.api.handGunControllerCreate(handgun)

      return res
    },
    onSuccess(data) {
      handguns.value.push(data.data)
      successMessage('weapon.summary', 'weapon.add.success')
    }
  })
  function setCategoryId(id: number): void {
    categoryId.value = id
  }

  const getAllHandGunByCategoryQuery = useQuery({
    queryKey: ['get-all-handgun-by-category', categoryId],
    queryFn: async () => {
      const res = await api.api.handGunControllerFindAllByCategory(categoryId.value)
      handguns.value = res.data
      return res
    }
  })
  return {
    create: createHandGunMutation,
    setCategoryId: setCategoryId,
    getAllHandGunByCategory: getAllHandGunByCategoryQuery
  }
})
