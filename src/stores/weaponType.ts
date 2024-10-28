import { defineStore } from 'pinia'
import { useApiStore } from '@/stores/api'
import { useToastStore } from '@/stores/toast'
import { ref } from 'vue'
import { useMutation, useQuery } from '@tanstack/vue-query'
import type { CreateWeaponTypeDto, WeaponTypeDto } from '@/api/Api'

export const useWeaponTypeStore = defineStore('weaponType', () => {
  const { api } = useApiStore()
  const { successMessage } = useToastStore()
  const getAllData = ref<WeaponTypeDto[]>([])

  const createWeaponTypeMutate = useMutation({
    mutationFn: (weaponType: CreateWeaponTypeDto) => {
      return api.api.weaponTypeControllerCreate(weaponType)
    },
    onSuccess(data) {
      successMessage('weaponType.summary', 'weaponType.form.success')
      getAllData.value.push(data.data)
    }
  })

  const getAllQuery = useQuery({
    queryKey: ['weaponTypesQuery'],
    queryFn: async () => {
      getAllData.value = (await api.api.weaponTypeControllerFindAllWeaponTypes()).data
      return api.api.weaponTypeControllerFindAllWeaponTypes()
    }
  })

  return { create: createWeaponTypeMutate, getAll: getAllQuery, getAllData$: getAllData }
})
