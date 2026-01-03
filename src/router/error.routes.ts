import type { RouteRecordRaw } from 'vue-router'
import { RouterEnum } from '@/enum/router.enum'

export const errorRoutes: RouteRecordRaw = {
  path: '/error',
  children: [
    {
      path: '404',
      name: RouterEnum.NOTFOUND_404,
      component: () => import('@/views/error/ErrorNotFoundView.vue')
    },
    {
      path: '403',
      name: RouterEnum.UNAUTHORIZED,
      component: () => import('@/views/error/ErrorUnauthorizedView.vue')
    }
  ]
}
