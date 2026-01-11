import 'vue-router'
import type { BreadCrumbState } from '@/stores/breadcrumb.store'

declare module 'vue-router' {
  interface RouteMeta {
    breadcrumb?:
      | BreadCrumbState[]
      | ((route: import('vue-router').RouteLocationNormalized) => BreadCrumbState[])
  }
}
