import { I18nPrefix } from '@/i18n/i18n-prefix.enum'
import type { RouteRecordRaw } from 'vue-router'
import { PublicRouterEnum } from '@/enum/router/public-router.enum'
import { useBreadcrumbStore } from '@/stores/breadcrumb.store'

const parentPath: string = 'utilisateur'
const prefix: string = I18nPrefix.ORDER
export const publicUserRoute: RouteRecordRaw = {
  path: parentPath,
  children: [
    {
      path: 'nouvelle-adresse',
      name: PublicRouterEnum.USER_NEW_ADDRESS,
      meta: {
        breadcrumb: () => {
          const store = useBreadcrumbStore()
          return [
            {
              label: store.createLabel(prefix, 'newAddress'),
              index: 1,
              to: {
                name: PublicRouterEnum.USER_NEW_ADDRESS
              }
            }
          ]
        }
      },
      component: () => import('@/views/user/profile/AddressFormView.vue')
    }
  ]
}
