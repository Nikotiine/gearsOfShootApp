import { defineStore } from 'pinia'
import { useApiStore } from '@/stores/api'
import { useToastStore } from '@/stores/toast'
import { useMutation, useQuery } from '@tanstack/vue-query'
import {
  type CreateFactoryDto,
  type FactoryDto,
  type FactoryFilter,
  type FactoryTypeDto,
  type UpdateFactoryDto
} from '@/api/Api'
import { ref } from 'vue'
import { useFormHandler } from '@/shared/useFormHandler'
import type { AxiosResponse } from 'axios'
import { getI18NPrefix, I18NSuffix } from '@/enum/I18NSuffix.enum'
import { buildFactoryFilter } from '@/shared/api-dto/query-filters.builder'

export const useFactoryStore = defineStore('factory-store', () => {
  // Appel API
  const { api } = useApiStore()
  // TOAST
  const { successMessage } = useToastStore()
  // Refs
  const factories = ref<FactoryDto[]>([])
  const factoryTypes = ref<FactoryTypeDto[]>([])
  const submitSuccess = ref(false)
  const queryFilters = ref<FactoryFilter>({ ...buildFactoryFilter() })

  const _I18N_PREFIX = 'factory'
  const _GET_ALL_FN = 'getAllFactories'
  const _GET_ALL_BY_TYPE_FN = 'getAllByTypeFactory'
  const _PREREQUISITE_FN = 'getAllFactoryTypes'
  const _GET_BY_ID_FN = 'getFactoryById'
  // *******************Methodes***************
  const _createMutation = useMutation({
    mutationFn: async (factory: CreateFactoryDto) => {
      return await api.api.factoryControllerCreate(factory)
    },
    onSuccess() {
      submitSuccess.value = true
    }
  })

  const _updateMutation = useMutation({
    mutationFn: async (factory: UpdateFactoryDto) => {
      return await api.api.factoryControllerEdit(factory.id, factory)
    },
    onSuccess() {
      submitSuccess.value = true
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

  const getFactoryTypes = () =>
    useQuery({
      queryKey: [_PREREQUISITE_FN],
      queryFn: async () => {
        const res = await api.api.factoryTypeControllerFindAll()
        factoryTypes.value = res.data
        return res.data
      }
    })

  const getFactoriesByType = (type?: FactoryType) => {
    return useQuery({
      queryKey: [_GET_ALL_BY_TYPE_FN, type],
      queryFn: async () => {
        return _fetchByType(type)
      },
      enabled: !!type
    })
  }

  const _fetchByType = async (type?: FactoryType) => {
    if (!type) {
      return _fetchAll(queryFilters.value)
    }
    const res = await api.api.factoryControllerFindByType(type)
    factories.value = res.data
    return res.data
  }

  const queryFindAll = () =>
    useQuery({
      queryKey: [_GET_ALL_FN, queryFilters],
      queryFn: async () => {
        return await _fetchAll(queryFilters.value)
      },
      enabled: !!queryFilters.value,
      placeholderData: (old) => old
    })

  const _fetchAll = async (filters: FactoryFilter) => {
    const res = await api.api.factoryControllerFindAll({ filters })
    return res.data
  }

  function useFactoryForm(id?: string) {
    const emptyForm: CreateFactoryDto = {
      name: '',
      description: '',
      type: {
        name: '',
        id: 0
      }
    }
    return useFormHandler<CreateFactoryDto, AxiosResponse<FactoryDto>>(
      emptyForm,
      getByIdQuery,
      _createMutation,
      _updateMutation,
      _I18N_PREFIX,
      _GET_BY_ID_FN,
      _GET_ALL_FN,
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

  const deleteFunction = (id: number): void => {
    _deleteFactoryMutation.mutate(id)
  }

  return {
    formBuilder: useFactoryForm,
    getFactoryTypes: getFactoryTypes,
    getAll: queryFindAll,
    getFactoriesByType: getFactoriesByType,
    delete: deleteFunction,
    submitSuccess: submitSuccess,
    getI18NPrefix: getI18NPrefix(_I18N_PREFIX),
    factories$: factories,
    queryFilters$: queryFilters
  }
})
export type FactoryType = 'weapon' | 'ammunition' | 'optic' | 'magazine' | 'accessory'
