import type { RouteRecordRaw } from 'vue-router'
import { GlobalRouterEnum } from '@/enum/router/global-router.enum'
import { WeaponEnum } from '@/enum/weapon.enum'
import { useBreadcrumbStore } from '@/stores/breadcrumb.store'
import { AdminRouterEnum } from '@/enum/router/admin-router.enum'
const prefix: string = 'riffle'
const parentPath: string = 'armes-longue'
const routeFormName = AdminRouterEnum.RIFFLE_NEW
const routeListName = AdminRouterEnum.RIFFLE_LIST
const routeDetailName = AdminRouterEnum.ADMIN_RIFFLE_DETAIL
const routeEditName = AdminRouterEnum.RIFFLE_EDIT

export const adminRiffleRoute: RouteRecordRaw = {
  path: parentPath,
  children: [
    {
      path: `${GlobalRouterEnum.PATH_NEW_PRODUCT}/${WeaponEnum.RIFFLE}`,
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
      component: () => import('@/views/weapon/riffle/RiffleFormView.vue')
    },
    {
      path: `${GlobalRouterEnum.PATH_LIST}/${WeaponEnum.RIFFLE}/:category`,
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
      component: () => import('@/views/weapon/riffle/RiffleTableView.vue')
    },
    {
      path: `${GlobalRouterEnum.PATH_DETAIL}/${WeaponEnum.RIFFLE}/:category/:id`,
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
      component: () => import('@/views/weapon/riffle/RiffleDetailView.vue')
    },
    {
      path: `${GlobalRouterEnum.PATH_EDIT_PRODUCT}/${WeaponEnum.RIFFLE}/:category/:id`,
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
      component: () => import('@/views/weapon/riffle/RiffleFormView.vue')
    }
  ]
}
