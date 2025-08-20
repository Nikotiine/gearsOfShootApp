import { defineStore } from 'pinia'
import { useApiStore } from '@/stores/api'
import { useMutation, useQuery } from '@tanstack/vue-query'
import type { ColorDto, CreateColorDto } from '@/api/Api'
import { ref } from 'vue'
import { useFormHandler } from '@/shared/useFormHandler'
import type { AxiosResponse } from 'axios'
import { getI18NPrefix } from '@/enum/I18NSuffix.enum'

export const useColorStore = defineStore('color-store', () => {
  // Appel API
  const { api } = useApiStore()
  // TOAST

  // Refs
  const submitSuccess = ref(false)
  // Private Attibute
  const _I18N_PREFIX = 'color'
  const _GET_ALL_FN = 'getAllColor'
  const _GET_BY_ID_FN = 'getColorById'
  // *******************Methodes***************
  const _createMutation = useMutation({
    mutationFn: async (color: CreateColorDto) => {
      return await api.api.colorControllerCreate(color)
    },
    onSuccess() {
      submitSuccess.value = true
    }
  })
  const _updateMutation = useMutation({
    mutationFn: async (color: ColorDto) => {
      return await api.api.colorControllerEdit(color.id, color)
    },
    onSuccess() {
      submitSuccess.value = true
    }
  })
  const getAllQuery = () =>
    useQuery({
      queryKey: [_GET_ALL_FN],
      queryFn: async () => _fetchAll(),
      retry: 0
    })
  const _fetchAll = async () => {
    const res = await api.api.colorControllerFindAll()
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
    const res = await api.api.colorControllerFindById(parseInt(id))
    return res.data
  }

  function useColorForm(id?: string) {
    const emptyForm: CreateColorDto = {
      name: '',
      reference: ''
    }
    return useFormHandler<CreateColorDto, AxiosResponse<ColorDto>>(
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
    formBuilder: useColorForm,
    getAll: getAllQuery,
    submitSuccess,
    getI18NPrefix: getI18NPrefix(_I18N_PREFIX)
  }
})
