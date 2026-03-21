import { I18nPrefix } from '@/i18n/i18n-prefix.enum'
import type { RouteRecordRaw } from 'vue-router'
import { PublicRouterEnum } from '@/enum/router/public-router.enum'
import { useBreadcrumbStore } from '@/stores/breadcrumb.store'

const parentPath: string = 'panier'
const prefix: string = I18nPrefix.ORDER
export const publicCartRoute: RouteRecordRaw = {
  path: parentPath,
  name: PublicRouterEnum.CART,
  meta: {
    breadcrumb: () => {
      const store = useBreadcrumbStore()
      return [
        {
          label: store.createLabel(prefix, '__cart'),
          index: 1,
          to: {
            name: PublicRouterEnum.CART
          }
        }
      ]
    }
  },
  component: () => import('@/views/cart/CartView.vue')
}
