import { defineStore } from 'pinia'
import { useApiStore } from '@/stores/api'
import { useToastStore } from '@/stores/toast'
import { useMutation, useQuery } from '@tanstack/vue-query'
import { type CreateFactoryDto, type FactoryDto, type FactoryTypeDto } from '@/api/Api'
import { ref } from 'vue'

export const useFactoryStore = defineStore('factory', () => {
  // Appel API
  const { api } = useApiStore()
  // TOAST
  const { successMessage } = useToastStore()
  // Refs
  const factories = ref<FactoryDto[]>([])
  const isEnabledQueryByType = ref<boolean>(false)
  const factoryTypes = ref<FactoryTypeDto[]>([])
  const factoryType = ref<FactoryType>('weapon')
  // Private Attibute
  const _SUMMARY = 'factory.summary'
  const _GET_ALL_FN = 'getAllFactory'
  const _GET_ALL_BY_TYPE_FN = 'getAllByTypeFactory'
  const _PREREQUISITE_FN = 'prerequisite-factory'
  // *******************Methodes***************
  const createFactoryMutation = useMutation({
    mutationFn: async (factory: CreateFactoryDto) => {
      return await api.api.factoryControllerCreate(factory)
    },
    onSuccess: (data) => {
      successMessage(_SUMMARY, 'factory.form.success')
      factories.value.push(data.data)
    }
  })
  function changeFactoryType(type: any): void {
    factoryType.value = type
    isEnabledQueryByType.value = type !== factoryType.value
  }

  const getAllQuery = () =>
    useQuery({
      queryKey: [_GET_ALL_FN],
      queryFn: async () => {
        const res = await api.api.factoryControllerFindAll()
        factories.value = res.data
        return res
      }
    })

  const getPrerequisitesFactoryList = useQuery({
    queryKey: [_PREREQUISITE_FN],
    queryFn: async () => {
      const res = await api.api.factoryControllerFindPrerequisitesFactoryList()
      factoryTypes.value = res.data.types
      return res
    }
  })

  const getFactoriesByType = (type: FactoryType) => {
    return useQuery({
      queryKey: [_GET_ALL_BY_TYPE_FN, type],
      queryFn: async () => {
        const res = await api.api.factoryControllerFindByType(type)
        factories.value = res.data
        return res
      }
    })
  }

  const selectTypeOfQuery = (type: FactoryType) => {
    if (type === 'all') {
      return getAllQuery()
    } else {
      return getFactoriesByType(type)
    }
  }

  return {
    create: createFactoryMutation,
    selectFactoryType: changeFactoryType,
    factories$: factories,
    getAll: getAllQuery,
    getFactoryTypes: getPrerequisitesFactoryList,
    factoryTypes$: factoryTypes,
    getFactoriesByType: selectTypeOfQuery
  }
})
export type FactoryType = 'weapon' | 'ammunition' | 'optic' | 'magazine' | 'all' | 'accessory'
