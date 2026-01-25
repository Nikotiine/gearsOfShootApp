import type { RouteRecordRaw } from 'vue-router'
import { AdminRouterEnum } from '@/enum/router/admin-router.enum'
import { GlobalRouterEnum } from '@/enum/router/global-router.enum'
import { useBreadcrumbStore } from '@/stores/breadcrumb.store'
import { I18nPrefix } from '@/i18n/i18n-prefix.enum'
const parentPath: string = 'facture-commande'
const prefix: string = I18nPrefix.INVOICE
const routeFormName = AdminRouterEnum.INVOICE_NEW
const routeListName = AdminRouterEnum.INVOICE_LIST
const routeDetailName = AdminRouterEnum.INVOICE_DETAIL
export const invoiceRoutes: RouteRecordRaw = {
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
      component: () => import('@/views/admin/invoice/InvoiceFormView.vue')
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
      component: () => import('@/views/admin/invoice/InvoiceTableView.vue')
    },
    {
      path: `${GlobalRouterEnum.PATH_DETAIL}/:id`,
      name: routeDetailName,
      props: true,
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
      component: () => import('@/views/admin/invoice/InvoiceDetailView.vue')
    }
  ]
}
