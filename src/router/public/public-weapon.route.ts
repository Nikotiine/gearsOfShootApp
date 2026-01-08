import type { RouteRecordRaw } from 'vue-router'
import { WeaponEnum } from '@/enum/weapon.enum'
import { PublicRouterEnum } from '@/enum/router/public-router.enum'
import { useBreadcrumbStore } from '@/stores/breadcrumb.store'
import { GlobalRouterEnum } from '@/enum/router/global-router.enum'

const parentPath: string = 'armes'
const riffle: string = 'riffle'
const handgun: string = 'handgun'
export const publicWeaponRoutes: RouteRecordRaw = {
  path: parentPath,
  children: [
    {
      path: `${GlobalRouterEnum.PATH_LIST}/${WeaponEnum.RIFFLE}/:category`,
      name: PublicRouterEnum.PUBLIC_RIFFLE_LIST,
      props: true,
      meta: {
        breadcrumb: (route: any) => {
          const store = useBreadcrumbStore()
          return [
            {
              label: store.createListLabelWithCategory(riffle, route.params.category),
              index: 1,
              to: {
                name: PublicRouterEnum.PUBLIC_RIFFLE_LIST,
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
      name: PublicRouterEnum.PUBLIC_HANDGUN_LIST,
      props: true,
      meta: {
        breadcrumb: (route: any) => {
          const store = useBreadcrumbStore()
          return [
            {
              label: store.createListLabelWithCategory(handgun, route.params.category),
              index: 1,
              to: {
                name: PublicRouterEnum.PUBLIC_HANDGUN_LIST,
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
      name: PublicRouterEnum.PUBLIC_RIFFLE_DETAIL,
      props: true,
      meta: {
        breadcrumb: (route: any) => {
          const store = useBreadcrumbStore()
          return [
            {
              label: store.createListLabelWithCategory(riffle, route.params.category),
              index: 1,
              to: {
                name: PublicRouterEnum.PUBLIC_RIFFLE_LIST,
                params: {
                  category: route.params.category
                }
              }
            },
            {
              label: store.createLabel(riffle),
              index: 2,
              to: {
                name: PublicRouterEnum.PUBLIC_RIFFLE_DETAIL,
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
      name: PublicRouterEnum.PUBLIC_HANDGUN_DETAIL,
      props: true,
      meta: {
        breadcrumb: (route: any) => {
          const store = useBreadcrumbStore()
          return [
            {
              label: store.createListLabelWithCategory(handgun, route.params.category),
              index: 1,
              to: {
                name: PublicRouterEnum.PUBLIC_HANDGUN_LIST,
                params: {
                  category: route.params.category
                }
              }
            },
            {
              label: store.createLabel(handgun),
              index: 2,
              to: {
                name: PublicRouterEnum.PUBLIC_HANDGUN_DETAIL,
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
