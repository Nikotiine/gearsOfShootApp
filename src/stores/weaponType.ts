import { defineStore } from 'pinia'
import { useApiStore } from '@/stores/api'
import { useToastStore } from '@/stores/toast'
import { ref } from 'vue'
import { useMutation, useQuery } from '@tanstack/vue-query'
import type { CreateWeaponTypeDto, WeaponReloadModeDto, WeaponTypeDto } from '@/api/Api'

export const useWeaponTypeStore = defineStore('weaponType', () => {
  // Appel API
  const { api } = useApiStore()
  // TOAST
  const { successMessage } = useToastStore()
  // Refs
  const weaponTypes = ref<WeaponTypeDto[]>([])
  const modes = ref<WeaponReloadModeDto[]>([])
  // Private Attibute
  const _SUMMARY = 'weaponType.summary'
  const _GET_ALL_FN = 'getAllWeaponType'
  const _PREREQUISITE_FN = 'prerequisite-weaponType'
  // *******************Methodes***************
  const createWeaponTypeMutate = useMutation({
    mutationFn: async (weaponType: CreateWeaponTypeDto) => {
      return await api.api.weaponTypeControllerCreate(weaponType)
    },
    onSuccess(data) {
      successMessage(_SUMMARY, 'weaponType.form.success')
      weaponTypes.value.push(data.data)
    }
  })

  const getAllQuery = () =>
    useQuery({
      queryKey: [_GET_ALL_FN],
      queryFn: async () => {
        const res = await api.api.weaponTypeControllerFindAllWeaponTypes()
        weaponTypes.value = res.data
        return res
      }
    })

  const queryPrerequisitesWeaponTypeQuery = useQuery({
    queryKey: [_PREREQUISITE_FN],
    queryFn: async () => {
      const res = await api.api.weaponTypeControllerFindPrerequisitesWeaponTypeList()
      modes.value = res.data.modes
      return res
    }
  })

  return {
    create: createWeaponTypeMutate,
    getAll: getAllQuery,
    weaponTypes$: weaponTypes,
    prerequisiteList: queryPrerequisitesWeaponTypeQuery,
    modes$: modes
  }
})
