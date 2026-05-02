import { I18nPrefix } from '@/i18n/i18n-prefix.enum'
import type { RouteRecordRaw } from 'vue-router'
import { PublicRouterEnum } from '@/enum/router/public-router.enum'
import { useBreadcrumbStore } from '@/stores/breadcrumb.store'
import { useUserStore } from '@/stores/user.store'
import { useAddressStore } from '@/stores/address.store'

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
      path: 'adresse-livraison',
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
              label: store.createLabel(prefix, 'shippingAddress'),
              index: 2,
              to: {
                name: PublicRouterEnum.CART_ADDRESS
              }
            }
          ]
        }
      },
      component: () => import('@/views/cart/CartStepAddressView.vue')
    },
    {
      path: 'adresse-facturation',
      name: PublicRouterEnum.CART_PAYMENT_ADDRESS,
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
              label: store.createLabel(prefix, 'shippingAddress'),
              index: 2,
              to: {
                name: PublicRouterEnum.CART_ADDRESS
              }
            },
            {
              label: store.createLabel(prefix, 'paymentAddress'),
              index: 3,
              to: {
                name: PublicRouterEnum.CART_PAYMENT_ADDRESS
              }
            }
          ]
        }
      },
      component: () => import('@/views/cart/CartStepAddressView.vue')
    },
    {
      path: 'resume-du-panier',
      name: PublicRouterEnum.CART_RESUME,
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
              label: store.createLabel(prefix, 'shippingAddress'),
              index: 2,
              to: {
                name: PublicRouterEnum.CART_ADDRESS
              }
            },
            {
              label: store.createLabel(prefix, 'paymentAddress'),
              index: 3,
              to: {
                name: PublicRouterEnum.CART_PAYMENT_ADDRESS
              }
            },
            {
              label: store.createLabel(prefix, 'resume'),
              index: 4,
              to: {
                name: PublicRouterEnum.CART_RESUME
              }
            }
          ]
        }
      },
      component: () => import('@/views/cart/CartStepResume.vue')
    },
    {
      path: 'nouvelle-adresse',
      name: PublicRouterEnum.CART_NEW_ADDRESS,
      beforeEnter: async (to, from, next) => {
        try {
          // appel backend (ex: récupérer user)
          const userStore = useUserStore()
          const addressStore = useAddressStore()
          const user = await userStore.getUserProfile() // ta méthode / query

          if (!user) {
            // redirection si pas connecté / invalide
            return next({ name: PublicRouterEnum.CART })
          }
          addressStore.setOriginURl(PublicRouterEnum.CART_ADDRESS)
          return next()
        } catch (e) {
          return next(false) // bloque la navigation
        }
      },
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
            },
            {
              label: store.createLabel(prefix, 'newAddress'),
              index: 3,
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
