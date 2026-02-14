import type { RouteRecordRaw } from 'vue-router'
import { PublicRouterEnum } from '@/enum/router/public-router.enum'
import { GlobalRouterEnum } from '@/enum/router/global-router.enum'
import { useBreadcrumbStore } from '@/stores/breadcrumb.store'
import { I18nPrefix } from '@/i18n/i18n-prefix.enum'
const parentPath: string = 'chargeur'
const prefix: string = I18nPrefix.WEAPON_MAGAZINE
const routeListName = PublicRouterEnum.PUBLIC_MAGAZINE_LIST
const routeDetailName = PublicRouterEnum.PUBLIC_MAGAZINE_DETAIL
export const publicMagazineRoute: RouteRecordRaw = {
  path: parentPath,
  children: [
    {
      path: `${GlobalRouterEnum.PATH_LIST}/:category`,
      name: routeListName,
      props: true,
      meta: {
        breadcrumb: (route: any) => {
          const store = useBreadcrumbStore()
          return [
            {
              label: store.createListLabelWithCategory(prefix, route.params.category),
              index: 1,
              to: {
                name: routeListName,
                params: {
                  category: route.params.category
                }
              }
            }
          ]
        }
      },
      component: () => import('@/views/weapon/magazine/MagazineDataView.vue')
    },
    {
      path: `${GlobalRouterEnum.PATH_DETAIL}/:category/:id`,
      name: routeDetailName,
      props: true,
      meta: {
        breadcrumb: (route: any) => {
          const store = useBreadcrumbStore()
          return [
            {
              label: store.createLabel(prefix, 'breadcrumbList'),
              index: 1,
              to: {
                name: routeListName,
                params: {
                  category: route.params.category
                }
              }
            },
            {
              label: store.createLabel(prefix),
              index: 2,
              to: {
                name: routeDetailName,
                params: {
                  id: route.params.id
                }
              }
            }
          ]
        }
      },
      component: () => import('@/views/weapon/magazine/MagazineDetailView.vue')
    }
  ]
}
