import type { CaliberDto } from '@/api/Api'

export const getCaliberDto = (): CaliberDto => {
  return {
    id: 0,
    name: '',
    reference: ''
  }
}
