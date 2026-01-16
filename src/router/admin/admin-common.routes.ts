import type { RouteRecordRaw } from 'vue-router'
import { AdminRouterEnum } from '@/enum/router/admin-router.enum'
import { GlobalRouterEnum } from '@/enum/router/global-router.enum'
import { useBreadcrumbStore } from '@/stores/breadcrumb.store'

export const colorRoutes: RouteRecordRaw = {
  path: 'couleurs',
  children: [
    {
      path: GlobalRouterEnum.PATH_NEW_REF,
      name: AdminRouterEnum.COLOR_NEW,
      meta: {
        breadcrumb: () => {
          const store = useBreadcrumbStore()
          return [
            {
              label: store.createLabel('color', 'breadcrumbAdd'),
              index: 1,
              to: {
                name: AdminRouterEnum.COLOR_NEW
              }
            }
          ]
        }
      },
      component: () => import('@/views/internal-ref/color/ColorFormView.vue')
    }
  ]
}

export const materialRoutes: RouteRecordRaw = {
  path: 'type-materiaux',
  children: [
    {
      path: GlobalRouterEnum.PATH_NEW_REF,
      name: AdminRouterEnum.MATERIAL_NEW,
      meta: {
        breadcrumb: () => {
          const store = useBreadcrumbStore()
          return [
            {
              label: store.createLabel('material', 'breadcrumbAdd'),
              index: 1,
              to: {
                name: AdminRouterEnum.MATERIAL_NEW
              }
            }
          ]
        }
      },
      component: () => import('@/views/internal-ref/material/MaterialFormView.vue')
    }
  ]
}

export const headTypeRoutes: RouteRecordRaw = {
  path: 'headType',
  children: [
    {
      path: GlobalRouterEnum.PATH_NEW_REF,
      name: AdminRouterEnum.HEAD_TYPE_NEW,
      meta: {
        breadcrumb: () => {
          const store = useBreadcrumbStore()
          return [
            {
              label: store.createLabel('headType', 'breadcrumbAdd'),
              index: 1,
              to: {
                name: AdminRouterEnum.HEAD_TYPE_NEW
              }
            }
          ]
        }
      },
      component: () => import('@/views/internal-ref/ammunition/HeadTypeFormView.vue')
    }
  ]
}

export const bodyTypeRoutes: RouteRecordRaw = {
  path: 'type-douille',
  children: [
    {
      path: GlobalRouterEnum.PATH_NEW_REF,
      name: AdminRouterEnum.BODY_TYPE_NEW,
      meta: {
        breadcrumb: () => {
          const store = useBreadcrumbStore()
          return [
            {
              label: store.createLabel('bodyType', 'breadcrumbAdd'),
              index: 1,
              to: {
                name: AdminRouterEnum.BODY_TYPE_NEW
              }
            }
          ]
        }
      },
      component: () => import('@/views/internal-ref/ammunition/BodyTypeFormView.vue')
    }
  ]
}

export const weaponTypeRoutes: RouteRecordRaw = {
  path: 'types-armes',
  children: [
    {
      path: GlobalRouterEnum.PATH_NEW_REF,
      name: AdminRouterEnum.WEAPON_TYPE_NEW,
      meta: {
        breadcrumb: () => {
          const store = useBreadcrumbStore()
          return [
            {
              label: store.createLabel('weaponType', 'breadcrumbAdd'),
              index: 1,
              to: {
                name: AdminRouterEnum.WEAPON_TYPE_NEW
              }
            }
          ]
        }
      },
      component: () => import('@/views/internal-ref/weapon-type/WeaponTypeFormView.vue')
    }
  ]
}

export const caliberRoutes: RouteRecordRaw = {
  path: 'calibre',
  children: [
    {
      path: GlobalRouterEnum.PATH_NEW_REF,
      name: AdminRouterEnum.CALIBER_NEW,
      meta: {
        breadcrumb: () => {
          const store = useBreadcrumbStore()
          return [
            {
              label: store.createLabel('caliber', 'breadcrumbAdd'),
              index: 1,
              to: {
                name: AdminRouterEnum.CALIBER_NEW
              }
            }
          ]
        }
      },
      component: () => import('@/views/internal-ref/caliber/CaliberFormView.vue')
    }
  ]
}

export const threadedSizeRoutes: RouteRecordRaw = {
  path: 'pas-de-vis',
  children: [
    {
      path: GlobalRouterEnum.PATH_NEW_REF,
      name: AdminRouterEnum.THREADED_SIZE_NEW,
      meta: {
        breadcrumb: () => {
          const store = useBreadcrumbStore()
          return [
            {
              label: store.createLabel('threadedSize', 'breadcrumbAdd'),
              index: 1,
              to: {
                name: AdminRouterEnum.THREADED_SIZE_NEW
              }
            }
          ]
        }
      },
      component: () => import('@/views/internal-ref/threaded-size/ThreadedSizeFormView.vue')
    }
  ]
}
