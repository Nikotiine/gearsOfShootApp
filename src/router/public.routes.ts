import type { RouteRecordRaw } from 'vue-router'

export const publicRoutes: RouteRecordRaw = {
  path: '/tir/sportif',
  meta: { admin: false },
  component: () => import('@/views/public/PublicLayout.vue')
}
