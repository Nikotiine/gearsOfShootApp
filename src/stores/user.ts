import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { AuthenticationService, OpenAPI, type UserDto } from '@/api'
import { useQuery } from '@tanstack/vue-query'
import { useSecurityStore } from '@/stores/security'

export const useUserStore = defineStore('user', () => {
  const _user = ref({})
  const user = computed(() => _user)
  function setUser(user: UserDto) {
    _user.value = user
  }
  function getUserProfile() {
    useQuery({
      queryKey: ['user'],
      queryFn: async () => {
        const { getToken } = useSecurityStore()
        console.log(getToken)
        OpenAPI.TOKEN = getToken ? getToken : ''
        const data = await AuthenticationService.authControllerMe()
        setUser(data)
        return data
      },
      retry: 1
    })
  }
  return { user, setUser, getUserProfile }
})
