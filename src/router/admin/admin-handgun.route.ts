import type { RouteRecordRaw } from 'vue-router'
import { AdminRouterEnum } from '@/enum/router/admin-router.enum'
import { GlobalRouterEnum } from '@/enum/router/global-router.enum'
import { WeaponEnum } from '@/enum/weapon.enum'
import { useBreadcrumbStore } from '@/stores/breadcrumb.store'
const prefix: string = 'handgun'
const parentPath: string = 'armes-de-poing'
const routeFormName = AdminRouterEnum.HANDGUN_NEW
const routeListName = AdminRouterEnum.HANDGUN_LIST
const routeDetailName = AdminRouterEnum.ADMIN_HANDGUN_DETAIL
const routeEditName = AdminRouterEnum.HANDGUN_EDIT
export const adminHandgunRoutes: RouteRecordRaw = {
  path: parentPath,
  children: [
    {
      path: `${GlobalRouterEnum.PATH_NEW_PRODUCT}/${WeaponEnum.HAND_GUN}`,
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
      component: () => import('@/views/weapon/handgun/HandGunFormView.vue')
    },
    {
      path: `${GlobalRouterEnum.PATH_LIST}/${WeaponEnum.HAND_GUN}/:category`,
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
      component: () => import('@/views/weapon/handgun/HandGunTableView.vue')
    },
    {
      path: `${GlobalRouterEnum.PATH_DETAIL}/${WeaponEnum.HAND_GUN}/:category/:id`,
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
      component: () => import('@/views/weapon/handgun/HandGunDetailView.vue')
    },
    {
      path: `${GlobalRouterEnum.PATH_EDIT_PRODUCT}/${WeaponEnum.HAND_GUN}/:category/:id`,
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
      component: () => import('@/views/weapon/handgun/HandGunFormView.vue')
    }
  ]
}
