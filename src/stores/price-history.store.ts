import { defineStore } from 'pinia'
import { useApiStore } from '@/stores/api'
import { useQuery } from '@tanstack/vue-query'
import { getI18NPrefix } from '@/enum/I18NSuffix.enum'

export const usePriceHistoryStore = defineStore('price-history-store', () => {
  const { api } = useApiStore()
  // Private Attibute
  const _I18N_PREFIX = 'priceHistory'
  const _GET_ALL_FN = 'getAllPriceHistory'

  const _fetchAllPriceHistory = async (objectId: number, type: string) => {
    return await api.api.priceHistoryControllerFindByTypeAndObject(type, objectId)
  }

  const queryFindAllPriceHistory = (objectId: number, type: string) =>
    useQuery({
      queryKey: [_GET_ALL_FN, objectId, type],
      queryFn: async () => {
        return await _fetchAllPriceHistory(objectId, type)
      },
      enabled: !!objectId && !!type
    })

  return {
    getI18NPrefix: getI18NPrefix(_I18N_PREFIX),
    findAll: queryFindAllPriceHistory
  }
})
