import { defineStore } from 'pinia'
import { useApiStore } from '@/stores/api'
import { useToastStore } from '@/stores/toast'
import { useMutation, useQuery } from '@tanstack/vue-query'
import type { CreateWeaponMagazineDto, FactoryDto, WeaponMagazineDto } from '@/api/Api'
import { computed, type Ref, ref } from 'vue'

export const useWeaponMagazineStore = defineStore('weaponMagazine', () => {
  const { api } = useApiStore()
  const { successMessage } = useToastStore()
  //const factoryName = ref<string>('')
  const magazineFactories = ref<FactoryDto[]>([])
  const magazines = ref<WeaponMagazineDto[]>([])

  const createWeaponMagazineMutation = useMutation({
    mutationFn: async (magazine: CreateWeaponMagazineDto) => {
      const res = await api.api.magazineControllerCreate(magazine)
      return res
    },
    onSuccess(data, variables, context) {
      successMessage('magazine.summary', 'magazine.form.success')
    }
  })

  const getMagazineByFactory = (factoryName: Ref<string>) =>
    useQuery({
      queryKey: ['getMagazineByFactory', factoryName.value],
      queryFn: async () => {
        const res = await api.api.magazineControllerFindByFactory(factoryName.value)
        magazines.value = res.data
        return res
      },
      enabled: !!factoryName.value
    })

  const getAllQuery = useQuery({
    queryKey: ['getAllMagazine'],
    queryFn: async () => {
      const res = await api.api.magazineControllerFindAll()
      magazines.value = res.data
      return res
    },
    enabled: false
  })

  const prerequisiteWeaponMagazineList = useQuery({
    queryKey: ['prerequisite-weapon-magazine'],
    queryFn: async () => {
      const res = await api.api.magazineControllerFindPrerequisitesWeaponMagazineList()
      magazineFactories.value = res.data.factories
      return res
    }
  })

  return {
    getAll: getAllQuery,
    create: createWeaponMagazineMutation,
    prerequisiteList: prerequisiteWeaponMagazineList,
    getByFactoryId: getMagazineByFactory,
    magazineFactories$: magazineFactories,
    magazines$: magazines
  }
})
