import { defineStore } from 'pinia'
import { useApiStore } from '@/stores/api'
import type { CreateRiffleDto, RiffleDto, UpdateRiffleDto } from '@/api/Api'
import { useMutation, useQuery } from '@tanstack/vue-query'
import { useToastStore } from '@/stores/toast'
import { type Ref, ref } from 'vue'

export const useRiffleStore = defineStore('riffle', () => {
  const { api } = useApiStore()
  const { successMessage } = useToastStore()

  const riffles = ref<RiffleDto[]>([])
  const riffle = ref<RiffleDto>()

  const createWeaponMutation = useMutation({
    mutationFn: async (riffle: CreateRiffleDto) => {
      return await api.api.riffleControllerCreate(riffle)
    },
    onSuccess(data) {
      riffles.value.push(data.data)
      successMessage('weapon.summary', 'weapon.add.success')
    }
  })

  const updateRiffleMutation = useMutation({
    mutationFn: async (riffle: UpdateRiffleDto) => {
      return await api.api.riffleControllerUpdate(riffle.id, riffle)
    },
    onSuccess(data) {
      const index = riffles.value.findIndex((riffle) => riffle.id === data.data.id)
      riffles.value.splice(index, 1)
      riffles.value.push(data.data)
      successMessage('weapon.summary', 'weapon.add.edit')
    }
  })

  const getAllRiffleQuery = (enabled: Ref<boolean>) =>
    useQuery({
      queryKey: ['get-all-riffle'],
      queryFn: async () => {
        const res = await api.api.riffleControllerFindAll()
        riffles.value = res.data
        return res
      },
      enabled: () => enabled.value
    })

  const getAllRiffleByCategoryQuery = (catgory: Ref<string>) =>
    useQuery({
      queryKey: ['get-all-riffle-by-category', catgory.value],
      queryFn: async () => {
        const res = await api.api.riffleControllerFindAllByCategory(catgory.value)
        riffles.value = res.data
        return res
      },
      enabled: !!catgory.value
    })

  const getRiffleById = (id: Ref<number>) =>
    useQuery({
      queryKey: ['get-riffle-by-id', id.value],
      queryFn: async () => {
        const res = await api.api.riffleControllerFindById(id.value)
        riffle.value = res.data
        return res
      },
      enabled: () => id.value > 0
    })

  return {
    create: createWeaponMutation,
    edit: updateRiffleMutation,
    getAllByCategory: getAllRiffleByCategoryQuery,
    getAll: getAllRiffleQuery,
    getRiffleById: getRiffleById,
    riffles$: riffles,
    riffle$: riffle
  }
})
