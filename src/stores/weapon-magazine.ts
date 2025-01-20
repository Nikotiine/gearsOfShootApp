import { defineStore } from 'pinia'
import { useApiStore } from '@/stores/api'
import { useToastStore } from '@/stores/toast'
import { useMutation, useQuery } from '@tanstack/vue-query'
import type { CreateWeaponMagazineDto } from '@/api/Api'
import { computed, ref } from 'vue'

export const useWeaponMagazineStore = defineStore('weaponMagazine', () => {
  const { api } = useApiStore()
  const { successMessage } = useToastStore()
  const factoryId = ref<number>(0)
  const findByFactoryIdRequestIsEnabled = computed(() => factoryId.value > 0)
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
    queryKey: ['getMagazineByFactory', factoryId],
    queryFn: async () => {
      const res = await api.api.magazineControllerFindByFactory(factoryId.value)
      return res
    },
    enabled: findByFactoryIdRequestIsEnabled
  })

  const getAllQuery = useQuery({
    queryKey: ['getAllMagazine'],
    queryFn: async () => {
      const res = await api.api.magazineControllerFindAll()
      return res
    }
  })

  const prerequisiteWeaponMagazineList = useQuery({
    queryKey: ['prerequisite-weapon-magazine'],
    queryFn: async () => {
      const res = await api.api.magazineControllerFindPrerequisitesWeaponMagazineList()
      return res
    }
  })

  const setFactoryId = (id: number) => {
    factoryId.value = id
  }

  return {
    getAll: getAllQuery,
    create: createWeaponMagazineMutation,
    prerequisiteList: prerequisiteWeaponMagazineList,
    setFactoryId: setFactoryId,
    getByFactoryId: getMagazineByFactory
  }
})
