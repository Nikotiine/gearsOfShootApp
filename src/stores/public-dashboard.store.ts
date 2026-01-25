import { defineStore } from 'pinia'
import { useApiStore } from '@/stores/api'
import { useQuery } from '@tanstack/vue-query'
import type { DiscountedItemDto, NewItemsDto } from '@/api/Api'
import { ref } from 'vue'
import { useRoutableObjectStore } from '@/stores/shared/routable-object.store'
import { I18nPrefix } from '@/i18n/i18n-prefix.enum'

export const usePublicDashboardStore = defineStore('public-dashboard', () => {
  const { api } = useApiStore()
  const routableObjectStore = useRoutableObjectStore()
  const _GET_ALL_NEW_FN = 'getAllNewItems'
  const _GET_ALL_DISCOUNT_FN = 'getAllNDiscountItems'
  const _I18N_PREFIX = I18nPrefix.PUBLIC_DASHBOARD
  const responsiveOptions = ref([
    {
      breakpoint: '1400px',
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: '1199px',
      numVisible: 3,
      numScroll: 1
    },
    {
      breakpoint: '767px',
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: '575px',
      numVisible: 1,
      numScroll: 1
    }
  ])

  const queryFindAllNewItems = () =>
    useQuery({
      queryKey: [_GET_ALL_NEW_FN],
      queryFn: async (): Promise<NewItemsDto[]> => await _fetchAllNewItems()
    })

  const _fetchAllNewItems = async (): Promise<NewItemsDto[]> => {
    const res = await api.api.dashboardControllerGetAllNewArticles()
    return res.data
  }
  const queryFindAllDiscountItems = () =>
    useQuery({
      queryKey: [_GET_ALL_DISCOUNT_FN],
      queryFn: async (): Promise<DiscountedItemDto[]> => await _fetchAllDiscountItems()
    })

  const _fetchAllDiscountItems = async (): Promise<DiscountedItemDto[]> => {
    const res = await api.api.dashboardControllerGetAllDiscountedItems()
    return res.data
  }
  return {
    getAllNewItems: queryFindAllNewItems,
    getAllDiscountItems: queryFindAllDiscountItems,
    getI18NPrefix: _I18N_PREFIX,
    responsiveOptions$: responsiveOptions,
    redirectToDetail: routableObjectStore.redirectToDetail
  }
})
