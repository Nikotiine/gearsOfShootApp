import type { RouteRecordRaw } from 'vue-router'
import { RouterEnum } from '@/enum/router.enum'

export const magazineRoutes: RouteRecordRaw = {
  path: 'magazine',
  children: [
    {
      path: 'new',
      name: RouterEnum.MAGAZINE_NEW,
      component: () => import('@/views/shared/FormView.vue')
    },
    {
      path: 'list/:category',
      name: RouterEnum.MAGAZINE_LIST,
      props: true,
      component: () => import('@/views/shared/TableWithPropsView.vue')
    },
    {
      path: 'detail/:id',
      name: RouterEnum.MAGAZINE_DETAIL,
      props: true,
      component: () => import('@/views/shared/AdminDetailView.vue')
    },
    {
      path: 'edit/:id',
      name: RouterEnum.MAGAZINE_EDIT,
      props: true,
      component: () => import('@/views/shared/FormView.vue')
    }
  ]
}
