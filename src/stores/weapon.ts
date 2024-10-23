import { defineStore } from 'pinia'
import { useApiStore } from '@/stores/api'
import { useMutation, useQuery } from '@tanstack/vue-query'
import type { CreateWeaponDto } from '@/api/Api'
import { useToastStore } from '@/stores/toast'
import { computed, ref } from 'vue'

export const useWeaponStore = defineStore('weapon', () => {
  const { api } = useApiStore()
  const { successMessage } = useToastStore()
  const _createWeaponIsOnError = ref(false)
  const _createWeaponIsOnErrorMessage = ref('')

  const createWeaponIsOnError = computed(() => _createWeaponIsOnError)
  const createWeaponIsOnErrorMessage = computed(() => _createWeaponIsOnErrorMessage)
  const queryPrerequisitesWeaponList = useQuery({
    queryKey: ['prerequis-weapon'],
    queryFn: () => {
      return api.api.weaponControllerFindPrerequisitesWeaponList()
    }
  })
  function queryFindAllWeaponByCategory(category: LegislationCategories) {
    return useQuery({
      queryKey: ['weaponsByCategory', category],
      queryFn: () => {
        return api.api.weaponControllerFindAllByCategory(category)
      }
    })
  }

  const { mutate } = useMutation({
    mutationFn: async (weapon: CreateWeaponDto) => {
      return await api.api.weaponControllerCreate(weapon)
    },
    onError(error: any) {
      _createWeaponIsOnError.value = true
      _createWeaponIsOnErrorMessage.value = error.response.data.message
    },
    onSuccess(data) {
      successMessage('weapon.summary', 'weapon.add.success')
    }
  })

  return {
    prerequisitesWeaponList: queryPrerequisitesWeaponList,
    createWeapon: mutate,
    createWeaponIsOnError,
    createWeaponIsOnErrorMessage,
    getWeaponsByCategoryQuery: queryFindAllWeaponByCategory
  }
})

export type LegislationCategories = 'D' | 'C' | 'B' | 'A'
