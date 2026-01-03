import type { RouteRecordRaw } from 'vue-router'
import { AdminRouterEnum } from '@/enum/router/admin-router.enum'

export const errorRoutes: RouteRecordRaw = {
  path: '/error',
  children: [
    {
      path: '404',
      name: AdminRouterEnum.NOTFOUND_404,
      component: () => import('@/views/error/ErrorNotFoundView.vue')
    },
    {
      path: '403',
      name: AdminRouterEnum.UNAUTHORIZED,
      component: () => import('@/views/error/ErrorUnauthorizedView.vue')
    }
  ]
}
