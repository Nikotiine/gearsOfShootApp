import type { SupplierDto } from '@/api/Api'

export const getSupplierDto = (): SupplierDto => {
  return {
    id: 0,
    address: '',
    city: '',
    country: '',
    name: '',
    phoneNumber: '',
    siret: '',
    zipCode: ''
  }
}
