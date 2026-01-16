import type { RouteRecordRaw } from 'vue-router'
import { adminRiffleRoute } from '@/router/admin/admin-riffle.route'
import { adminHandgunRoutes } from '@/router/admin/admin-handgun.route'
import { adminMagazineRoutes } from '@/router/admin/admin-magazine.routes'

const parentPath: string = 'armes'
export const weaponRoutes: RouteRecordRaw = {
  path: parentPath,
  children: [adminRiffleRoute, adminHandgunRoutes, adminMagazineRoutes]
}
