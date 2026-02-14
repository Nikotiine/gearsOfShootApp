import type {
  AmmunitionFilter,
  ClientOrderFilter,
  FactoryFilter,
  HandGunFilter,
  MagazineFilter,
  OpticCollarFilter,
  OpticFilter,
  RiffleFilter,
  SoundNoiseFilter,
  UserFilter
} from '@/api/Api'

export function buildAmmunitionFilters(): AmmunitionFilter {
  return {
    category: undefined,
    factoryId: undefined,
    caliberId: undefined,
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
export function buildOpticCollarFilter(): OpticCollarFilter {
  return {
    limit: 10,
    offset: 0,
    factory: '',
    name: '',
    reference: '',
    railSize: ''
  }
}
export function buildFactoryFilter(): FactoryFilter {
  return {
    limit: 10,
    offset: 0,
    name: '',
    reference: '',
    type: ''
  }
}
export function buildMagazineFilter(): MagazineFilter {
  return {
    limit: 10,
    offset: 0,
    factory: '',
    name: '',
    reference: '',
    caliber: '',
    category: '',
    capacity: undefined
  }
}
export function buildRiffleFilter(): RiffleFilter {
  return {
    limit: 10,
    offset: 0,
    factoryId: undefined,
    name: '',
    reference: '',
    category: '',
    caliberId: undefined,
    percussionTypeId: undefined,
    isAdjustableBusk: undefined,
    isAdjustableButt: undefined,
    isThreadedBarrel: undefined,
    railSizeId: undefined,
    isOpenAim: undefined
  }
}
export function buildHandGunFilter(): HandGunFilter {
  return {
    limit: 10,
    offset: 0,
    name: '',
    reference: '',
    category: '',
    caliberId: undefined,
    factoryId: undefined,
    percussionTypeId: undefined,
    isThreadedBarrel: undefined,
    isOpticReady: undefined,
    triggerTypeId: undefined,
    slideMaterialId: undefined
  }
}

export function buildUsersFilter(): UserFilter {
  return {
    limit: 10,
    offset: 0,
    costumerRole: '',
    role: 'USER',
    email: '',
    lastName: ''
  }
}

export function buildOrderFilter(): ClientOrderFilter {
  return {
    limit: 10,
    offset: 0,
    invoiceStatus: 'IN_ORDER'
  }
}
