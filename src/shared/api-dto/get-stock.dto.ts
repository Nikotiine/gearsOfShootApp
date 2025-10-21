import type { StockDto, StockHistoriesDto } from '@/api/Api'
import { getUserDto } from '@/shared/api-dto/get-user.dto'

export const getStockDto = (): StockDto => {
  return {
    id: 0,
    updatedAt: '',
    createdAt: '',
    quantity: 0,
    histories: getStockHistoryDto()
  }
}
const getStockHistoryDto = (): StockHistoriesDto[] => {
  return [
    {
      id: 0,
      createdAt: '',
      movementQuantity: 0,
      newQuantity: 0,
      previousQuantity: 0,
      reason: '',
      movement: '',
      createdBy: getUserDto()
    }
  ]
}
