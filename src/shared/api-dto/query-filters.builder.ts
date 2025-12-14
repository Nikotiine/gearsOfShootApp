import type { AmmunitionFilter, OpticFilter, SoundNoiseFilter } from '@/api/Api'

export function buildAmmunitionFilters(): AmmunitionFilter {
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
export function buildOpticFilter(): OpticFilter {
  return {
    limit: 10,
    offset: 0,
    factory: '',
    name: '',
    type: '',
    focalPlane: '',
    reference: ''
  }
}
export function buildRdsFilter(): SoundNoiseFilter {
  return {
    limit: 10,
    offset: 0,
    factory: '',
    name: '',
    caliber: undefined,
    reference: ''
  }
}
