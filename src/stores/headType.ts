import { defineStore } from 'pinia'
import { useApiStore } from '@/stores/api'
import { useToastStore } from '@/stores/toast'
import { useMutation } from '@tanstack/vue-query'
import type { CreateAmmunitionHeadTypeDto } from '@/api/Api'
import { computed, ref } from 'vue'

export const useHeadTypeStore = defineStore('headType', () => {
  const { api } = useApiStore()
  const { successMessage } = useToastStore()
  const _isError = ref(false)
  const _errorMessage = ref('')
  const isError = computed(() => _isError)
  const errorMessage = computed(() => _errorMessage)
  const { mutate } = useMutation({
    mutationFn: (headtype: CreateAmmunitionHeadTypeDto) => {
      return api.api.ammunitionHeadTypeControllerCreate(headtype)
    },
    onSuccess(data, variables, context) {
      successMessage('headType.summary', 'headType.create.success')
    },
    onError(error: any) {
      _isError.value = true
      _errorMessage.value = error.response.data.message
    }
  })
  return { createHeadType: mutate, isError, errorMessage }
})
