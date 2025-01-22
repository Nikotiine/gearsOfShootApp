import { defineStore } from 'pinia'
import { useApiStore } from '@/stores/api'
import { useToastStore } from '@/stores/toast'
import { useMutation, useQuery } from '@tanstack/vue-query'
import { type CreateFactoryDto, type FactoryDto, type FactoryTypeDto } from '@/api/Api'
import { ref } from 'vue'

export const useFactoryStore = defineStore('factory', () => {
  const { api } = useApiStore()
  const { successMessage } = useToastStore()
  const factories = ref<FactoryDto[]>([])
  const isEnabledQueryByType = ref<boolean>(false)
  const factoryTypes = ref<FactoryTypeDto[]>([])
  const factoryType = ref<FactoryTypes>('Weapon')
  const createFactoryMutation = useMutation({
    mutationFn: async (factory: CreateFactoryDto) => {
      return await api.api.factoryControllerCreate(factory)
    },
    onSuccess: (data) => {
      successMessage('factory.summary', 'factory.form.success')
      factories.value.push(data.data)
    }
  })
  function changeFactoryType(type: any): void {
    factoryType.value = type
    isEnabledQueryByType.value = type !== factoryType.value
  }

  const getAllQuery = useQuery({
    queryKey: ['getAllFactories'],
    queryFn: async () => {
      const res = await api.api.factoryControllerFindAll()
      factories.value = res.data
      return res
    }
  })

  const getAllByTypeQuery = useQuery({
    queryKey: ['getAllByType', factoryType],
    queryFn: async () => {
      const res = await api.api.factoryControllerFindByType(factoryType.value)
      factories.value = res.data
      return res
    },
    enabled: isEnabledQueryByType.value
  })

  const getPrerequisitesFactoryList = useQuery({
    queryKey: ['prerequisitesFactoryList'],
    queryFn: async () => {
      const res = await api.api.factoryControllerFindPrerequisitesFactoryList()
      factoryTypes.value = res.data.types
      return res
    }
  })

  return {
    create: createFactoryMutation,
    getFactoriesByType: getAllByTypeQuery,
    selectFactoryType: changeFactoryType,
    factories$: factories,
    getAll: getAllQuery,
    getFactoryTypes: getPrerequisitesFactoryList,
    factoryTypes$: factoryTypes
  }
})
export type FactoryTypes = 'Weapon' | 'Ammunition' | 'Optic' | 'RDS'
