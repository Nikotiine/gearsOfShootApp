import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import { type UserDto, UserDtoRoleEnum, type UserFilter } from '@/api/Api'
import { useApiStore } from '@/stores/api'
import { buildUsersFilter } from '@/shared/api-dto/query-filters.builder'
import { useQuery } from '@tanstack/vue-query'

export const useUserStore = defineStore('user-store', () => {
  const { api } = useApiStore()
  const _user = ref<UserDto | null>(null)
  const _isAdmin = ref(false)
  const _GET_ALL_FN = 'getAllFactories'
  const queryFilters = ref<UserFilter>({ ...buildUsersFilter() })
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
  const queryFindAll = () =>
    useQuery({
      queryKey: [_GET_ALL_FN, queryFilters],
      queryFn: async () => {
        return await _fetchAll(queryFilters.value)
      },
      enabled: !!queryFilters.value,
      placeholderData: (old) => old
    })

  const _fetchAll = async (filters: UserFilter) => {
    const res = await api.api.userControllerFindAll({ filters })
    return res.data
  }

  return {
    getUser: user,
    setUser,
    getUserProfile,
    isAdmin,
    getAll: queryFindAll,
    queryFilter$: queryFilters
  }
})
