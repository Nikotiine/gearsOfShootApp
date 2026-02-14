import type { RouteRecordRaw } from 'vue-router'
import { AdminRouterEnum } from '@/enum/router/admin-router.enum'
import { GlobalRouterEnum } from '@/enum/router/global-router.enum'
import { useBreadcrumbStore } from '@/stores/breadcrumb.store'
import { I18nPrefix } from '@/i18n/i18n-prefix.enum'

const parentPath: string = 'chargeurs'
const prefix: string = I18nPrefix.WEAPON_MAGAZINE
const routeFormName = AdminRouterEnum.MAGAZINE_NEW
const routeListName = AdminRouterEnum.MAGAZINE_LIST
const routeDetailName = AdminRouterEnum.MAGAZINE_DETAIL
const routeEditName = AdminRouterEnum.MAGAZINE_EDIT
export const adminMagazineRoutes: RouteRecordRaw = {
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
      component: () => import('@/views/weapon/magazine/MagazineFormView.vue')
    },
    {
      path: `${GlobalRouterEnum.PATH_LIST}/:category`,
      name: routeListName,
      props: true,
      meta: {
        breadcrumb: (route: any) => {
          const store = useBreadcrumbStore()
          return [
            {
              label: store.createListLabelWithCategory(prefix, route.params.category),
              index: 1,
              to: {
                name: routeListName,
                params: {
                  category: route.params.category
                }
              }
            }
          ]
        }
      },
      component: () => import('@/views/weapon/magazine/MagazineTableView.vue')
    },
    {
      path: `${GlobalRouterEnum.PATH_DETAIL}/:category/:id`,
      name: routeDetailName,
      props: true,
      meta: {
        breadcrumb: (route: any) => {
          const store = useBreadcrumbStore()
          return [
            {
              label: store.createListLabelWithCategory(prefix, route.params.category),
              index: 1,
              to: {
                name: routeListName,
                params: {
                  category: route.params.category
                }
              }
            },
            {
              label: store.createLabel(prefix),
              index: 2,
              to: {
                name: routeDetailName,
                params: {
                  category: route.params.category,
                  id: route.params.id
                }
              }
            }
          ]
        }
      },
      component: () => import('@/views/weapon/magazine/MagazineDetailView.vue')
    },
    {
      path: `${GlobalRouterEnum.PATH_EDIT_PRODUCT}/:category/:id`,
      name: routeEditName,
      props: true,
      meta: {
        breadcrumb: (route: any) => {
          const store = useBreadcrumbStore()
          return [
            {
              label: store.createListLabelWithCategory(prefix, route.params.category),
              index: 1,
              to: {
                name: routeListName,
                params: {
                  category: route.params.category
                }
              }
            },
            {
              label: store.createLabel(prefix),
              index: 2,
              to: {
                name: routeDetailName,
                params: {
                  category: route.params.category,
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
                  category: route.params.category,
                  id: route.params.id
                }
              }
            }
          ]
        }
      },
      component: () => import('@/views/weapon/magazine/MagazineFormView.vue')
    }
  ]
}
