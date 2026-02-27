import type { NavigationGuardNext, RouteLocationNormalized, Router } from 'vue-router'
import { useSecurityStore } from '@/stores/shared/security.store'
import { useConnexionStore } from '@/stores/connexion'

export function cartGuard(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  const securityStore = useSecurityStore()
  const connexionStore = useConnexionStore()
  console.log(from, securityStore.isLogged.value)
}
