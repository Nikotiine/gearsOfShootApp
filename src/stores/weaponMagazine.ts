import { defineStore } from 'pinia'
import { useApiStore } from '@/stores/api'
import { useToastStore } from '@/stores/toast'
import { useMutation, useQuery } from '@tanstack/vue-query'
import type { CreateWeaponMagazineDto } from '@/api/Api'

export const useWeaponMagazineStore = defineStore('weaponMagazine', () => {
  const { api } = useApiStore()
  const { successMessage } = useToastStore()

  const createWeaponMagazineMutation = useMutation({
    mutationFn: async (magazine: CreateWeaponMagazineDto) => {
      const res = await api.api.magazineControllerCreate(magazine)
      return res
    },
    onSuccess(data, variables, context) {
      successMessage('magazine.summary', 'magazine.form.success')
    }
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

  return {
    getAll: getAllQuery,
    create: createWeaponMagazineMutation,
    prerequisiteList: prerequisiteWeaponMagazineList
  }
})
