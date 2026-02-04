import type { RouteRecordRaw } from 'vue-router'
import { AdminRouterEnum } from '@/enum/router/admin-router.enum'
import { ammunitionRoutes } from '@/router/admin/admin-ammunition.routes'
import { opticRoutes } from '@/router/admin/admin-optic.routes'
import { weaponRoutes } from '@/router/admin/admin-weapon.routes'
import { invoiceRoutes } from '@/router/admin/admin-invoice.routes'
import { opticCollarRoutes } from '@/router/admin/admin-optic-collar.route'
import { adminAccessoryRoute } from '@/router/admin/admin-accessory.route'
import { adminInternalRefRoute } from '@/router/admin/admin-internal-ref.route'
import { userRoutes } from '@/router/admin/admin-users.routes'
import { useBreadcrumbStore } from '@/stores/breadcrumb.store'

export const adminRoutes: RouteRecordRaw = {
  path: '/admin',
  component: () => import('@/views/admin/AdminLayout.vue'),
  // beforeEnter: adminGuard,
  children: [
    {
      path: '',
      name: AdminRouterEnum.ADMIN_DASHBOARD,
      meta: {
        breadcrumb: () => {
          const store = useBreadcrumbStore()
          return [
            {
              label: store.createLabel('admin.', 'home'),
              index: 0,
              to: {
                name: AdminRouterEnum.ADMIN_DASHBOARD
              },
              icon: 'pi pi-home'
            }
          ]
        }
      },
      component: () => import('@/views/admin/AdminDashboardView.vue')
    },
    {
      path: 'gestion',
      meta: { navbar: true, admin: true },
      children: [
        ammunitionRoutes,
        opticRoutes,
        weaponRoutes,
        adminInternalRefRoute,
        opticCollarRoutes,
        adminAccessoryRoute,
        invoiceRoutes,
        userRoutes
      ]
    }
  ]
}
