import type { AmmunitionHeadTypeDto } from '@/api/Api'

export const getHeadTypeDto = (): AmmunitionHeadTypeDto => {
  return {
    id: 0,
    name: '',
    reference: ''
  }
}
