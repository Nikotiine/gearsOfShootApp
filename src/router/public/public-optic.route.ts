import type { RouteRecordRaw } from 'vue-router'
import { GlobalRouterEnum } from '@/enum/router/global-router.enum'
import { PublicRouterEnum } from '@/enum/router/public-router.enum'
import { useBreadcrumbStore } from '@/stores/breadcrumb.store'

const parentPath: string = 'optiques'
const prefix: string = 'optic'
const routeListName = PublicRouterEnum.PUBLIC_OPTIC_LIST
const routeDetailName = PublicRouterEnum.PUBLIC_OPTIC_DETAIL
export const publicOpticRoute: RouteRecordRaw = {
  path: parentPath,
  children: [
    {
      path: GlobalRouterEnum.PATH_LIST,
      name: routeListName,
      props: true,
      meta: {
        breadcrumb: () => {
          const store = useBreadcrumbStore()
          return [
            {
              label: store.createLabel(prefix, 'breadcrumbList'),
              index: 1,
              to: {
                name: routeListName
              }
            }
          ]
        }
      },
      component: () => import('@/views/optic/OpticTableView.vue')
    },
    {
      path: `${GlobalRouterEnum.PATH_DETAIL}/:id`,
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
                name: routeListName
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
      component: () => import('@/views/optic/OpticDetailView.vue')
    }
  ]
}
