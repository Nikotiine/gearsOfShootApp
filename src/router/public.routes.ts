import type { RouteRecordRaw } from 'vue-router'
import { publicWeaponRoutes } from '@/router/public/public-weapon.route'

export const publicRoutes: RouteRecordRaw = {
  path: '/tir/sportif',
  meta: { admin: false },
  component: () => import('@/views/public/PublicLayout.vue'),
  children: [publicWeaponRoutes]
}
