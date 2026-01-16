import type { RouteRecordRaw } from 'vue-router'
import { adminScopeRedotRoute } from '@/router/admin/admin-scope&redot.route'
import { opticCollarRoutes } from '@/router/admin/admin-optic-collar.route'

const parentPath: string = 'optique'

export const opticRoutes: RouteRecordRaw = {
  path: parentPath,
  children: [adminScopeRedotRoute, opticCollarRoutes]
}
