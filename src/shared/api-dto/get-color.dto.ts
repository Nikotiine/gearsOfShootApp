import type { ColorDto } from '@/api/Api'

export const getColorDto = (): ColorDto => {
  return {
    id: 0,
    name: '',
    reference: ''
  }
}
