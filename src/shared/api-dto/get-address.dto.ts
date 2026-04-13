import type { AddressDto } from '@/api/Api'

export const getAddressDto = (): AddressDto => {
  return {
    id: null,
    street: '',
    streetNumber: '',
    additionalInformation: '',
    city: '',
    state: '',
    additionalStreet: '',
    firstName: '',
    lastName: '',
    zipCode: ''
  }
}
