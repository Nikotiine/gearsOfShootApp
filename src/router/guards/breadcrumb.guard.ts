import type { RouteLocationNormalized, Router } from 'vue-router'

import { type BreadCrumbState, useBreadcrumbStore } from '@/stores/breadcrumb.store'

export function breadcrumbGuard(router: Router) {
  router.afterEach((to: RouteLocationNormalized) => {
    const breadcrumbStore = useBreadcrumbStore()

    const metaBreadcrumb = to.meta.breadcrumb

    if (!metaBreadcrumb) {
      // Pas de breadcrumb défini pour cette route
      return
    }
    let steps: BreadCrumbState[] = []
    if (typeof metaBreadcrumb === 'function') {
      steps = metaBreadcrumb(to)
    } else {
      steps = metaBreadcrumb
    }

    // 🔁 On applique chaque étape dans l’ordre
    steps.forEach((step) => {
      breadcrumbStore.setStep(step)
    })
  })
}
