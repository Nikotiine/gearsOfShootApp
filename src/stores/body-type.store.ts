import { defineStore } from 'pinia'
import { useApiStore } from '@/stores/api'
import { ref } from 'vue'
import { useMutation, useQuery } from '@tanstack/vue-query'
import type { AmmunitionBodyTypeDto, CreateAmmunitionBodyTypeDto } from '@/api/Api'
import { getI18NPrefix } from '@/enum/I18NSuffix.enum'
import { useFormHandler } from '@/shared/useFormHandler'
import type { AxiosResponse } from 'axios'

export const useBodyTypeStore = defineStore('body-type-store', () => {
  // Appel API
  const { api } = useApiStore()
  // TOAST

  // Refs
  const mutationSuccess = ref(false)
  // Private Attibute
  const _I18N_PREFIX = 'bodyType'
  const _GET_ALL_FN = 'getAllBodyType'
  const _GET_BY_ID_FN = 'getBodyTypeById'
  // *******************Methodes***************
  const _createMutation = useMutation({
    mutationFn: async (bodyType: CreateAmmunitionBodyTypeDto) => {
      return await api.api.ammunitionBodyTypeControllerCreate(bodyType)
    },
    onSuccess() {
      mutationSuccess.value = true
    }
  })

  const getAllQuery = () =>
    useQuery({
      queryKey: [_GET_ALL_FN],
      queryFn: async () => _fetchAll(),
      retry: 0
    })
  const _fetchAll = async () => {
    const res = await api.api.ammunitionBodyTypeControllerFindAllBodyTypes()
    return res.data
  }
  const _updateMutation = useMutation({
    mutationFn: async (body: AmmunitionBodyTypeDto) => {
      return await api.api.ammunitionBodyTypeControllerEdit(body.id, body)
    },
    onSuccess() {
      mutationSuccess.value = true
    }
  })
  const getByIdQuery = (id?: string) =>
    useQuery({
      queryKey: [_GET_BY_ID_FN, id],
      queryFn: () => _fetchById(id),
      enabled: !!id,
      retry: 0
    })
  const _fetchById = async (id?: string) => {
    if (!id) return null
    const res = await api.api.ammunitionBodyTypeControllerFindById(parseInt(id))
    return res.data
  }
  function useBodyTypeForm(id?: string) {
    const emptyForm: CreateAmmunitionBodyTypeDto = {
      name: '',
      reference: ''
    }
    return useFormHandler<CreateAmmunitionBodyTypeDto, AxiosResponse<AmmunitionBodyTypeDto>>(
      emptyForm,
      getByIdQuery,
      _createMutation,
      _updateMutation,
      _I18N_PREFIX,
      id,
      (data) => ({
        ...data
      })
    )
  }

  return {
    formBuilder: useBodyTypeForm,
    getAll: getAllQuery,
    mutationSuccess,
    getI18NPrefix: getI18NPrefix(_I18N_PREFIX)
  }
})
