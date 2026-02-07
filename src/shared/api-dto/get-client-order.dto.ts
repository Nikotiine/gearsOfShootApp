import type { CreateClientOrderDto } from '@/api/Api'

export const getClientOrderDto = (): CreateClientOrderDto => {
  return {
    items: [],
    vat: 20,
    shippingCost: 0
  }
}
