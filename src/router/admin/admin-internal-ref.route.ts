import type { RouteRecordRaw } from 'vue-router'
import {
  bodyTypeRoutes,
  caliberRoutes,
  colorRoutes,
  headTypeRoutes,
  materialRoutes,
  threadedSizeRoutes,
  weaponTypeRoutes
} from '@/router/admin/admin-common.routes'
import { factoryRoutes } from '@/router/admin/admin-factory.routes'
const parentPath: string = 'ref-interne'
export const adminInternalRefRoute: RouteRecordRaw = {
  path: parentPath,
  children: [
    colorRoutes,
    materialRoutes,
    headTypeRoutes,
    bodyTypeRoutes,
    weaponTypeRoutes,
    caliberRoutes,
    threadedSizeRoutes,
    factoryRoutes
  ]
}
