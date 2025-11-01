import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { useUserStore } from '@/stores/user.store'
import { RouterEnum } from '@/enum/router.enum'
import { useToastStore } from '@/stores/toast'

/**
 * Guard qui protège les routes réservées aux administrateurs.
 * Si l'utilisateur n'est pas admin, il est redirigé vers la page d'accueil.
 */
export function adminGuard(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  const { isAdmin } = useUserStore()
  const { warnMessage } = useToastStore()
  if (!isAdmin.value) {
    warnMessage('error.summary', 'error.403')
    return next({ name: RouterEnum.UNAUTHORIZED })
  }

  next()
}
