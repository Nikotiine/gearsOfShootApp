import { defineStore } from 'pinia'
import { useApiStore } from '@/stores/api'
import { useQuery } from '@tanstack/vue-query'
import type { DiscountedItemDto, NewItemsDto } from '@/api/Api'
import { getI18NPrefix } from '@/enum/I18NSuffix.enum'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { AdminRouterEnum } from '@/enum/router/admin-router.enum'
import type { RoutableObjectType } from '@/types/routable.type'

export const usePublicDashboardStore = defineStore('public-dashboard', () => {
  const { api } = useApiStore()
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
  const router = useRouter()
  const routerMap: Record<RoutableObjectType, AdminRouterEnum> = {
    ammunition: AdminRouterEnum.AMMUNITION_DETAIL,
    riffle: AdminRouterEnum.ADMIN_RIFFLE_DETAIL,
    handgun: AdminRouterEnum.ADMIN_HANDGUN_DETAIL,
    optic: AdminRouterEnum.OPTIC_DETAIL,
    magazine: AdminRouterEnum.MAGAZINE_DETAIL,
    rds: AdminRouterEnum.RDS_DETAIL
  }
  /**
   * Redirige vers la page détail selon le type et l'id de l'objet.
   *
   * @param type - Type de l'objet (optic, riffle, etc.)
   * @param id - Identifiant de l'objet
   */
  function redirectToDetail(type: RoutableObjectType, id: number): void {
    const routeName = routerMap[type]

    if (!routeName) {
      console.warn(`[Navigation] Route inconnue pour le type: ${type}`)
      return
    }

    router.push({
      name: routeName,
      params: { id }
    })
  }
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
    redirectToDetail: redirectToDetail
  }
})
