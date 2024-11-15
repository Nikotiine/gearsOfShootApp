import { defineStore } from 'pinia'
import { useApiStore } from '@/stores/api'
import { useToastStore } from '@/stores/toast'
import { ref } from 'vue'
import { useMutation, useQuery } from '@tanstack/vue-query'
import type { CreateWeaponTypeDto, WeaponReloadModeDto, WeaponTypeDto } from '@/api/Api'

export const useWeaponTypeStore = defineStore('weaponType', () => {
  const { api } = useApiStore()
  const { successMessage } = useToastStore()
  const getAllData = ref<WeaponTypeDto[]>([])
  const modes = ref<WeaponReloadModeDto[]>([])

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
      const res = await api.api.weaponTypeControllerFindAllWeaponTypes()
      getAllData.value = res.data
      return res
    }
  })

  const queryPrerequisitesWeaponTypeQuery = useQuery({
    queryKey: ['prerequis-weapon-type'],
    queryFn: async () => {
      const res = await api.api.weaponTypeControllerFindPrerequisitesWeaponTypeList()
      modes.value = res.data.modes
      return res
    }
  })

  return {
    create: createWeaponTypeMutate,
    getAll: getAllQuery,
    getAllData$: getAllData,
    prerequisiteList: queryPrerequisitesWeaponTypeQuery,
    modes$: modes
  }
})
