import type { CreatePriceHistoryDto } from '@/api/Api'

export const getPriceHistoryDto = (): CreatePriceHistoryDto => {
  return {
    currentSalePrice: 0,
    supplierPrice: 0,
    recommendedSalePrice: 0,
    supplier: {
      id: 0,
      name: '',
      address: '',
      zipCode: '',
      city: '',
      country: '',
      siret: '',
      phoneNumber: ''
    },
    discountedPrice: 0,
    isDiscounted: false,
    precentOfDiscount: 0
  }
}
