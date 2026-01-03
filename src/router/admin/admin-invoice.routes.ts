import type { RouteRecordRaw } from 'vue-router'
import { RouterEnum } from '@/enum/router.enum'

export const invoiceRoutes: RouteRecordRaw = {
  path: 'invoice',
  children: [
    {
      path: 'new',
      name: RouterEnum.INVOICE_NEW,
      component: () => import('@/views/shared/FormView.vue')
    },
    {
      path: 'list',
      name: RouterEnum.INVOICE_LIST,
      component: () => import('@/views/shared/TableView.vue')
    },
    {
      path: 'detail/:id',
      name: RouterEnum.INVOICE_DETAIL,
      props: true,
      component: () => import('@/views/shared/AdminDetailView.vue')
    }
  ]
}
