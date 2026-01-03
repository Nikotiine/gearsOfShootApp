import type { RouteRecordRaw } from 'vue-router'
import { RouterEnum } from '@/enum/router.enum'

export const opticRoutes: RouteRecordRaw = {
  path: 'optic',
  children: [
    {
      path: 'new',
      name: RouterEnum.OPTIC_NEW,
      component: () => import('@/views/shared/FormView.vue')
    },
    {
      path: 'list',
      name: RouterEnum.OPTIC_LIST,
      component: () => import('@/views/shared/TableView.vue')
    },
    {
      path: 'detail/:id',
      name: RouterEnum.OPTIC_DETAIL,
      props: true,
      component: () => import('@/views/shared/AdminDetailView.vue')
    },
    {
      path: 'edit/:id',
      name: RouterEnum.OPTIC_EDIT,
      props: true,
      component: () => import('@/views/shared/FormView.vue')
    }
  ]
}
