import { defineStore } from 'pinia'
import { useApiStore } from '@/stores/api'
import { useMutation, useQuery } from '@tanstack/vue-query'
import type { AmmunitionHeadTypeDto, CreateAmmunitionHeadTypeDto } from '@/api/Api'
import { ref } from 'vue'
import { getI18NPrefix } from '@/enum/I18NSuffix.enum'
import { useFormHandler } from '@/shared/useFormHandler'
import type { AxiosResponse } from 'axios'

export const useHeadTypeStore = defineStore('head-type-store', () => {
  // Appel API
  const { api } = useApiStore()

  // Refs
  const submitSuccess = ref(false)
  // Private Attibute
  const _I18N_PREFIX = 'headType'
  const _GET_ALL_FN = 'getAllHeadType'
  const _GET_BY_ID_FN = 'getHeadTypeById'
  // *******************Methodes***************
  const _createMutation = useMutation({
    mutationFn: async (headType: CreateAmmunitionHeadTypeDto) => {
      return await api.api.ammunitionHeadTypeControllerCreate(headType)
    },
    onSuccess: async () => {
      submitSuccess.value = true
    }
  })
  const _updateMutation = useMutation({
    mutationFn: async (head: AmmunitionHeadTypeDto) => {
      return await api.api.ammunitionHeadTypeControllerEdit(head.id, head)
    },
    onSuccess() {
      submitSuccess.value = true
    }
  })
  const getAllHeadTypesQuery = () =>
    useQuery({
      queryKey: [_GET_ALL_FN],
      queryFn: async () => _fetchAll(),
      retry: 0
    })
  const _fetchAll = async () => {
    const res = await api.api.ammunitionHeadTypeControllerFindAllHeadTypes()
    return res.data
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
    const res = await api.api.ammunitionHeadTypeControllerFindById(parseInt(id))
    return res.data
  }
  function useHeadTypeForm(id?: string) {
    const emptyForm: CreateAmmunitionHeadTypeDto = {
      name: '',
      reference: ''
    }
    return useFormHandler<CreateAmmunitionHeadTypeDto, AxiosResponse<AmmunitionHeadTypeDto>>(
      emptyForm,
      getByIdQuery,
      _createMutation,
      _updateMutation,
      _I18N_PREFIX,
      _GET_BY_ID_FN,
      _GET_ALL_FN,
      id,
      (data) => ({
        ...data
      })
    )
  }
  return {
    getAll: getAllHeadTypesQuery,
    getI18NPrefix: getI18NPrefix(_I18N_PREFIX),
    submitSuccess,
    formBuilder: useHeadTypeForm
  }
})
