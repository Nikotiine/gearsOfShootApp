import { defineStore } from 'pinia'
import { useApiStore } from '@/stores/api'
import { useToastStore } from '@/stores/toast'
import { useMutation, useQuery } from '@tanstack/vue-query'
import type { CreateHandGunDto, HandGunDto, UpdateHandGunDto } from '@/api/Api'
import { type Ref, ref } from 'vue'

export const useHandGunStore = defineStore('hand-gun', () => {
  const { api } = useApiStore()
  const { successMessage } = useToastStore()

  const handguns = ref<HandGunDto[]>([])
  const handgun = ref<HandGunDto | null>(null)

  const createHandGunMutation = useMutation({
    mutationFn: async (handgun: CreateHandGunDto) => {
      return await api.api.handGunControllerCreate(handgun)
    },
    onSuccess(data) {
      handguns.value.push(data.data)
      successMessage('weapon.summary', 'weapon.add.success')
    }
  })

  const updateHandGunMutation = useMutation({
    mutationFn: async (handgun: UpdateHandGunDto) => {
      return await api.api.handGunControllerUpdate(handgun.id, handgun)
    },
    onSuccess(data) {
      const index = handguns.value.findIndex((hand) => hand.id === data.data.id)
      handguns.value.splice(index, 1)
      handguns.value.push(data.data)
      successMessage('weapon.summary', 'weapon.add.edit')
    }
  })

  const getAllHandGunByCategoryQuery = (category: Ref<string>) =>
    useQuery({
      queryKey: ['get-all-handgun-by-category', category.value],
      queryFn: async () => {
        const res = await api.api.handGunControllerFindAllByCategory(category.value)
        handguns.value = res.data
        return res
      },
      enabled: !!category.value
    })

  const getAllHandgunQuery = (enabled: Ref<boolean>) =>
    useQuery({
      queryKey: ['getAllHandgunQuery'],
      queryFn: async () => {
        const res = await api.api.handGunControllerFindAll()
        handguns.value = res.data
        return res
      },
      enabled: () => enabled.value
    })

  const getHandGunById = (id: Ref<number>) =>
    useQuery({
      queryKey: ['gat-handgun-by-id', id.value],
      queryFn: async () => {
        const res = await api.api.handGunControllerFindById(id.value)
        handgun.value = res.data
        return res
      },
      enabled: () => id.value > 0
    })
  return {
    create: createHandGunMutation,
    edit: updateHandGunMutation,
    getAllByCategory: getAllHandGunByCategoryQuery,
    getHandGunById: getHandGunById,
    handgun$: handgun,
    getAll: getAllHandgunQuery,
    handguns$: handguns
  }
})
