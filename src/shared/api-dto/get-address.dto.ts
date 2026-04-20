import type { AddressDto, CreateAddressDto } from '@/api/Api'

export const getAddressDto = (): CreateAddressDto => {
  return {
    street: '',
    streetNumber: '',
    additionalInformation: '',
    city: '',
    state: 'France',
    additionalStreet: '',
    firstName: '',
    lastName: '',
    zipCode: ''
  }
}
