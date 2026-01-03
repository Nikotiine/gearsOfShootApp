import type { RouteRecordRaw } from 'vue-router'
import { AdminRouterEnum } from '@/enum/router/admin-router.enum'

export const magazineRoutes: RouteRecordRaw = {
  path: 'magazine',
  children: [
    {
      path: 'new',
      name: AdminRouterEnum.MAGAZINE_NEW,
      component: () => import('@/views/shared/FormView.vue')
    },
    {
      path: 'list/:category',
      name: AdminRouterEnum.MAGAZINE_LIST,
      props: true,
      component: () => import('@/views/shared/TableWithPropsView.vue')
    },
    {
      path: 'detail/:id',
      name: AdminRouterEnum.MAGAZINE_DETAIL,
      props: true,
      component: () => import('@/views/shared/AdminDetailView.vue')
    },
    {
      path: 'edit/:id',
      name: AdminRouterEnum.MAGAZINE_EDIT,
      props: true,
      component: () => import('@/views/shared/FormView.vue')
    }
  ]
}
