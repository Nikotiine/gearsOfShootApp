import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import type { RoutableObjectType } from '@/types/routable.type'
import { PublicRouterEnum } from '@/enum/router/public-router.enum'
import { getRoutableMap } from '@/shared/utils/routable-object.utils'
import type { LegislationCategoryDto } from '@/api/Api'

export const useRoutableObjectStore = defineStore('routable-object', () => {
  const router = useRouter()
  const routerMap: Record<RoutableObjectType, PublicRouterEnum> = getRoutableMap()
  /**
   * Redirige vers la page détail selon le weapon-type et l'id de l'objet.
   *
   * @param type - Type de l'objet (optic, riffle, etc.)
   * @param id - Identifiant de l'objet
   * @param category LegislationCategoryDto
   */
  function redirectToDetail(
    type: RoutableObjectType,
    id: number,
    category?: LegislationCategoryDto
  ): void {
    const routeName = routerMap[type]

    if (!routeName) {
      console.warn(`[Navigation] Route inconnue pour le type: ${type}`)
      return
    }

    router.push({
      name: routeName,
      params: { id, category: category?.name }
    })
  }
  return {
    redirectToDetail
  }
})
