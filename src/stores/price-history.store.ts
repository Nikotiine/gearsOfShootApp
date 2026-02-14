import { defineStore } from 'pinia'
import { useApiStore } from '@/stores/api'
import { useQuery } from '@tanstack/vue-query'
import { ref } from 'vue'
import type { PriceHistoryDto } from '@/api/Api'
import { I18nPrefix } from '@/i18n/i18n-prefix.enum'

export const usePriceHistoryStore = defineStore('price-history-store', () => {
  const { api } = useApiStore()
  // Private Attibute
  const _I18N_PREFIX = I18nPrefix.PRICE_HISTORY
  const _GET_ALL_FN = 'getAllPriceHistory'

  // Refs
  const history = ref<PriceHistoryDto[]>([])

  const _fetchAllPriceHistory = async (objectId?: number, type?: string) => {
    if (!objectId || !type) return null
    const res = await api.api.priceHistoryControllerFindByTypeAndObject(type, objectId)
    history.value = res.data
    return res.data
  }

  const queryFindAllPriceHistory = (objectId?: number, type?: string) =>
    useQuery({
      queryKey: [_GET_ALL_FN, objectId, type],
      queryFn: async () => {
        return await _fetchAllPriceHistory(objectId, type)
      },
      enabled: !!objectId && !!type
    })

  return {
    getI18NPrefix: _I18N_PREFIX,
    findAll: queryFindAllPriceHistory
  }
})
