import type { RouteRecordRaw } from 'vue-router'
import { AdminRouterEnum } from '@/enum/router/admin-router.enum'

export const invoiceRoutes: RouteRecordRaw = {
  path: 'invoice',
  children: [
    {
      path: 'new',
      name: AdminRouterEnum.INVOICE_NEW,
      component: () => import('@/views/shared/FormView.vue')
    },
    {
      path: 'list',
      name: AdminRouterEnum.INVOICE_LIST,
      component: () => import('@/views/shared/TableView.vue')
    },
    {
      path: 'detail/:id',
      name: AdminRouterEnum.INVOICE_DETAIL,
      props: true,
      component: () => import('@/views/shared/AdminDetailView.vue')
    }
  ]
}
