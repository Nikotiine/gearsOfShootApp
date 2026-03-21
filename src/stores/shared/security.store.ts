import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useUserStore } from '@/stores/user.store'

export const useSecurityStore = defineStore('security-store', () => {
  const _key = 'token'
  const _CART_KEY = '__cart'
  const _isLogged = ref(false)
  const getToken = computed(() => sessionStorage.getItem(_key))
  const isLogged = computed(() => _isLogged)
  const { setUser, getUser, getUserProfile } = useUserStore()
  async function setToken(token: string) {
    sessionStorage.setItem(_key, token)
    const user = await getUserProfile()
    if (user.data) {
      setIsLogged()
    } else {
      logout()
    }
  }
  if (getUser.value !== null && getToken.value) {
    setIsLogged()
  } else if (getUser.value === null && getToken.value) {
    getUserProfile()
      .then((res) => {
        if (res.data) {
          setIsLogged()
        }
      })
      .catch(() => {
        logout()
      })
  }
  function setIsLogged(): void {
    _isLogged.value = true
  }
  function logout(): void {
    sessionStorage.clear()
    _isLogged.value = false
    setUser(null)
  }
  return { getToken, setToken, isLogged, logout }
})
