import { defineStore } from 'pinia'
import { useApiStore } from '@/stores/api'
import type { CreateRiffleDto, RiffleDto, UpdateRiffleDto } from '@/api/Api'
import { useMutation, useQuery } from '@tanstack/vue-query'
import { useToastStore } from '@/stores/toast'
import { type Ref, ref } from 'vue'
import { useI18n } from 'vue-i18n'

export const useRiffleStore = defineStore('riffle', () => {
  // Appel API
  const { api } = useApiStore()
  // TOAST
  const { successMessage } = useToastStore()
  // I18N
  const { t } = useI18n()
  // Refs
  const riffles = ref<RiffleDto[]>([])
  const riffle = ref<RiffleDto>()
  // *******************Methodes***************
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

  const _deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      return await api.api.riffleControllerDelete(id)
    },
    onSuccess(data) {
      if (data.data.isSuccess) {
        const index = riffles.value.findIndex((optic) => optic.id === data.data.id)
        riffles.value.splice(index, 1)
        successMessage('optic.summary', t(data.data.message))
      }
    }
  })
  const deleteFunction = (id: number) => {
    _deleteMutation.mutate(id)
  }

  return {
    create: createWeaponMutation,
    edit: updateRiffleMutation,
    delete: deleteFunction,
    getAllByCategory: getAllRiffleByCategoryQuery,
    getAll: getAllRiffleQuery,
    getRiffleById: getRiffleById,
    riffles$: riffles,
    riffle$: riffle
  }
})
