import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { CreateClientOrderDTO, CreateClientOrderItem } from '@/api/Api'
import { I18NSuffix } from '@/enum/I18NSuffix.enum'
import { useToastStore } from '@/stores/toast'
import { I18nPrefix } from '@/i18n/i18n-prefix.enum'
import type { DataViewProps } from '@/views/shared/DataViewWrapperView.vue'
import { getClientOrderDto } from '@/shared/api-dto/get-client-order.dto'

export const useCartStore = defineStore('cart-store', () => {
  const _STORAGE_KEY = 'cart'
  const _I18N_PREFIX = I18nPrefix.ORDER
  const toastStore = useToastStore()
  const _cart$ = ref<CreateClientOrderDTO>({ ...getClientOrderDto() })
  const cart$ = computed(() => {
    const orderInStorage = JSON.parse(<string>sessionStorage.getItem(_STORAGE_KEY))

    if (orderInStorage) {
      _cart$.value = orderInStorage
    }
    return _cart$.value
  })

  function addToCart(item: DataViewProps) {
    if (_cart$.value) {
      const itemIsInCart = _cart$.value.items.find(
        (inItem) => inItem.objectId === item.id && inItem.object === item.object
      )
      if (itemIsInCart) {
        toastStore.warnMessage(
          _I18N_PREFIX + I18NSuffix.SUMMARY,
          _I18N_PREFIX + 'alreadyItemInInvoice'
        )
        return
      }
      const formatedItem = mapItemDataViewPropsToOrderItem(item)
      _cart$.value.items.push(formatedItem)
      sessionStorage.setItem(_STORAGE_KEY, JSON.stringify(_cart$.value))
    }
  }

  function mapItemDataViewPropsToOrderItem(item: DataViewProps): CreateClientOrderItem {
    return {
      object: item.object,
      price: item.price,
      objectId: item.id,
      quantity: 1
    }
  }

  function getCartItem(): CreateClientOrderDTO {
    const sessionStorageCart = sessionStorage.getItem(_STORAGE_KEY)
    let cart = []
    if (sessionStorageCart) {
      cart = JSON.parse(sessionStorageCart)
    }
    return cart
  }

  return {
    addToCart,
    cart$
  }
})
