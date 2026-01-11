import type { RouteRecordRaw } from 'vue-router'
import { AdminRouterEnum } from '@/enum/router/admin-router.enum'

export const ammunitionRoutes: RouteRecordRaw = {
  path: 'ammunition',
  children: [
    {
      path: 'new',
      name: AdminRouterEnum.AMMUNITION_NEW,
      component: () => import('@/views/shared/FormView.vue')
    },
    {
      path: 'list/:category',
      name: AdminRouterEnum.AMMUNITION_LIST,
      props: true,
      component: () => import('@/views/shared/TableWithPropsView.vue')
    },
    {
      path: 'detail/:id',
      name: AdminRouterEnum.AMMUNITION_DETAIL,
      props: true,
      component: () => import('@/views/shared/AdminDetailView.vue')
    },
    {
      path: 'edit/:id',
      name: AdminRouterEnum.AMMUNITION_EDIT,
      props: true,
      component: () => import('@/views/shared/FormView.vue')
    }
  ]
}
