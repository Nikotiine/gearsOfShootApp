import { defineStore } from 'pinia'
import { getI18NPrefix, I18NSuffix } from '@/enum/I18NSuffix.enum'
import type { CreateStockDto, StockDto } from '@/api/Api'
import { useApiStore } from '@/stores/api'
import { useMutation, useQuery } from '@tanstack/vue-query'
import { ref } from 'vue'
import { useToastStore } from '@/stores/toast'
import { MovementType } from '@/enum/movement.enum'
import type { StockableObjectType } from '@/types/priceable-object.type'

export const useStockStore = defineStore('stock-store', () => {
  const { api } = useApiStore()
  const { successMessage, errorMessage } = useToastStore()
  // Private Attibute
  const _I18N_PREFIX = 'stock'
  const _GET_BY_OBJECT_AND_OBJECTID_FN = 'getByObjectAndObjectId'

  const objectId = ref<number>(0)
  const currentStock = ref<number>(0)
  const object = ref<StockableObjectType>('DEFAULT')
  const stockAndHistories = ref<StockDto>()
  const submitSuccess = ref(false)
  const _createMutation = useMutation({
    mutationFn: async (stock: CreateStockDto) => {
      return await api.api.stockControllerUpdateStock(stock)
    }
  })

  function useStockForm() {
    const emptyForm: CreateStockDto = {
      movementType: MovementType.IN,
      object: '',
      objectId: 0,
      quantity: 0,
      reason: null
    }
    const form = ref<CreateStockDto>({ ...emptyForm })
    const submit = () => {
      _createMutation.mutate(
        { ...form.value, object: object.value, objectId: objectId.value },
        {
          onSuccess: async (data) => {
            currentStock.value = data.data.quantity
            submitSuccess.value = true
            await _fetchByObjectAndObjectId(object.value, objectId.value.toString())
            successMessage(
              getI18NPrefix(_I18N_PREFIX) + I18NSuffix.SUMMARY,
              getI18NPrefix(_I18N_PREFIX) + I18NSuffix.UPDATED,
              data.data.quantity.toString()
            )
          },
          onError(error: any) {
            errorMessage(
              getI18NPrefix(_I18N_PREFIX) + I18NSuffix.SUMMARY,
              'error.' + error.response.data.message
            )
          }
        }
      )
    }
    return { form, submit }
  }

  function setObjectId(id?: string): void {
    if (!id) return
    objectId.value = parseInt(id)
  }

  function setObject(objectType: StockableObjectType): void {
    object.value = objectType
  }

  function setCurrentStock(stock: number): void {
    currentStock.value = stock
  }

  const _fetchByObjectAndObjectId = async (object: StockableObjectType, objectId?: string) => {
    if (!object || !objectId) return null
    const res = await api.api.stockControllerFindByStockableObjectAndId(object, parseInt(objectId))
    stockAndHistories.value = res.data
    return res.data
  }

  const getByObjectAndObjectId = (object: StockableObjectType, objectId?: string) =>
    useQuery({
      queryKey: [_GET_BY_OBJECT_AND_OBJECTID_FN, object, objectId],
      queryFn: async () => {
        return await _fetchByObjectAndObjectId(object, objectId)
      },
      enabled: !!object && !!objectId
    })

  return {
    getI18NPrefix: getI18NPrefix(_I18N_PREFIX),
    formBuilder: useStockForm,
    setObjectId: setObjectId,
    setObject: setObject,
    submitSuccess,
    setCurrentStock: setCurrentStock,
    currentStock,
    getByObjectAndObjectId,
    stockAndHistories
  }
})
