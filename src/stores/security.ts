import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useSecurityStore = defineStore('security', () => {
  const _key = 'token'
  const _isLogged = ref(false)
  const getToken = computed(() => sessionStorage.getItem(_key))
  const isLogged = computed(() => _isLogged)
  function setToken(token: string) {
    sessionStorage.setItem(_key, token)
    setIsLogged()
  }
  if (getToken.value) {
    setIsLogged()
  }
  function setIsLogged() {
    _isLogged.value = true
  }
  function logout() {
    sessionStorage.removeItem(_key)
    _isLogged.value = false
  }
  return { getToken, setToken, isLogged, logout }
})
