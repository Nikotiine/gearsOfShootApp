import type { RouteRecordRaw } from 'vue-router'
import { AdminRouterEnum } from '@/enum/router/admin-router.enum'
import { GlobalRouterEnum } from '@/enum/router/global-router.enum'
import { useBreadcrumbStore } from '@/stores/breadcrumb.store'
const prefix: string = 'soundNoiseReducer'
const parentPath: string = 'reducteur-de-son'
const routeFormName = AdminRouterEnum.RDS_NEW
const routeListName = AdminRouterEnum.RDS_LIST
const routeDetailName = AdminRouterEnum.RDS_DETAIL
const routeEditName = AdminRouterEnum.RDS_EDIT
export const rdsRoutes: RouteRecordRaw = {
  path: parentPath,
  children: [
    {
      path: GlobalRouterEnum.PATH_NEW_PRODUCT,
      name: routeFormName,
      meta: {
        breadcrumb: () => {
          const store = useBreadcrumbStore()
          return [
            {
              label: store.createLabel(prefix, 'breadcrumbAdd'),
              index: 1,
              to: {
                name: routeFormName
              }
            }
          ]
        }
      },
      component: () => import('@/views/accessory/rds/SoundReducerFormView.vue')
    },
    {
      path: GlobalRouterEnum.PATH_LIST,
      name: routeListName,
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
    },
    {
      path: `${GlobalRouterEnum.PATH_EDIT_PRODUCT}/:id`,
      name: routeEditName,
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
            },
            {
              label: store.createLabel(prefix, 'breadcrumbEdit'),
              index: 3,
              to: {
                name: routeEditName,
                params: {
                  id: route.params.id
                }
              }
            }
          ]
        }
      },
      component: () => import('@/views/accessory/rds/SoundReducerFormView.vue')
    }
  ]
}
