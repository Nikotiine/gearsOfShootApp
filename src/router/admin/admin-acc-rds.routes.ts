import type { RouteRecordRaw } from 'vue-router'
import { RouterEnum } from '@/enum/router.enum'

export const rdsRoutes: RouteRecordRaw = {
  path: 'rds',
  children: [
    {
      path: 'new',
      name: RouterEnum.RDS_NEW,
      component: () => import('@/views/shared/FormView.vue')
    },
    {
      path: 'list',
      name: RouterEnum.RDS_LIST,
      component: () => import('@/views/shared/TableView.vue')
    },
    {
      path: 'detail/:id',
      name: RouterEnum.RDS_DETAIL,
      props: true,
      component: () => import('@/views/shared/AdminDetailView.vue')
    },
    {
      path: 'edit/:id',
      name: RouterEnum.RDS_EDIT,
      props: true,
      component: () => import('@/views/shared/FormView.vue')
    }
  ]
}
