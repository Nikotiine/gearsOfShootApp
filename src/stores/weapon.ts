import { defineStore } from 'pinia'
import { useApiStore } from '@/stores/api'
import { useQuery } from '@tanstack/vue-query'

export const useWeaponStore = defineStore('weapon', () => {
  const { api } = useApiStore()

  const query = useQuery({
    queryKey: ['list'],
    queryFn: () => {
      return api.api.weaponControllerFindPrerequisitesWeaponList()
    }
  })

  return { query }
})
