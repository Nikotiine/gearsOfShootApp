import { defineStore } from 'pinia'
import { useApiStore } from '@/stores/api'
import { useToastStore } from '@/stores/toast'
import { useMutation } from '@tanstack/vue-query'
import type { CreateFactoryDto } from '@/api/Api'
import { computed, ref } from 'vue'

export const useFactoryStore = defineStore('factory', () => {
  const { api } = useApiStore()
  const { successMessage } = useToastStore()
  const _isError = ref(false)
  const _errorMessage = ref('')
  const isError = computed(() => _isError)
  const errorMessage = computed(() => _errorMessage)
  const { mutate } = useMutation({
    mutationFn: async (factory: CreateFactoryDto) => {
      return await api.api.factoryControllerCreate(factory)
    },
    onSuccess(data) {
      successMessage('factory.summary', 'factory.create')
    },
    onError(error: any) {
      _isError.value = true
      _errorMessage.value = error.response.data.message
    }
  })
  return { createFactory: mutate, isError, errorMessage }
})
