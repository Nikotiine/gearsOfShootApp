import type { RouteRecordRaw } from 'vue-router'
import { AdminRouterEnum } from '@/enum/router/admin-router.enum'
import { useBreadcrumbStore } from '@/stores/breadcrumb.store'
import { GlobalRouterEnum } from '@/enum/router/global-router.enum'
const parentPath: string = 'marques'
const prefix: string = 'factory'
const routeFormName = AdminRouterEnum.FACTORY_NEW
const routeListName = AdminRouterEnum.FACTORY_LIST
const routeEditName = AdminRouterEnum.FACTORY_EDIT
export const factoryRoutes: RouteRecordRaw = {
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
      component: () => import('@/views/factory/FactoryFormView.vue')
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
      component: () => import('@/views/factory/FactoriesTableView.vue')
    },
    {
      path: `${GlobalRouterEnum.PATH_EDIT_PRODUCT}/:id`,
      props: true,
      name: routeEditName,
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
              label: store.createLabel(prefix, 'breadcrumbEdit'),
              index: 2,
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
      component: () => import('@/views/factory/FactoryFormView.vue')
    }
  ]
}
