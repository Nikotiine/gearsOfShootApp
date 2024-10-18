import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useApiStore } from '@/stores/api'
import { useMutation } from '@tanstack/vue-query'
import type { CreateUserDto } from '@/api/Api'
import { useToastStore } from '@/stores/toast'

export const useRegisterStore = defineStore('register', () => {
  const _isVisible = ref(false)
  const _isError = ref(false)
  const _errorMessage = ref('')
  const { api } = useApiStore()
  const { successMessage } = useToastStore()
  const isVisible = computed(() => _isVisible)
  const isError = computed(() => _isError)
  const errorMessage = computed(() => _errorMessage)
  function toggleRegisterDialog() {
    _isVisible.value = !_isVisible.value
    _isError.value = false
  }
  const { mutate } = useMutation({
    mutationFn: (user: CreateUserDto) => {
      console.log('cicicii')
      return api.api.userControllerRegister(user)
    },
    onSuccess(data) {
      _isError.value = false
      successMessage('register.summary', 'register.success')
      toggleRegisterDialog()
    },
    onError(error: any, variables, context) {
      _isError.value = true
      _errorMessage.value = error.response.data.message
    }
  })

  return {
    isVisible,
    toggleRegisterDialog,
    register: mutate,
    isError,
    errorMessage
  }
})
