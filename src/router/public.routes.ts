import type { RouteRecordRaw } from 'vue-router'
import { publicWeaponRoutes } from '@/router/public/public-weapon.route'
import { publicOpticRoute } from '@/router/public/public-optic.route'

export const publicRoutes: RouteRecordRaw = {
  path: '/tir-sportif',
  meta: { admin: false },
  component: () => import('@/views/public/PublicLayout.vue'),
  children: [publicWeaponRoutes, publicOpticRoute]
}
