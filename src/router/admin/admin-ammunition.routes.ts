import type { RouteRecordRaw } from 'vue-router'
import { RouterEnum } from '@/enum/router.enum'

export const ammunitionRoutes: RouteRecordRaw = {
  path: 'ammunition',
  children: [
    {
      path: 'new',
      name: RouterEnum.AMMUNITION_NEW,
      component: () => import('@/views/shared/FormView.vue')
    },
    {
      path: 'list/:category',
      name: RouterEnum.AMMUNITION_LIST,
      props: true,
      component: () => import('@/views/shared/TableWithPropsView.vue')
    },
    {
      path: 'detail/:id',
      name: RouterEnum.AMMUNITION_DETAIL,
      props: true,
      component: () => import('@/views/shared/AdminDetailView.vue')
    },
    {
      path: 'edit/:id',
      name: RouterEnum.AMMUNITION_EDIT,
      props: true,
      component: () => import('@/views/shared/FormView.vue')
    }
  ]
}
