import type { RouteRecordRaw } from 'vue-router'
import { RouterEnum } from '@/enum/router.enum'
import { ammunitionRoutes } from '@/router/admin/admin-ammunition.routes'
import { magazineRoutes } from '@/router/admin/admin-magazine.routes'
import { opticRoutes } from '@/router/admin/admin-optic.routes'
import { weaponRoutes } from '@/router/admin/admin-weapon.routes'
import { factoryRoutes } from '@/router/admin/admin-factory.routes'
import { invoiceRoutes } from '@/router/admin/admin-invoice.routes'
import { rdsRoutes } from '@/router/admin/admin-acc-rds.routes'
import { opticCollarRoutes } from '@/router/admin/admin-optic-collar.route'
import {
  bodyTypeRoutes,
  caliberRoutes,
  colorRoutes,
  headTypeRoutes,
  materialRoutes,
  threadedSizeRoutes,
  weaponTypeRoutes
} from '@/router/admin/admin-common.routes'

export const adminRoutes: RouteRecordRaw = {
  path: '/admin',
  component: () => import('@/views/admin/AdminLayout.vue'),
  // beforeEnter: adminGuard,
  children: [
    {
      path: '',
      name: RouterEnum.ADMIN_DASHBOARD,
      component: () => import('@/views/admin/AdminDashboardView.vue')
    },
    {
      path: 'gestion',
      meta: { navbar: true },
      children: [
        ammunitionRoutes,
        magazineRoutes,
        opticRoutes,
        weaponRoutes,
        factoryRoutes,
        colorRoutes,
        materialRoutes,
        headTypeRoutes,
        bodyTypeRoutes,
        weaponTypeRoutes,
        caliberRoutes,
        threadedSizeRoutes,
        opticCollarRoutes,
        rdsRoutes,
        invoiceRoutes
      ]
    }
  ]
}
