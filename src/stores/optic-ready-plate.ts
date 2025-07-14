import { defineStore } from 'pinia'
import { useApiStore } from '@/stores/api'
import { ref } from 'vue'
import { useMutation, useQuery } from '@tanstack/vue-query'
import type { CreateOpticReadyPlateDto, OpticReadyPlateDto } from '@/api/Api'
import { useFormHandler } from '@/shared/useFormHandler'
import type { AxiosResponse } from 'axios'
import { getI18NPrefix } from '@/enum/I18NSuffix.enum'

export const useOpticReadyPlateStore = defineStore('opticReadyPlateStore', () => {
  const { api } = useApiStore()
  // Refs
  const mutationSuccess = ref(false)
  const _I18N_PREFIX = 'opticReadyPlate'
  const _GET_ALL_FN = 'getAllOpticReadyPlate'
  const _GET_BY_ID_FN = 'getOpticReadyPlateById'
  // *******************Methodes***************
  const getAllQuery = () =>
    useQuery({
      queryKey: [_GET_ALL_FN],
      queryFn: async () => _fetchAll(),
      retry: 0
    })
  const _fetchAll = async () => {
    const res = await api.api.opticReadyPlateControllerFindAll()
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
    const res = await api.api.opticReadyPlateControllerFindById(parseInt(id))
    return res.data
  }

  const _createMutation = useMutation({
    mutationFn: async (plate: CreateOpticReadyPlateDto) => {
      return api.api.opticReadyPlateControllerCreate(plate)
    },
    onSuccess() {
      mutationSuccess.value = true
    }
  })
  const _updateMutation = useMutation({
    mutationFn: async (plate: OpticReadyPlateDto) => {
      return api.api.opticReadyPlateControllerEdit(plate.id, plate)
    },
    onSuccess() {
      mutationSuccess.value = true
    }
  })

  function useOpticReadyPlateForm(id?: string) {
    const emptyForm: CreateOpticReadyPlateDto = {
      name: '',
      reference: '',
      description: ''
    }
    return useFormHandler<CreateOpticReadyPlateDto, AxiosResponse<OpticReadyPlateDto>>(
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
    formBuilder: useOpticReadyPlateForm,
    getAll: getAllQuery,
    mutationSuccess,
    getI18NPrefix: getI18NPrefix(_I18N_PREFIX)
  }
})
