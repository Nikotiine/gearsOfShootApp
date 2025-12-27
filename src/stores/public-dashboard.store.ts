import { defineStore } from 'pinia'
import { useApiStore } from '@/stores/api'
import { useQuery } from '@tanstack/vue-query'
import type { NewItemsDto } from '@/api/Api'
import { getI18NPrefix } from '@/enum/I18NSuffix.enum'

export const usePublicDashboardStore = defineStore('public-dashboard', () => {
  const { api } = useApiStore()
  const _GET_ALL_NEW_FN = 'getAllNewItems'
  const _I18N_PREFIX = 'publicDashboard'
  const queryFindAllNewItems = () =>
    useQuery({
      queryKey: [_GET_ALL_NEW_FN],
      queryFn: async (): Promise<NewItemsDto[]> => await _fetchAllNewItems()
    })

  const _fetchAllNewItems = async (): Promise<NewItemsDto[]> => {
    const res = await api.api.dashboardControllerGetAllNewArticles()
    return res.data
  }
  return {
    getAllNewItems: queryFindAllNewItems,
    getI18NPrefix: getI18NPrefix(_I18N_PREFIX)
  }
})
