import type { RouteRecordRaw } from 'vue-router'
import { WeaponEnum } from '@/enum/weapon.enum'
import { AdminRouterEnum } from '@/enum/router/admin-router.enum'

export const weaponRoutes: RouteRecordRaw = {
  path: 'weapon',
  children: [
    {
      path: `new/${WeaponEnum.RIFFLE}`,
      name: AdminRouterEnum.RIFFLE_NEW,
      component: () => import('@/views/shared/FormView.vue')
    },
    {
      path: `new/${WeaponEnum.HAND_GUN}`,
      name: AdminRouterEnum.HANDGUN_NEW,
      component: () => import('@/views/shared/FormView.vue')
    },
    {
      path: `list/${WeaponEnum.RIFFLE}/:category`,
      name: AdminRouterEnum.RIFFLE_LIST,
      props: true,
      component: () => import('@/views/shared/TableWithPropsView.vue')
    },
    {
      path: `list/${WeaponEnum.HAND_GUN}/:category`,
      name: AdminRouterEnum.HANDGUN_LIST,
      props: true,
      component: () => import('@/views/shared/TableWithPropsView.vue')
    },
    {
      path: `detail/${WeaponEnum.RIFFLE}/:id`,
      name: AdminRouterEnum.ADMIN_RIFFLE_DETAIL,
      props: true,
      component: () => import('@/views/shared/AdminDetailView.vue')
    },
    {
      path: `detail/${WeaponEnum.HAND_GUN}/:id`,
      name: AdminRouterEnum.ADMIN_HANDGUN_DETAIL,
      props: true,
      component: () => import('@/views/shared/AdminDetailView.vue')
    },
    {
      path: `edit/${WeaponEnum.RIFFLE}/:id`,
      name: AdminRouterEnum.RIFFLE_EDIT,
      props: true,
      component: () => import('@/views/shared/FormView.vue')
    },
    {
      path: `edit/${WeaponEnum.HAND_GUN}/:id`,
      name: AdminRouterEnum.HANDGUN_EDIT,
      props: true,
      component: () => import('@/views/shared/FormView.vue')
    }
  ]
}
