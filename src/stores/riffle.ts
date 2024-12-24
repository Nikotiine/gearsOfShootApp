import { defineStore } from 'pinia'
import { useApiStore } from '@/stores/api'
import type { CreateRiffleDto, RiffleDto } from '@/api/Api'
import { useMutation, useQuery } from '@tanstack/vue-query'
import { useToastStore } from '@/stores/toast'
import { ref } from 'vue'

export const useRiffleStore = defineStore('riffle', () => {
  const { api } = useApiStore()
  const { successMessage } = useToastStore()
  const categoryId = ref<number>(0)
  const mLockOptions = ref<MlockOptions[]>([
    {
      name: '3 Heures'
    },
    {
      name: '6 Heures'
    },
    {
      name: '9 Heures'
    }
  ])
  const riffles = ref<RiffleDto[]>([])
  const createWeaponMutation = useMutation({
    mutationFn: async (riffle: CreateRiffleDto) => {
      return await api.api.riffleControllerCreate(riffle)
    },
    onSuccess(data) {
      riffles.value.push(data.data)
      successMessage('weapon.summary', 'weapon.add.success')
    }
  })

  const getAllRiffleQuery = useQuery({
    queryKey: ['get-all-riffle'],
    queryFn: async () => {
      const res = await api.api.riffleControllerFindAll()
      riffles.value = res.data
      return res
    }
  })

  const getAllRiffleByCategoryQuery = useQuery({
    queryKey: ['get-all-riffle-by-category', categoryId],
    queryFn: async () => {
      const res = await api.api.riffleControllerFindAllByCategory(categoryId.value)
      riffles.value = res.data
      return res
    }
  })
  function setCategoryId(id: number): void {
    categoryId.value = id
  }

  return {
    create: createWeaponMutation,
    setCategoryId: setCategoryId,
    getRiffleByCategory: getAllRiffleByCategoryQuery,
    getAll: getAllRiffleQuery,
    mLockOptions$: mLockOptions
  }
})
export interface MlockOptions {
  name: string
}
