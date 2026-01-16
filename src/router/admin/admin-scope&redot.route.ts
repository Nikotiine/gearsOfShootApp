import type { RouteRecordRaw } from 'vue-router'
import { GlobalRouterEnum } from '@/enum/router/global-router.enum'
import { useBreadcrumbStore } from '@/stores/breadcrumb.store'
import { AdminRouterEnum } from '@/enum/router/admin-router.enum'
const parentPath: string = 'lunette&point-rouge'
const prefix: string = 'optic'
const routeListName = AdminRouterEnum.OPTIC_LIST
const routeDetailName = AdminRouterEnum.OPTIC_DETAIL
const routeFormName = AdminRouterEnum.OPTIC_NEW
const routeEditName = AdminRouterEnum.OPTIC_EDIT
export const adminScopeRedotRoute: RouteRecordRaw = {
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
      component: () => import('@/views/optic/OpticFormView.vue')
    },
    {
      path: GlobalRouterEnum.PATH_LIST,
      name: routeListName,
      meta: {
        breadcrumb: () => {
          const store = useBreadcrumbStore()
          return [
            {
              label: store.createLabel(prefix, 'list'),
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
              label: store.createLabel(prefix, 'list'),
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
              label: store.createLabel(prefix, 'list'),
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
              label: store.createLabel(prefix, 'edit'),
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
      component: () => import('@/views/optic/OpticFormView.vue')
    }
  ]
}
