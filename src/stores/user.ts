import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import type { UserDto } from '@/api/Api'
import { useApiStore } from '@/stores/api'

export const useUserStore = defineStore('user', () => {
  const { api } = useApiStore()
  const _user = ref<UserDto | null>(null)
  const user = computed(() => _user)
  function setUser(user: UserDto | null): void {
    _user.value = user
  }

  async function getUserProfile() {
    const res = await api.api.authControllerMe()
    setUser(res.data)
  }

  return { user, setUser, getUserProfile }
})
