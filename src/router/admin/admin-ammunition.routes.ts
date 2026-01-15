import type { RouteRecordRaw } from 'vue-router'
import { AdminRouterEnum } from '@/enum/router/admin-router.enum'
import { GlobalRouterEnum } from '@/enum/router/global-router.enum'
import { useBreadcrumbStore } from '@/stores/breadcrumb.store'
const parentPath: string = 'munition'
const prefix: string = 'ammunition'
const routeFormName = AdminRouterEnum.AMMUNITION_NEW
const routeListName = AdminRouterEnum.AMMUNITION_LIST
const routeDetailName = AdminRouterEnum.AMMUNITION_DETAIL
const routeEditName = AdminRouterEnum.AMMUNITION_EDIT
export const ammunitionRoutes: RouteRecordRaw = {
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
      component: () => import('@/views/ammunition/AmmunitionFormView.vue')
    },
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
      component: () => import('@/views/ammunition/AmmunitionTableView.vue')
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
              label: store.createListLabelWithCategory(prefix, route.params.category),
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
                  category: route.params.category,
                  id: route.params.id
                }
              }
            }
          ]
        }
      },
      component: () => import('@/views/ammunition/AmmunitionDetailView.vue')
    },
    {
      path: `${GlobalRouterEnum.PATH_EDIT_PRODUCT}/:category/:id`,
      name: routeEditName,
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
            },
            {
              label: store.createLabel(prefix),
              index: 2,
              to: {
                name: routeDetailName,
                params: {
                  category: route.params.category,
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
                  category: route.params.category,
                  id: route.params.id
                }
              }
            }
          ]
        }
      },
      component: () => import('@/views/ammunition/AmmunitionFormView.vue')
    }
  ]
}
