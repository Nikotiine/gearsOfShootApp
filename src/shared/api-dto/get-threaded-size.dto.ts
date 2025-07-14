import type { ThreadedSizeDto } from '@/api/Api'

export const getThreadedSizeDto = (): ThreadedSizeDto => {
  return {
    id: 0,
    size: '',
    reference: ''
  }
}
