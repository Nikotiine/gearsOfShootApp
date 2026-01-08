import type { RouteRecordRaw } from 'vue-router'
import { GlobalRouterEnum } from '@/enum/router/global-router.enum'
import { PublicRouterEnum } from '@/enum/router/public-router.enum'
import { useBreadcrumbStore } from '@/stores/breadcrumb.store'

const parentPath: string = 'optiques'
const optic: string = 'optic'
export const publicOpticRoute: RouteRecordRaw = {
  path: parentPath,
  children: [
    {
      path: GlobalRouterEnum.PATH_LIST,
      name: PublicRouterEnum.PUBLIC_OPTIC_LIST,
      props: true,
      meta: {
        breadcrumb: () => {
          const store = useBreadcrumbStore()
          return [
            {
              label: store.createLabel(optic, 'breadcrumbList'),
              index: 1,
              to: {
                name: PublicRouterEnum.PUBLIC_OPTIC_LIST
              }
            }
          ]
        }
      },
      component: () => import('@/views/optic/OpticTableView.vue')
    },
    {
      path: `${GlobalRouterEnum.PATH_DETAIL}/:id`,
      name: PublicRouterEnum.PUBLIC_OPTIC_DETAIL,
      props: true,
      meta: {
        breadcrumb: (route: any) => {
          const store = useBreadcrumbStore()
          return [
            {
              label: store.createLabel(optic, 'breadcrumbList'),
              index: 1,
              to: {
                name: PublicRouterEnum.PUBLIC_OPTIC_LIST
              }
            },
            {
              label: store.createLabel(optic),
              index: 2,
              to: {
                name: PublicRouterEnum.PUBLIC_OPTIC_DETAIL,
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
