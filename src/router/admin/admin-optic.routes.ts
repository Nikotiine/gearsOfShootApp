import type { RouteRecordRaw } from 'vue-router'
import { AdminRouterEnum } from '@/enum/router/admin-router.enum'

export const opticRoutes: RouteRecordRaw = {
  path: 'optic',
  children: [
    {
      path: 'new',
      name: AdminRouterEnum.OPTIC_NEW,
      component: () => import('@/views/shared/FormView.vue')
    },
    {
      path: 'list',
      name: AdminRouterEnum.OPTIC_LIST,
      component: () => import('@/views/shared/TableView.vue')
    },
    {
      path: 'detail/:id',
      name: AdminRouterEnum.OPTIC_DETAIL,
      props: true,
      component: () => import('@/views/shared/AdminDetailView.vue')
    },
    {
      path: 'edit/:id',
      name: AdminRouterEnum.OPTIC_EDIT,
      props: true,
      component: () => import('@/views/shared/FormView.vue')
    }
  ]
}
