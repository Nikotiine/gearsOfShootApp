import { type RouteRecordRaw } from 'vue-router'
import { PublicRouterEnum } from '@/enum/router/public-router.enum'
import { GlobalRouterEnum } from '@/enum/router/global-router.enum'
import { useBreadcrumbStore } from '@/stores/breadcrumb.store'

const parentPath: string = 'accessoire-armes/rds'
const prefix: string = 'rds'
const routeListName = PublicRouterEnum.PUBLIC_RDS_LIST
const routeDetailName = PublicRouterEnum.PUBLIC_RDS_DETAIL
export const publicRdsRoute: RouteRecordRaw = {
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
      component: () => import('@/views/accessory/rds/SoundReducerTableView.vue')
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
      component: () => import('@/views/accessory/rds/SoundReducerDetailView.vue')
    }
  ]
}
