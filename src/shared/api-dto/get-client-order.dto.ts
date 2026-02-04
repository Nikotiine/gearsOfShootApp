import type { CreateClientOrderDTO } from '@/api/Api'

export const getClientOrderDto = (): CreateClientOrderDTO => {
  return {
    items: [],
    vat: 20,
    shippingCost: 0
  }
}
