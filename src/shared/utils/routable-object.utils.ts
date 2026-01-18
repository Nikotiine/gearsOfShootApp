import type { RoutableObjectType } from '@/types/routable.type'
import { PublicRouterEnum } from '@/enum/router/public-router.enum'

export const getRoutableMap = (): Record<RoutableObjectType, PublicRouterEnum> => {
  return {
    ammunition: PublicRouterEnum.PUBLIC_AMMUNITION_DETAIL,
    riffle: PublicRouterEnum.PUBLIC_RIFFLE_DETAIL,
    handgun: PublicRouterEnum.PUBLIC_HANDGUN_DETAIL,
    optic: PublicRouterEnum.PUBLIC_OPTIC_DETAIL,
    magazine: PublicRouterEnum.PUBLIC_MAGAZINE_DETAIL,
    rds: PublicRouterEnum.PUBLIC_RDS_DETAIL,
    'optic-collar': PublicRouterEnum.PUBLIC_OPTIC_COLLAR_DETAIL
  }
}
