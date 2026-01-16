import type { RouteRecordRaw } from 'vue-router'
import { rdsRoutes } from '@/router/admin/admin-acc-rds.routes'
const parentPath: string = 'accessoires'
export const adminAccessoryRoute: RouteRecordRaw = {
  path: parentPath,
  children: [rdsRoutes]
}
