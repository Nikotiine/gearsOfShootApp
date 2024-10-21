import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import { type UserDto, UserDtoRoleEnum } from '@/api/Api'
import { useApiStore } from '@/stores/api'

export const useUserStore = defineStore('user', () => {
  const { api } = useApiStore()
  const _user = ref<UserDto | null>(null)
  const _isAdmin = ref(false)
  const user = computed(() => _user)
  const isAdmin = computed(() => _isAdmin)
  function setUser(user: UserDto | null): void {
    _user.value = user
    _isAdmin.value = user?.role === UserDtoRoleEnum.ADMIN
  }

  async function getUserProfile() {
    const res = await api.api.authControllerMe()
    setUser(res.data)

    return res
  }

  return { getUser: user, setUser, getUserProfile, isAdmin }
})
