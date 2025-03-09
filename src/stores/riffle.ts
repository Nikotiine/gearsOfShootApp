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
  // Private Attibute
  const _SUMMARY = 'weapon.summary'
  const _GET_ALL_BY_CATEGORY_FN = 'getAllRiffleByCategory'
  const _GET_ALL_FN = 'getAllRiffle'
  const _GET_BY_ID_FN = 'getRiffleById'
  // *******************Methodes***************
  const createWeaponMutation = useMutation({
    mutationFn: async (riffle: CreateRiffleDto) => {
      return await api.api.riffleControllerCreate(riffle)
    },
    onSuccess(data) {
      riffles.value.push(data.data)
      successMessage(_SUMMARY, 'weapon.add.success')
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
      successMessage(_SUMMARY, 'weapon.add.edit')
    }
  })

  const _getAllRiffleQuery = useQuery({
    queryKey: [_GET_ALL_FN],
    queryFn: async () => {
      return await api.api.riffleControllerFindAll()
    }
  })

  const getAllData = (): RiffleDto[] => {
    return _getAllRiffleQuery.data.value?.data ?? []
  }

  const getAllRiffleByCategoryQuery = (catgory: Ref<string>) =>
    useQuery({
      queryKey: [_GET_ALL_BY_CATEGORY_FN, catgory.value],
      queryFn: async () => {
        const res = await api.api.riffleControllerFindAllByCategory(catgory.value)
        riffles.value = res.data
        return res
      },
      enabled: !!catgory.value
    })

  const getRiffleById = (id: Ref<number>) =>
    useQuery({
      queryKey: [_GET_BY_ID_FN, id.value],
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
        successMessage(_SUMMARY, t(data.data.message))
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
    getRiffleById: getRiffleById,
    riffles$: riffles,
    riffle$: riffle,
    getAll: getAllData
  }
})
