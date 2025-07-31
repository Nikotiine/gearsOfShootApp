import { defineStore } from 'pinia'
import { getI18NPrefix, I18NSuffix } from '@/enum/I18NSuffix.enum'
import type { CreateStockDto } from '@/api/Api'
import { useApiStore } from '@/stores/api'
import { useMutation } from '@tanstack/vue-query'
import { ref } from 'vue'
import { useToastStore } from '@/stores/toast'
import { MovementType } from '@/enum/movement.enum'

export const useStockStore = defineStore('stock-store', () => {
  const { api } = useApiStore()
  const { successMessage, errorMessage } = useToastStore()
  // Private Attibute
  const _I18N_PREFIX = 'stock'

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
        { ...form.value },
        {
          onSuccess: () => {
            successMessage(
              getI18NPrefix(_I18N_PREFIX) + I18NSuffix.SUMMARY,
              getI18NPrefix(_I18N_PREFIX) + I18NSuffix.UPDATED
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

  return {
    getI18NPrefix: getI18NPrefix(_I18N_PREFIX),
    formBuilder: useStockForm
  }
})
