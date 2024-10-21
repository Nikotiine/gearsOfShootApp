import { defineStore } from 'pinia'
import { useApiStore } from '@/stores/api'
import { useQuery } from '@tanstack/vue-query'

export const useWeaponStore = defineStore('weapon', () => {
  const { api } = useApiStore()
  const {} = useQuery(() => ({
    queryKey: 'list',
    queryFn: async () => {}
  }))
})
