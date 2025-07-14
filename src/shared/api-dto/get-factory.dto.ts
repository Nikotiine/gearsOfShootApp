import type { FactoryDto } from '@/api/Api'

export const getFactoryDto = (): FactoryDto => {
  return {
    id: 0,
    description: '',
    name: '',
    reference: '',
    type: {
      id: 0,
      name: ''
    }
  }
}
