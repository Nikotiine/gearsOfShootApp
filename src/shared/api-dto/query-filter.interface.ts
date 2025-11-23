export class BaseQueryFilter {
  limit: number = 10
  offset?: number
  reference?: string
}

export class AmmunitionQueryFilter extends BaseQueryFilter {
  category?: string
  factory?: string
  caliber?: string
  name?: string
}
export function getQueryFilter(): AmmunitionQueryFilter {
  return {
    category: undefined,
    factory: undefined,
    caliber: undefined,
    limit: 10,
    offset: 0,
    name: undefined,
    reference: undefined
  }
}
