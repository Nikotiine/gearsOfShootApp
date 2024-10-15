import { defineStore } from 'pinia'
import { computed } from 'vue'

export const useUserStore = defineStore('user', () => {
  const key = 'token'
  const getToken = computed(() => sessionStorage.getItem(key))
  function setToken(token: string) {
    sessionStorage.setItem(key, token)
  }
  return { getToken, setToken }
})
