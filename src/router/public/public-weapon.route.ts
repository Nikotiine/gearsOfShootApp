import type { RouteRecordRaw } from 'vue-router'
import { WeaponEnum } from '@/enum/weapon.enum'
import { PublicRouterEnum } from '@/enum/router/public-router.enum'

export const publicWeaponRoutes: RouteRecordRaw = {
  path: 'weapon',
  children: [
    {
      path: `list/${WeaponEnum.RIFFLE}/:category`,
      name: PublicRouterEnum.PUBLIC_RIFFLE_LIST,
      props: true,
      component: () => import('@/views/shared/TableWithPropsView.vue')
    },
    {
      path: `list/${WeaponEnum.HAND_GUN}/:category`,
      name: PublicRouterEnum.PUBLIC_HANDGUN_LIST,
      props: true,
      component: () => import('@/views/shared/TableWithPropsView.vue')
    },
    {
      path: `detail/${WeaponEnum.RIFFLE}/:id`,
      name: PublicRouterEnum.PUBLIC_RIFFLE_DETAIL,
      props: true,
      component: () => import('@/views/public/PublicDetailView.vue')
    },
    {
      path: `detail/${WeaponEnum.HAND_GUN}/:id`,
      name: PublicRouterEnum.PUBLIC_HANDGUN_DETAIL,
      props: true,
      component: () => import('@/views/public/PublicDetailView.vue')
    }
  ]
}
