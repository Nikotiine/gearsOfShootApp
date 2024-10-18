import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useUserStore } from '@/stores/user'

export const useSecurityStore = defineStore('security', () => {
  const _key = 'token'
  const _isLogged = ref(false)
  const getToken = computed(() => sessionStorage.getItem(_key))
  const isLogged = computed(() => _isLogged)
  const { setUser } = useUserStore()
  function setToken(token: string) {
    sessionStorage.setItem(_key, token)
    setIsLogged()
  }
  if (getToken.value) {
    setIsLogged()
  }
  function setIsLogged(): void {
    _isLogged.value = true
  }
  function logout(): void {
    sessionStorage.removeItem(_key)
    _isLogged.value = false
    setUser(null)
  }
  return { getToken, setToken, isLogged, logout }
})
