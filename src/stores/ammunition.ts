import { defineStore } from 'pinia'
import { useApiStore } from '@/stores/api'
import { useToastStore } from '@/stores/toast'
import { useMutation, useQuery } from '@tanstack/vue-query'
import type { AmmunitionDto, CreateAmmunitionDto, UpdateAmmunitionDto } from '@/api/Api'
import { type Ref, ref } from 'vue'
import { useI18n } from 'vue-i18n'

export const useAmmunitionStore = defineStore('ammunition', () => {
  // Appel API
  const { api } = useApiStore()
  // TOAST
  const { successMessage } = useToastStore()
  // I18N
  const { t } = useI18n()
  // Refs
  const ammunitions = ref<AmmunitionDto[]>([])
  const ammunition = ref<AmmunitionDto>()
  // Private Attibute
  const _SUMMARY = 'ammunition.summary'
  // const _GET_ALL_FN = 'getAllAmmuntiion'
  const _GET_ALL_BY_CATEGORY_FN = 'getAllAmmunitionByCategory'
  const _GET_BY_ID_FN = 'getAmmunitionById'
  const _PREREQUISITE_FN = 'prerequisite-ammunition'
  // *******************Methodes***************
  const queryPrerequisitesAmmunitionList = useQuery({
    queryKey: [_PREREQUISITE_FN],
    queryFn: async () => {
      return await api.api.ammunitionControllerFindPrerequisitesAmmunitionList()
    }
  })

  const createAmmunitionMutation = useMutation({
    mutationFn: async (ammunition: CreateAmmunitionDto) => {
      return await api.api.ammunitionControllerCreate(ammunition)
    },
    onSuccess(data) {
      ammunitions.value.push(data.data)
      successMessage(_SUMMARY, 'ammunition.add.success')
    }
  })

  const updateAmmunitionMutation = useMutation({
    mutationFn: async (ammunition: UpdateAmmunitionDto) => {
      return await api.api.ammunitionControllerEdit(ammunition.id, ammunition)
    },
    onSuccess(data) {
      const index = ammunitions.value.findIndex((ammunition) => ammunition.id === data.data.id)
      ammunitions.value.splice(index, 1)
      ammunitions.value.push(data.data)
      successMessage(_SUMMARY, 'ammunition.add.update')
    }
  })

  const queryFindAllAmmunitionByCategory = (category: Ref<string>) =>
    useQuery({
      queryKey: [_GET_ALL_BY_CATEGORY_FN, category.value],
      queryFn: async () => {
        console.log(category.value)
        return await api.api.ammunitionControllerFindByCategory(category.value)
      },
      enabled: !!category.value
    })

  const queryFindById = (id: Ref<number>) =>
    useQuery({
      queryKey: [_GET_BY_ID_FN, id.value],
      queryFn: async () => {
        const res = await api.api.ammunitionControllerFindById(id.value)
        ammunition.value = res.data
        return res
      },
      enabled: () => id.value > 0
    })

  const _deleteAmmunitionMutation = useMutation({
    mutationFn: async (id: number) => {
      return await api.api.ammunitionControllerDelete(id)
    },
    onSuccess(data) {
      const index = ammunitions.value.findIndex((optic) => optic.id === data.data.id)
      ammunitions.value.splice(index, 1)
      successMessage(_SUMMARY, t(data.data.message))
    }
  })

  const deleteFunction = (id: number) => {
    _deleteAmmunitionMutation.mutate(id)
  }

  return {
    prerequisitesAmmoList: queryPrerequisitesAmmunitionList,
    create: createAmmunitionMutation,
    edit: updateAmmunitionMutation,
    delete: deleteFunction,
    getByCategory: queryFindAllAmmunitionByCategory,
    getById: queryFindById,
    ammunition$: ammunition
  }
})
