import { defineStore } from 'pinia'
import { useMutation, useQuery } from '@tanstack/vue-query'
import { useApiStore } from '@/stores/api'
import { ref } from 'vue'
import type { CaliberDto, CreateCaliberDto } from '@/api/Api'
import { useFormHandler } from '@/shared/useFormHandler'
import type { AxiosResponse } from 'axios'
import { getI18NPrefix } from '@/enum/I18NSuffix.enum'

export const useCaliberStore = defineStore('caliber-store', () => {
  // Appel API
  const { api } = useApiStore()
  // Refs
  const submitSuccess = ref(false)
  // Private Attibute
  const _I18N_PREFIX = 'caliber'
  const _GET_ALL_FN = 'getAllCaliber'
  const _GET_BY_ID_FN = 'getCaliberById'

  // *******************Methodes***************
  const getAllCalibersQuery = () =>
    useQuery({
      queryKey: [_GET_ALL_FN],
      queryFn: async () => _fetchAll(),
      retry: 0,
      staleTime: 0
    })
  const _fetchAll = async () => {
    const res = await api.api.caliberControllerFindAllCalibers()
    return res.data
  }
  const _createMutation = useMutation({
    mutationFn: async (caliber: CreateCaliberDto) => {
      return api.api.caliberControllerCreate(caliber)
    },
    onSuccess() {
      submitSuccess.value = true
    }
  })
  const _updateMutation = useMutation({
    mutationFn: async (rds: CaliberDto) => {
      return await api.api.caliberControllerEdit(rds.id, rds)
    },
    onSuccess() {
      submitSuccess.value = true
    }
  })
  const _fetchById = async (id?: string) => {
    if (!id) return null
    const res = await api.api.caliberControllerFindById(parseInt(id))
    return res.data
  }
  const getByIdQuery = (id?: string) =>
    useQuery({
      queryKey: [_GET_BY_ID_FN, id],
      queryFn: () => _fetchById(id),
      enabled: !!id,
      retry: 0
    })
  function useCaliberForm(id?: string) {
    const emptyForm: CreateCaliberDto = {
      name: '',
      reference: ''
    }
    return useFormHandler<CreateCaliberDto, AxiosResponse<CaliberDto>>(
      emptyForm,
      getByIdQuery,
      _createMutation,
      _updateMutation,
      _I18N_PREFIX,
      _GET_BY_ID_FN,
      id,
      (data) => ({
        ...data
      })
    )
  }

  return {
    getAll: getAllCalibersQuery,
    formBuilder: useCaliberForm,
    submitSuccess,
    getI18NPrefix: getI18NPrefix(_I18N_PREFIX)
  }
})
