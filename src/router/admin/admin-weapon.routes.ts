import type { RouteRecordRaw } from 'vue-router'
import { WeaponEnum } from '@/enum/weapon.enum'
import { RouterEnum } from '@/enum/router.enum'

export const weaponRoutes: RouteRecordRaw = {
  path: 'weapon',
  children: [
    {
      path: `new/${WeaponEnum.RIFFLE}`,
      name: RouterEnum.RIFFLE_NEW,
      component: () => import('@/views/shared/FormView.vue')
    },
    {
      path: `new/${WeaponEnum.HAND_GUN}`,
      name: RouterEnum.HANDGUN_NEW,
      component: () => import('@/views/shared/FormView.vue')
    },
    {
      path: `list/${WeaponEnum.RIFFLE}/:category`,
      name: RouterEnum.RIFFLE_LIST,
      props: true,
      component: () => import('@/views/shared/TableWithPropsView.vue')
    },
    {
      path: `list/${WeaponEnum.HAND_GUN}/:category`,
      name: RouterEnum.HANDGUN_LIST,
      props: true,
      component: () => import('@/views/shared/TableWithPropsView.vue')
    },
    {
      path: `detail/${WeaponEnum.RIFFLE}/:id`,
      name: RouterEnum.ADMIN_RIFFLE_DETAIL,
      props: true,
      component: () => import('@/views/shared/AdminDetailView.vue')
    },
    {
      path: `detail/${WeaponEnum.HAND_GUN}/:id`,
      name: RouterEnum.ADMIN_HANDGUN_DETAIL,
      props: true,
      component: () => import('@/views/shared/AdminDetailView.vue')
    },
    {
      path: `edit/${WeaponEnum.RIFFLE}/:id`,
      name: RouterEnum.RIFFLE_EDIT,
      props: true,
      component: () => import('@/views/shared/FormView.vue')
    },
    {
      path: `edit/${WeaponEnum.HAND_GUN}/:id`,
      name: RouterEnum.HANDGUN_EDIT,
      props: true,
      component: () => import('@/views/shared/FormView.vue')
    }
  ]
}
