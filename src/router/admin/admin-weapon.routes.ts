import type { RouteRecordRaw } from 'vue-router'
import { WeaponEnum } from '@/enum/weapon.enum'
import { AdminRouterEnum } from '@/enum/router/admin-router.enum'
import { useBreadcrumbStore } from '@/stores/breadcrumb.store'
import { GlobalRouterEnum } from '@/enum/router/global-router.enum'

const prefixRiffle: string = 'riffle'
const prefixHandgun: string = 'handgun'
const parentPath: string = 'armes'
const routeRiffleFormName = AdminRouterEnum.RIFFLE_NEW
const routeRiffleEditName = AdminRouterEnum.RIFFLE_EDIT
const routeRHandgunFormName = AdminRouterEnum.HANDGUN_NEW
const routeRHandgunEditName = AdminRouterEnum.HANDGUN_EDIT
const routeRiffleListName = AdminRouterEnum.RIFFLE_LIST
const routeHandgunListName = AdminRouterEnum.HANDGUN_LIST
const routeRiffleDetailName = AdminRouterEnum.ADMIN_RIFFLE_DETAIL
const routeHandgunDetailName = AdminRouterEnum.ADMIN_HANDGUN_DETAIL
export const weaponRoutes: RouteRecordRaw = {
  path: parentPath,
  children: [
    {
      path: `${GlobalRouterEnum.PATH_NEW_PRODUCT}/${WeaponEnum.RIFFLE}`,
      name: routeRiffleFormName,
      meta: {
        breadcrumb: () => {
          const store = useBreadcrumbStore()
          return [
            {
              label: store.createLabel(prefixRiffle, 'breadcrumbAdd'),
              index: 1,
              to: {
                name: routeRiffleFormName
              }
            }
          ]
        }
      },
      component: () => import('@/views/weapon/riffle/RiffleFormView.vue')
    },
    {
      path: `${GlobalRouterEnum.PATH_NEW_PRODUCT}/${WeaponEnum.HAND_GUN}`,
      name: routeRHandgunFormName,
      meta: {
        breadcrumb: () => {
          const store = useBreadcrumbStore()
          return [
            {
              label: store.createLabel(prefixHandgun, 'breadcrumbAdd'),
              index: 1,
              to: {
                name: routeRHandgunFormName
              }
            }
          ]
        }
      },
      component: () => import('@/views/weapon/handgun/HandGunFormView.vue')
    },
    {
      path: `${GlobalRouterEnum.PATH_LIST}/${WeaponEnum.RIFFLE}/:category`,
      name: AdminRouterEnum.RIFFLE_LIST,
      props: true,
      meta: {
        breadcrumb: (route: any) => {
          const store = useBreadcrumbStore()
          return [
            {
              label: store.createListLabelWithCategory(prefixRiffle, route.params.category),
              index: 1,
              to: {
                name: routeRiffleListName,
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
      path: `${GlobalRouterEnum.PATH_LIST}/${WeaponEnum.HAND_GUN}/:category`,
      name: AdminRouterEnum.HANDGUN_LIST,
      props: true,
      meta: {
        breadcrumb: (route: any) => {
          const store = useBreadcrumbStore()
          return [
            {
              label: store.createListLabelWithCategory(prefixHandgun, route.params.category),
              index: 1,
              to: {
                name: routeHandgunListName,
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
      path: `${GlobalRouterEnum.PATH_DETAIL}/${WeaponEnum.RIFFLE}/:category/:id`,
      name: AdminRouterEnum.ADMIN_RIFFLE_DETAIL,
      props: true,
      meta: {
        breadcrumb: (route: any) => {
          const store = useBreadcrumbStore()
          return [
            {
              label: store.createListLabelWithCategory(prefixRiffle, route.params.category),
              index: 1,
              to: {
                name: routeRiffleListName,
                params: {
                  category: route.params.category
                }
              }
            },
            {
              label: store.createLabel(prefixRiffle),
              index: 2,
              to: {
                name: routeRiffleDetailName,
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
      path: `${GlobalRouterEnum.PATH_DETAIL}/${WeaponEnum.HAND_GUN}/:category/:id`,
      name: AdminRouterEnum.ADMIN_HANDGUN_DETAIL,
      props: true,
      meta: {
        breadcrumb: (route: any) => {
          const store = useBreadcrumbStore()
          return [
            {
              label: store.createListLabelWithCategory(prefixHandgun, route.params.category),
              index: 1,
              to: {
                name: routeHandgunListName,
                params: {
                  category: route.params.category
                }
              }
            },
            {
              label: store.createLabel(prefixHandgun),
              index: 2,
              to: {
                name: routeHandgunDetailName,
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
      path: `${GlobalRouterEnum.PATH_EDIT_PRODUCT}/${WeaponEnum.RIFFLE}/:category/:id`,
      name: routeRiffleEditName,
      props: true,
      meta: {
        breadcrumb: (route: any) => {
          const store = useBreadcrumbStore()
          return [
            {
              label: store.createListLabelWithCategory(prefixRiffle, route.params.category),
              index: 1,
              to: {
                name: routeRiffleListName,
                params: {
                  category: route.params.category
                }
              }
            },
            {
              label: store.createLabel(prefixRiffle),
              index: 2,
              to: {
                name: routeRiffleDetailName,
                params: {
                  category: route.params.category,
                  id: route.params.id
                }
              }
            },
            {
              label: store.createLabel(prefixRiffle, 'breadcrumbEdit'),
              index: 3,
              to: {
                name: routeRiffleEditName,
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
    },
    {
      path: `${GlobalRouterEnum.PATH_EDIT_PRODUCT}/${WeaponEnum.HAND_GUN}/:category/:id`,
      name: routeRHandgunEditName,
      props: true,
      meta: {
        breadcrumb: (route: any) => {
          const store = useBreadcrumbStore()
          return [
            {
              label: store.createListLabelWithCategory(prefixHandgun, route.params.category),
              index: 1,
              to: {
                name: routeHandgunListName,
                params: {
                  category: route.params.category
                }
              }
            },
            {
              label: store.createLabel(prefixHandgun),
              index: 2,
              to: {
                name: routeHandgunDetailName,
                params: {
                  category: route.params.category,
                  id: route.params.id
                }
              }
            },
            {
              label: store.createLabel(prefixHandgun, 'breadcrumbEdit'),
              index: 3,
              to: {
                name: routeRHandgunEditName,
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
