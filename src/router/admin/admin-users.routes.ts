import { I18nPrefix } from '@/i18n/i18n-prefix.enum'
import { AdminRouterEnum } from '@/enum/router/admin-router.enum'
import type { RouteRecordRaw } from 'vue-router'
import { GlobalRouterEnum } from '@/enum/router/global-router.enum'
import { useBreadcrumbStore } from '@/stores/breadcrumb.store'

const parentPath: string = 'utilisateurs'
const prefix: string = I18nPrefix.USERS
const routeListName = AdminRouterEnum.USERS_LIST
export const userRoutes: RouteRecordRaw = {
  path: parentPath,
  children: [
    {
      path: GlobalRouterEnum.PATH_LIST,
      name: routeListName,
      meta: {
        breadcrumb: () => {
          const store = useBreadcrumbStore()
          return [
            {
              label: store.createLabel(prefix, 'breadcrumbList'),
              index: 1,
              to: {
                name: routeListName
              }
            }
          ]
        }
      },
      component: () => import('@/views/user/UsersTableView.vue')
    }
  ]
}
