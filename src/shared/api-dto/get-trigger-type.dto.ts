import type { WeaponTriggerTypeDto } from '@/api/Api'

export const getTriggerTypeDto = (): WeaponTriggerTypeDto => {
  return {
    name: '',
    id: 0,
    reference: ''
  }
}
