import { defineStore } from 'pinia'
import { useApiStore } from '@/stores/api'
import { useToastStore } from '@/stores/toast'
import { useMutation, useQuery } from '@tanstack/vue-query'
import type { CreateWeaponMagazineDto, FactoryDto, WeaponMagazineDto } from '@/api/Api'
import { computed, ref } from 'vue'

export const useWeaponMagazineStore = defineStore('weaponMagazine', () => {
  const { api } = useApiStore()
  const { successMessage } = useToastStore()
  const factoryName = ref<string>('')
  const magazineFactories = ref<FactoryDto[]>([])
  const magazines = ref<WeaponMagazineDto[]>([])
  const findByFactoryIdRequestIsEnabled = computed(() => factoryName.value.length > 0)
  const createWeaponMagazineMutation = useMutation({
    mutationFn: async (magazine: CreateWeaponMagazineDto) => {
      const res = await api.api.magazineControllerCreate(magazine)
      return res
    },
    onSuccess(data, variables, context) {
      successMessage('magazine.summary', 'magazine.form.success')
    }
  })

  const getMagazineByFactory = useQuery({
    queryKey: ['getMagazineByFactory', factoryName],
    queryFn: async () => {
      const res = await api.api.magazineControllerFindByFactory(factoryName.value)
      magazines.value = res.data
      return res
    },
    enabled: findByFactoryIdRequestIsEnabled
  })

  const getAllQuery = useQuery({
    queryKey: ['getAllMagazine'],
    queryFn: async () => {
      const res = await api.api.magazineControllerFindAll()
      magazines.value = res.data
      return res
    }
  })

  const prerequisiteWeaponMagazineList = useQuery({
    queryKey: ['prerequisite-weapon-magazine'],
    queryFn: async () => {
      const res = await api.api.magazineControllerFindPrerequisitesWeaponMagazineList()
      magazineFactories.value = res.data.factories
      return res
    }
  })

  const setFactoryId = (factory: string) => {
    factoryName.value = factory
  }

  return {
    getAll: getAllQuery,
    create: createWeaponMagazineMutation,
    prerequisiteList: prerequisiteWeaponMagazineList,
    setFactoryId: setFactoryId,
    getByFactoryId: getMagazineByFactory,
    magazineFactories$: magazineFactories,
    magazines$: magazines
  }
})
