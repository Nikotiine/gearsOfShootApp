import type { RouteRecordRaw } from 'vue-router'
import { WeaponEnum } from '@/enum/weapon.enum'
import { PublicRouterEnum } from '@/enum/router/public-router.enum'
import { useBreadcrumbStore } from '@/stores/breadcrumb.store'
import { GlobalRouterEnum } from '@/enum/router/global-router.enum'

const parentPath: string = 'armes'
const prefixRiffle: string = 'riffle'
const prefixHandgun: string = 'handgun'
const routeRiffleListName = PublicRouterEnum.PUBLIC_RIFFLE_LIST
const routeRiffleDetailName = PublicRouterEnum.PUBLIC_RIFFLE_DETAIL
const routeHandgunListName = PublicRouterEnum.PUBLIC_HANDGUN_LIST
const routeHandgunDetailName = PublicRouterEnum.PUBLIC_HANDGUN_DETAIL
export const publicWeaponRoutes: RouteRecordRaw = {
  path: parentPath,
  children: [
    {
      path: `${GlobalRouterEnum.PATH_LIST}/${WeaponEnum.RIFFLE}/:category`,
      name: routeRiffleListName,
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
      component: () => import('@/views/weapon/riffle/RiffleDataView.vue')
    },
    {
      path: `${GlobalRouterEnum.PATH_LIST}/${WeaponEnum.HAND_GUN}/:category`,
      name: routeHandgunListName,
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
      component: () => import('@/views/weapon/handgun/HandGunDataView.vue')
    },
    {
      path: `${GlobalRouterEnum.PATH_DETAIL}/${WeaponEnum.RIFFLE}/:category/:id`,
      name: routeRiffleDetailName,
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
      name: routeHandgunDetailName,
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
    }
  ]
}
