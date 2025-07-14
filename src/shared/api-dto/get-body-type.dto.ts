import type { AmmunitionBodyTypeDto } from '@/api/Api'

export const getBodyTypeDto = (): AmmunitionBodyTypeDto => {
  return {
    id: 0,
    name: '',
    reference: ''
  }
}
