import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useMutation } from '@tanstack/vue-query'
import type { UserCredentialDto } from '@/api/Api'
import { useApiStore } from '@/stores/api'
import { useSecurityStore } from '@/stores/security'
import { useToastStore } from '@/stores/toast'

export const useConnexionStore = defineStore('connexion', () => {
  const { setToken } = useSecurityStore()
  const _isVisible = ref(false)
  const _isError = ref(false)
  const _errorMessage = ref('')
  const isVisible = computed(() => _isVisible)
  const _isSuccess = ref(false)
  const isError = computed(() => _isError)
  const errorMessage = computed(() => _errorMessage)
  const isSuccess = computed(() => _isSuccess)
  const { api } = useApiStore()
  const { successMessage } = useToastStore()
  function toggleConnexionDialog() {
    _isVisible.value = !_isVisible.value
    _isError.value = false
  }

  const { mutate } = useMutation({
    mutationFn: async (credential: UserCredentialDto) => {
      _isError.value = false
      return await api.api.authControllerLogin(credential)
    },
    onSuccess: async (res) => {
      await setToken(res.data.accessToken)
      successMessage('connexion.summary', `connexion.login.success`)
      _isError.value = false
      _isSuccess.value = true
      toggleConnexionDialog()
    },
    onError(error: any) {
      _isError.value = true
      _errorMessage.value = error.response.data.message
    }
  })

  return { isVisible, toggleConnexionDialog, login: mutate, isError, errorMessage, isSuccess }
})
