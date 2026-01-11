import type { RouteRecordRaw } from 'vue-router'
import { AdminRouterEnum } from '@/enum/router/admin-router.enum'

export const rdsRoutes: RouteRecordRaw = {
  path: 'rds',
  children: [
    {
      path: 'new',
      name: AdminRouterEnum.RDS_NEW,
      component: () => import('@/views/shared/FormView.vue')
    },
    {
      path: 'list',
      name: AdminRouterEnum.RDS_LIST,
      component: () => import('@/views/shared/TableView.vue')
    },
    {
      path: 'detail/:id',
      name: AdminRouterEnum.RDS_DETAIL,
      props: true,
      component: () => import('@/views/shared/AdminDetailView.vue')
    },
    {
      path: 'edit/:id',
      name: AdminRouterEnum.RDS_EDIT,
      props: true,
      component: () => import('@/views/shared/FormView.vue')
    }
  ]
}
