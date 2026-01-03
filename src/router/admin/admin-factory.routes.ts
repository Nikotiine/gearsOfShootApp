import type { RouteRecordRaw } from 'vue-router'
import { AdminRouterEnum } from '@/enum/router/admin-router.enum'

export const factoryRoutes: RouteRecordRaw = {
  path: 'factory',
  children: [
    {
      path: 'new',
      name: AdminRouterEnum.FACTORY_NEW,
      component: () => import('@/views/shared/FormView.vue')
    },
    {
      path: 'list',
      name: AdminRouterEnum.FACTORY_LIST,
      component: () => import('@/views/shared/TableView.vue')
    },
    {
      path: 'edit/:id',
      props: true,
      name: AdminRouterEnum.FACTORY_EDIT,
      component: () => import('@/views/shared/FormView.vue')
    }
  ]
}
