import { defineStore } from 'pinia'
import { useApiStore } from '@/stores/api'
import { useToastStore } from '@/stores/toast'
import { computed, ref } from 'vue'
import { useMutation } from '@tanstack/vue-query'
import type { CreateWeaponTypeDto } from '@/api/Api'

export const useWeaponTypeStore = defineStore('weaponType', () => {
  const { api } = useApiStore()
  const { successMessage } = useToastStore()
  const _isError = ref(false)
  const _errorMessage = ref('')
  const isError = computed(() => _isError)
  const errorMessage = computed(() => _errorMessage)
  const { mutate } = useMutation({
    mutationFn: (weaponType: CreateWeaponTypeDto) => {
      return api.api.weaponTypeControllerCreate(weaponType)
    },
    onSuccess(data, variables, context) {
      successMessage('weaponType.summary', 'weaponType.create.success')
    },
    onError(error: any) {
      _isError.value = true
      _errorMessage.value = error.response.data.message
    }
  })
  return { createWeaponType: mutate, isError, errorMessage }
})
