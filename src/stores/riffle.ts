import { defineStore } from 'pinia'
import { useApiStore } from '@/stores/api'
import type { CreateRiffleDto, RiffleDto, UpdateRiffleDto } from '@/api/Api'
import { useMutation, useQuery } from '@tanstack/vue-query'
import { useToastStore } from '@/stores/toast'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

export const useRiffleStore = defineStore('riffle', () => {
  const { api } = useApiStore()
  const { successMessage } = useToastStore()
  const { push } = useRouter()
  const categoryId = ref<number>(0)
  const riffleId = ref<number>(0)
  const findByIdRequestIsEnabled = computed(() => riffleId.value > 0)

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

  const updateRiffleMutation = useMutation({
    mutationFn: async (riffle: UpdateRiffleDto) => {
      return await api.api.riffleControllerUpdate(riffle.id, riffle)
    },
    onSuccess(data) {
      const index = riffles.value.findIndex((riffle) => riffle.id === data.data.id)
      riffles.value.splice(index, 1)
      riffles.value.push(data.data)
      successMessage('weapon.summary', 'weapon.add.edit')
      //  push('/admin/gestion/list/weapon/riffle/' + data.data.category.name)
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

  const getRiffleById = useQuery({
    queryKey: ['get-riffle-by-id', riffleId],
    queryFn: async () => {
      const res = await api.api.riffleControllerFindById(riffleId.value)
      return res
    },
    enabled: findByIdRequestIsEnabled
  })

  function setCategoryId(id: number): void {
    categoryId.value = id
  }
  function setId(id: number): void {
    riffleId.value = id
  }

  return {
    create: createWeaponMutation,
    edit: updateRiffleMutation,
    setCategoryId: setCategoryId,
    getRiffleByCategory: getAllRiffleByCategoryQuery,
    getAll: getAllRiffleQuery,
    setRiffleId: setId,
    getRiffleById: getRiffleById
  }
})
export interface MlockOptions {
  name: string
}
