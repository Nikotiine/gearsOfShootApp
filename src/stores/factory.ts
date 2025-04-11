import { defineStore } from 'pinia'
import { useApiStore } from '@/stores/api'
import { useToastStore } from '@/stores/toast'
import { useMutation, useQuery } from '@tanstack/vue-query'
import { type CreateFactoryDto, type FactoryDto, type FactoryTypeDto } from '@/api/Api'
import { ref } from 'vue'
import { useFormHandler } from '@/shared/useFormHandler'
import type { AxiosResponse } from 'axios'
import { getI18NPrefix, I18NSuffix } from '@/enum/I18NSuffix.enum'

export const useFactoryStore = defineStore('factory', () => {
  // Appel API
  const { api } = useApiStore()
  // TOAST
  const { successMessage } = useToastStore()
  // Refs

  const factoryTypes = ref<FactoryTypeDto[]>([])

  const mutationSuccess = ref(false)

  const _I18N_PREFIX = 'factory'
  const _GET_ALL_BY_TYPE_FN = 'getAllByTypeFactory'
  const _PREREQUISITE_FN = 'prerequisite-factory'
  const _GET_BY_ID_FN = 'getFactoryById'
  // *******************Methodes***************
  const _createMutation = useMutation({
    mutationFn: async (factory: CreateFactoryDto) => {
      return await api.api.factoryControllerCreate(factory)
    },
    onSuccess() {
      mutationSuccess.value = true
    }
  })

  const _updateMutation = useMutation({
    mutationFn: async (ammunition: FactoryDto) => {
      return await api.api.factoryControllerEdit(ammunition.id, ammunition)
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
    const res = await api.api.factoryControllerFindById(parseInt(id))
    return res.data
  }
  const getPrerequisitesFactoryList = useQuery({
    queryKey: [_PREREQUISITE_FN],
    queryFn: async () => {
      const res = await api.api.factoryControllerFindPrerequisitesFactoryList()
      factoryTypes.value = res.data.types
      return res
    }
  })

  const getFactoriesByType = (type?: FactoryType) => {
    return useQuery({
      queryKey: [_GET_ALL_BY_TYPE_FN, type],
      queryFn: async () => {
        return _fetchByType(type)
      }
    })
  }

  const _fetchByType = async (type?: FactoryType) => {
    if (!type) {
      return _fetchAll()
    }
    const res = await api.api.factoryControllerFindByType(type)
    return res.data
  }
  const _fetchAll = async () => {
    const res = await api.api.factoryControllerFindAll()
    return res.data
  }

  function useFactoryForm(id?: string) {
    const emptyForm: CreateFactoryDto = {
      name: '',
      description: '',
      typeId: 1,
      reference: ''
    }
    return useFormHandler<CreateFactoryDto, AxiosResponse<FactoryDto>>(
      emptyForm,
      getByIdQuery,
      _createMutation,
      _updateMutation,
      _I18N_PREFIX,
      id,
      (data) => ({
        ...data,
        typeId: data.type.id
      })
    )
  }
  const _deleteFactoryMutation = useMutation({
    mutationFn: async (id: number) => {
      return await api.api.factoryControllerDelete(id)
    },
    onSuccess() {
      const prefix = getI18NPrefix(_I18N_PREFIX)
      successMessage(prefix + I18NSuffix.SUMMARY, prefix + I18NSuffix.DELETED)
    }
  })

  const deleteFunction = (id: number) => {
    _deleteFactoryMutation.mutate(id)
  }
  return {
    formBuilder: useFactoryForm,
    getFactoryTypes: getPrerequisitesFactoryList,
    factoryTypes$: factoryTypes,
    getFactoriesByType: getFactoriesByType,
    delete: deleteFunction,
    mutationSuccess,
    getI18NPrefix: getI18NPrefix(_I18N_PREFIX)
  }
})
export type FactoryType = 'weapon' | 'ammunition' | 'optic' | 'magazine' | 'accessory'
