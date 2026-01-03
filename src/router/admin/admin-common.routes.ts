import type { RouteRecordRaw } from 'vue-router'
import { RouterEnum } from '@/enum/router.enum'

export const colorRoutes: RouteRecordRaw = {
  path: 'color',
  children: [
    {
      path: 'new',
      name: RouterEnum.COLOR_NEW,
      component: () => import('@/views/shared/FormView.vue')
    }
  ]
}

export const materialRoutes: RouteRecordRaw = {
  path: 'material',
  children: [
    {
      path: 'new',
      name: RouterEnum.MATERIAL_NEW,
      component: () => import('@/views/shared/FormView.vue')
    }
  ]
}

export const headTypeRoutes: RouteRecordRaw = {
  path: 'headType',
  children: [
    {
      path: 'new',
      name: RouterEnum.HEAD_TYPE_NEW,
      component: () => import('@/views/shared/FormView.vue')
    }
  ]
}

export const bodyTypeRoutes: RouteRecordRaw = {
  path: 'bodyType',
  children: [
    {
      path: 'new',
      name: RouterEnum.BODY_TYPE_NEW,
      component: () => import('@/views/shared/FormView.vue')
    }
  ]
}

export const weaponTypeRoutes: RouteRecordRaw = {
  path: 'weaponType',
  children: [
    {
      path: 'new',
      name: RouterEnum.WEAPON_TYPE_NEW,
      component: () => import('@/views/shared/FormView.vue')
    }
  ]
}

export const caliberRoutes: RouteRecordRaw = {
  path: 'caliber',
  children: [
    {
      path: 'new',
      name: RouterEnum.CALIBER_NEW,
      component: () => import('@/views/shared/FormView.vue')
    }
  ]
}

export const threadedSizeRoutes: RouteRecordRaw = {
  path: 'threaded-size',
  children: [
    {
      path: 'new',
      name: RouterEnum.THREADED_SIZE_NEW,
      component: () => import('@/views/shared/FormView.vue')
    }
  ]
}
