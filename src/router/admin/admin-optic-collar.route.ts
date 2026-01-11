import { AdminRouterEnum } from '@/enum/router/admin-router.enum'

export const opticCollarRoutes = {
  path: 'optic-collar',
  children: [
    {
      path: 'new',
      name: AdminRouterEnum.OPTIC_COLLAR_NEW,
      component: () => import('@/views/shared/FormView.vue')
    },
    {
      path: 'edit/:id',
      props: true,
      name: AdminRouterEnum.OPTIC_COLLAR_EDIT,
      component: () => import('@/views/shared/FormView.vue')
    },
    {
      path: 'list',
      name: AdminRouterEnum.OPTIC_COLLAR_LIST,
      component: () => import('@/views/shared/TableView.vue')
    },
    {
      path: 'detail/:id',
      props: true,
      name: AdminRouterEnum.OPTIC_COLLAR_DETAIL,
      component: () => import('@/views/shared/AdminDetailView.vue')
    }
  ]
}
