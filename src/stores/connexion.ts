import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useMutation, useQuery } from '@tanstack/vue-query'
import type { UserCredentialDto } from '@/api/Api'
import { useApiStore } from '@/stores/api'
import { useSecurityStore } from '@/stores/security'
import { useToastStore } from '@/stores/toast'
import { useUserStore } from '@/stores/user'

export const useConnexionStore = defineStore('connexion', () => {
  const { setToken } = useSecurityStore()
  const _isVisible = ref(false)
  const _isError = ref(false)
  const _errorMessage = ref(false)
  const isVisible = computed(() => _isVisible)
  const isError = computed(() => _isError)
  const errorMessage = computed(() => _errorMessage)
  const _isSuccess = ref(false)
  const isSuccess = computed(() => _isSuccess)
  const { api } = useApiStore()
  const { successMessage } = useToastStore()
  const { setUser } = useUserStore()
  function toggleConnexionDialog() {
    _isVisible.value = !_isVisible.value
    _isError.value = false
  }

  const { mutate } = useMutation({
    mutationFn: async (credential: UserCredentialDto) => {
      return await api.api.authControllerLogin(credential)
    },
    onSuccess(res) {
      setToken(res.data.accessToken)
      successMessage('connexion.summary', `connexion.login.success`)
      _isError.value = false
      _isSuccess.value = true
      toggleConnexionDialog()
    },
    onError(error: any) {
      console.log(error)
      _isError.value = true
      _errorMessage.value = error.response.data.message
      // errorMessage.value = error.response.data.message
    }
  })
  const { data } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const res = await api.api.authControllerMe()
      console.log(res)
      setUser(res.data)
      return res
    },
    enabled: isSuccess.value,
    retry: false
  })
  return { isVisible, toggleConnexionDialog, login: mutate, user: data }
})
