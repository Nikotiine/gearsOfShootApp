import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import { useQuery } from '@tanstack/vue-query'
import { useSecurityStore } from '@/stores/security'
import type { UserDto } from '@/api/Api'
import { useApiStore } from '@/stores/api'

export const useUserStore = defineStore('user', () => {
  const _user = ref()
  const user = computed(() => _user)
  //const { api } = useApiStore()
  function setUser(user: UserDto) {
    _user.value = user
  }
  /*  const getUserProfile = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      console.log('ici')
      const { getToken } = useSecurityStore()
      console.log(getToken)

      const data = await api.api.authControllerMe()
      setUser(data.data)
      return data
    },
    retry: 1
  })*/

  return { user, setUser }
})
