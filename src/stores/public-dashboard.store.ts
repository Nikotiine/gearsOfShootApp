import { defineStore } from 'pinia'
import { useApiStore } from '@/stores/api'
import { useQuery } from '@tanstack/vue-query'
import type { DiscountedItemDto, LegislationCategoryDto, NewItemsDto } from '@/api/Api'
import { getI18NPrefix } from '@/enum/I18NSuffix.enum'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import type { RoutableObjectType } from '@/types/routable.type'
import { PublicRouterEnum } from '@/enum/router/public-router.enum'
import { getRoutableMap } from '@/shared/utils/routable-object.utils'
import { useRoutableObjectStore } from '@/stores/shared/routable-object.store'

export const usePublicDashboardStore = defineStore('public-dashboard', () => {
  const { api } = useApiStore()
  const routableObjectStore = useRoutableObjectStore()
  const _GET_ALL_NEW_FN = 'getAllNewItems'
  const _GET_ALL_DISCOUNT_FN = 'getAllNDiscountItems'
  const _I18N_PREFIX = 'publicDashboard'
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
    getI18NPrefix: getI18NPrefix(_I18N_PREFIX),
    responsiveOptions$: responsiveOptions,
    redirectToDetail: routableObjectStore.redirectToDetail
  }
})
