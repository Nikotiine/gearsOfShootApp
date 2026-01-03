import type { RouteRecordRaw } from 'vue-router'
import { AdminRouterEnum } from '@/enum/router/admin-router.enum'

export const colorRoutes: RouteRecordRaw = {
  path: 'color',
  children: [
    {
      path: 'new',
      name: AdminRouterEnum.COLOR_NEW,
      component: () => import('@/views/shared/FormView.vue')
    }
  ]
}

export const materialRoutes: RouteRecordRaw = {
  path: 'material',
  children: [
    {
      path: 'new',
      name: AdminRouterEnum.MATERIAL_NEW,
      component: () => import('@/views/shared/FormView.vue')
    }
  ]
}

export const headTypeRoutes: RouteRecordRaw = {
  path: 'headType',
  children: [
    {
      path: 'new',
      name: AdminRouterEnum.HEAD_TYPE_NEW,
      component: () => import('@/views/shared/FormView.vue')
    }
  ]
}

export const bodyTypeRoutes: RouteRecordRaw = {
  path: 'bodyType',
  children: [
    {
      path: 'new',
      name: AdminRouterEnum.BODY_TYPE_NEW,
      component: () => import('@/views/shared/FormView.vue')
    }
  ]
}

export const weaponTypeRoutes: RouteRecordRaw = {
  path: 'weaponType',
  children: [
    {
      path: 'new',
      name: AdminRouterEnum.WEAPON_TYPE_NEW,
      component: () => import('@/views/shared/FormView.vue')
    }
  ]
}

export const caliberRoutes: RouteRecordRaw = {
  path: 'caliber',
  children: [
    {
      path: 'new',
      name: AdminRouterEnum.CALIBER_NEW,
      component: () => import('@/views/shared/FormView.vue')
    }
  ]
}

export const threadedSizeRoutes: RouteRecordRaw = {
  path: 'threaded-size',
  children: [
    {
      path: 'new',
      name: AdminRouterEnum.THREADED_SIZE_NEW,
      component: () => import('@/views/shared/FormView.vue')
    }
  ]
}
