import { defineStore } from 'pinia'
import { useApiStore } from '@/stores/api'
import { useToastStore } from '@/stores/toast'
import { useMutation, useQuery } from '@tanstack/vue-query'
import type { AmmunitionDto, CreateAmmunitionDto, UpdateAmmunitionDto } from '@/api/Api'
import { ref } from 'vue'
import { useFormHandler } from '@/shared/useFormHandler'
import type { AxiosResponse } from 'axios'
import { getI18NPrefix, I18NSuffix } from '@/enum/I18NSuffix.enum'

export const useAmmunitionStore = defineStore('ammunition', () => {
  // Appel API
  const { api } = useApiStore()
  // TOAST
  const { successMessage } = useToastStore()
  // I18N
  const ammunition = ref<AmmunitionDto>()
  // Private Attibute
  const _I18N_PREFIX = 'ammunition'
  // const _GET_ALL_FN = 'getAllAmmuntiion'
  const _GET_ALL_BY_CATEGORY_FN = 'getAllAmmunitionByCategory'
  const _GET_BY_ID_FN = 'getAmmunitionById'
  const _PREREQUISITE_FN = 'prerequisite-ammunition'
  // *******************Methodes***************

  const _createMutation = useMutation({
    mutationFn: async (ammunition: CreateAmmunitionDto) => {
      return await api.api.ammunitionControllerCreate(ammunition)
    }
  })

  const _updateMutation = useMutation({
    mutationFn: async (ammunition: UpdateAmmunitionDto) => {
      return await api.api.ammunitionControllerEdit(ammunition.id, ammunition)
    }
  })

  const queryFindAllAmmunitionByCategory = (categoryId: number) =>
    useQuery({
      queryKey: [_GET_ALL_BY_CATEGORY_FN, categoryId],
      queryFn: async () => {
        return await _fetchAllByCategoryId(categoryId)
      },
      enabled: !!categoryId
    })

  function useAmmunitionForm(id?: string) {
    const emptyForm: CreateAmmunitionDto = {
      bodyTypeId: 0,
      caliberId: 0,
      factoryId: 0,
      name: '',
      categoryId: 0,
      initialSpeed: 0,
      description: '',
      packaging: 50,
      headTypeId: 0,
      percussionTypeId: 0
    }
    return useFormHandler<CreateAmmunitionDto, AxiosResponse<AmmunitionDto>>(
      emptyForm,
      getByIdQuery,
      _createMutation,
      _updateMutation,
      _I18N_PREFIX,
      id,
      (data) => ({
        ...data,
        factoryId: data.factory.id,
        caliberId: data.caliber.id,
        percussionTypeId: data.percussionType.id,
        bodyTypeId: data.bodyType.id,
        headTypeId: data.headType.id,
        categoryId: data.category.id
      })
    )
  }

  const getByIdQuery = (id?: string) =>
    useQuery({
      queryKey: [_GET_BY_ID_FN, id],
      queryFn: () => _fetchById(id),
      enabled: !!id,
      retry: 0
    })
  const _fetchById = async (id?: string) => {
    if (!id) return null
    const res = await api.api.ammunitionControllerFindById(parseInt(id))
    return res.data
  }
  const _fetchAllByCategoryId = async (categoryId: number) => {
    if (!categoryId) return null
    const res = await api.api.ammunitionControllerFindByCategory(categoryId)
    return res.data
  }
  const _deleteAmmunitionMutation = useMutation({
    mutationFn: async (id: number) => {
      return await api.api.ammunitionControllerDelete(id)
    },
    onSuccess() {
      successMessage(
        getI18NPrefix(_I18N_PREFIX) + I18NSuffix.SUMMARY,
        getI18NPrefix(_I18N_PREFIX) + I18NSuffix.DELETED
      )
    }
  })

  const deleteFunction = (id: number) => {
    _deleteAmmunitionMutation.mutate(id)
  }

  return {
    delete: deleteFunction,
    getByCategory: queryFindAllAmmunitionByCategory,
    getById: getByIdQuery,
    ammunition$: ammunition,
    formBuilder: useAmmunitionForm,
    getI18NPrefix: getI18NPrefix(_I18N_PREFIX)
  }
})
