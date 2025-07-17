import type { CreatePriceHistoryDto } from '@/api/Api'

export const getPriceHistoryDto = (): CreatePriceHistoryDto => {
  return {
    currentSalePrice: 0,
    supplierPrice: 0,
    recommendedSalePrice: 0
  }
}
