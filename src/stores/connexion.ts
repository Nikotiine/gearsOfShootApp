import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useMutation } from '@tanstack/vue-query'
import type { UserCredentialDto } from '@/api/Api'
import { useApiStore } from '@/stores/api'
import { useSecurityStore } from '@/stores/security'
import { useToastStore } from '@/stores/toast'

export const useConnexionStore = defineStore('connexion', () => {
  const { setToken } = useSecurityStore()
  const isVisible = ref(false)

  const form = ref({
    email: '',
    password: ''
  })
  const { api } = useApiStore()
  const { successMessage } = useToastStore()
  function toggleConnexionDialog() {
    isVisible.value = !isVisible.value
  }

  const loginMutation = useMutation({
    mutationFn: async (credential: UserCredentialDto) => {
      return await api.api.authControllerLogin(credential)
    },
    onSuccess: async (res) => {
      await setToken(res.data.accessToken)
      successMessage('connexion.summary', `connexion.login.success`)
      toggleConnexionDialog()
    },
    onError() {
      form.value.password = ''
    }
  })

  return {
    isVisible$: isVisible,
    toggleConnexionDialog,
    login: loginMutation,
    form$: form
  }
})
