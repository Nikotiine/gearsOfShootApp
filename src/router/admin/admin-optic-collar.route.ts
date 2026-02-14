import { AdminRouterEnum } from '@/enum/router/admin-router.enum'
import { useBreadcrumbStore } from '@/stores/breadcrumb.store'
import { GlobalRouterEnum } from '@/enum/router/global-router.enum'
import { I18nPrefix } from '@/i18n/i18n-prefix.enum'
const parentPath = 'montage-optique'
const routeFormName = AdminRouterEnum.OPTIC_COLLAR_NEW
const routeEditName = AdminRouterEnum.OPTIC_COLLAR_EDIT
const routeListName = AdminRouterEnum.OPTIC_COLLAR_LIST
const routeDetailName = AdminRouterEnum.OPTIC_COLLAR_DETAIL
const prefix = I18nPrefix.OPTIC_COLLAR
export const opticCollarRoutes = {
  path: parentPath,
  children: [
    {
      path: GlobalRouterEnum.PATH_NEW_PRODUCT,
      name: routeFormName,
      meta: {
        breadcrumb: () => {
          const store = useBreadcrumbStore()
          return [
            {
              label: store.createLabel(prefix, 'breadcrumbAdd'),
              index: 1,
              to: {
                name: routeFormName
              }
            }
          ]
        }
      },
      component: () => import('@/views/optic/collar/OpticCollarFormView.vue')
    },
    {
      path: `${GlobalRouterEnum.PATH_EDIT_PRODUCT}/:id`,
      props: true,
      name: routeEditName,
      meta: {
        breadcrumb: (route: any) => {
          const store = useBreadcrumbStore()
          return [
            {
              label: store.createLabel(prefix, 'breadcrumbList'),
              index: 1,
              to: {
                name: routeListName
              }
            },
            {
              label: store.createLabel(prefix),
              index: 2,
              to: {
                name: routeDetailName,
                params: {
                  id: route.params.id
                }
              }
            },
            {
              label: store.createLabel(prefix, 'breadcrumbEdit'),
              index: 3,
              to: {
                name: routeEditName,
                params: {
                  id: route.params.id
                }
              }
            }
          ]
        }
      },
      component: () => import('@/views/optic/collar/OpticCollarFormView.vue')
    },
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
      component: () => import('@/views/optic/collar/OpticCollarTableView.vue')
    },
    {
      path: `${GlobalRouterEnum.PATH_DETAIL}/:id`,
      props: true,
      name: routeDetailName,
      meta: {
        breadcrumb: (route: any) => {
          const store = useBreadcrumbStore()
          return [
            {
              label: store.createLabel(prefix, 'breadcrumbList'),
              index: 1,
              to: {
                name: routeListName
              }
            },
            {
              label: store.createLabel(prefix),
              index: 2,
              to: {
                name: routeDetailName,
                params: {
                  id: route.params.id
                }
              }
            }
          ]
        }
      },
      component: () => import('@/views/optic/collar/OpticCollarDetailView.vue')
    }
  ]
}
