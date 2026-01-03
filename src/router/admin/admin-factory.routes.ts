import type { RouteRecordRaw } from 'vue-router'
import { RouterEnum } from '@/enum/router.enum'

export const factoryRoutes: RouteRecordRaw = {
  path: 'factory',
  children: [
    {
      path: 'new',
      name: RouterEnum.FACTORY_NEW,
      component: () => import('@/views/shared/FormView.vue')
    },
    {
      path: 'list',
      name: RouterEnum.FACTORY_LIST,
      component: () => import('@/views/shared/TableView.vue')
    },
    {
      path: 'edit/:id',
      props: true,
      name: RouterEnum.FACTORY_EDIT,
      component: () => import('@/views/shared/FormView.vue')
    }
  ]
}
