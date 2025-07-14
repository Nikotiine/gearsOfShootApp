import type { MaterialDto } from '@/api/Api'

export const getMaterialDto = (): MaterialDto => {
  return {
    id: 0,
    name: '',
    reference: ''
  }
}
