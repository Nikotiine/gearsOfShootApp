import { I18nPrefix } from '@/i18n/i18n-prefix.enum'
import type { RouteRecordRaw } from 'vue-router'
import { PublicRouterEnum } from '@/enum/router/public-router.enum'
import { useBreadcrumbStore } from '@/stores/breadcrumb.store'

const parentPath: string = 'panier'
const prefix: string = I18nPrefix.ORDER
export const publicCartRoute: RouteRecordRaw = {
  path: parentPath,
  children: [
    {
      path: 'validation',
      name: PublicRouterEnum.CART,
      meta: {
        breadcrumb: () => {
          const store = useBreadcrumbStore()
          return [
            {
              label: store.createLabel(prefix, 'cart'),
              index: 1,
              to: {
                name: PublicRouterEnum.CART
              }
            }
          ]
        }
      },
      component: () => import('@/views/cart/CartView.vue')
    },
    {
      path: 'adresse',
      name: PublicRouterEnum.CART_ADDRESS,
      meta: {
        breadcrumb: () => {
          const store = useBreadcrumbStore()
          return [
            {
              label: store.createLabel(prefix, 'cart'),
              index: 1,
              to: {
                name: PublicRouterEnum.CART
              }
            },
            {
              label: store.createLabel(prefix, 'cartAddress'),
              index: 2,
              to: {
                name: PublicRouterEnum.CART_ADDRESS
              }
            }
          ]
        }
      },
      component: () => import('@/views/cart/CartStepAddressView.vue')
    }
  ]
}
