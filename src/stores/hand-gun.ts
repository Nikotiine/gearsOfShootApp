import { defineStore } from 'pinia'
import { useApiStore } from '@/stores/api'
import { useToastStore } from '@/stores/toast'
import { useMutation, useQuery } from '@tanstack/vue-query'
import type { CreateHandGunDto, HandGunDto, UpdateHandGunDto } from '@/api/Api'
import { type Ref, ref } from 'vue'
import { useI18n } from 'vue-i18n'

export const useHandGunStore = defineStore('hand-gun', () => {
  // Appel API
  const { api } = useApiStore()
  // TOAST
  const { successMessage } = useToastStore()
  // I18N
  const { t } = useI18n()
  // Refs
  const handguns = ref<HandGunDto[]>([])
  const handgun = ref<HandGunDto | null>(null)
  // Private Attibute
  const _SUMMARY = 'weapon.summary'
  const _GET_ALL_BY_CATEGORY_FN = 'getAllHandGunByCategory'
  const _GET_ALL_FN = 'getAllHandGun'
  const _GET_BY_ID_FN = 'getHandGunById'
  // *******************Methodes***************
  const createHandGunMutation = useMutation({
    mutationFn: async (handgun: CreateHandGunDto) => {
      return await api.api.handGunControllerCreate(handgun)
    },
    onSuccess(data) {
      handguns.value.push(data.data)
      successMessage(_SUMMARY, 'weapon.add.success')
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
      successMessage(_SUMMARY, 'weapon.add.edit')
    }
  })

  const getAllHandGunByCategoryQuery = (category: Ref<string>) =>
    useQuery({
      queryKey: [_GET_ALL_BY_CATEGORY_FN, category.value],
      queryFn: async () => {
        const res = await api.api.handGunControllerFindAllByCategory(category.value)
        handguns.value = res.data
        return res
      },
      enabled: !!category.value
    })

  const _getAllHandgunQuery = useQuery({
    queryKey: [_GET_ALL_FN],
    queryFn: async () => {
      return await api.api.handGunControllerFindAll()
    }
  })

  const getAllFunction = () => {
    return _getAllHandgunQuery.data.value?.data ?? []
  }

  const getHandGunById = (id: Ref<number>) =>
    useQuery({
      queryKey: [_GET_BY_ID_FN, id.value],
      queryFn: async () => {
        const res = await api.api.handGunControllerFindById(id.value)
        handgun.value = res.data
        return res
      },
      enabled: () => id.value > 0
    })

  const _deleteMutation = useMutation({
    mutationFn: async (opticId: number) => {
      return await api.api.handGunControllerDelete(opticId)
    },
    onSuccess(data) {
      if (data.data.isSuccess) {
        const index = handguns.value.findIndex((optic) => optic.id === data.data.id)
        handguns.value.splice(index, 1)
        successMessage(_SUMMARY, t(data.data.message))
      }
    }
  })

  const deleteFunction = (id: number) => {
    _deleteMutation.mutate(id)
  }
  return {
    create: createHandGunMutation,
    edit: updateHandGunMutation,
    delete: deleteFunction,
    getAllByCategory: getAllHandGunByCategoryQuery,
    getHandGunById: getHandGunById,
    handgun$: handgun,
    getAll: getAllFunction,
    handguns$: handguns
  }
})
