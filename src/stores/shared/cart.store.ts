import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type {
  AddressDto,
  ClientOrderDto,
  ClientOrderFilter,
  CreateClientOrderDto,
  CreateClientOrderItemDto,
  RouteToDto,
  UpdateClientOrderDto
} from '@/api/Api'
import { I18NSuffix } from '@/enum/I18NSuffix.enum'
import { useToastStore } from '@/stores/shared/toast'
import { I18nPrefix } from '@/i18n/i18n-prefix.enum'
import type { DataViewProps } from '@/views/shared/DataViewWrapperView.vue'
import { getClientOrderDto } from '@/shared/api-dto/get-client-order.dto'
import { useMutation, useQuery } from '@tanstack/vue-query'
import { useApiStore } from '@/stores/api'
import { useFormHandler } from '@/shared/useFormHandler'
import type { AxiosResponse } from 'axios'
import { buildOrderFilter } from '@/shared/api-dto/query-filters.builder'
import { useUserStore } from '@/stores/user.store'
import { useSecurityStore } from '@/stores/shared/security.store'

export const useCartStore = defineStore('cart-store', () => {
  const _STORAGE_KEY = 'cart'
  const _GET_BY_ID_FN = 'getOrderById'
  const _GET_ALL_FN = 'getAllOrders'
  const { api } = useApiStore()
  const userStore = useUserStore()
  const securityStore = useSecurityStore()
  const _I18N_PREFIX = I18nPrefix.ORDER
  const toastStore = useToastStore()
  const _cart$ = ref<CreateClientOrderDto>({ ...getClientOrderDto() })
  const queryFilters = ref<ClientOrderFilter>({ ...buildOrderFilter() })

  const cart$ = computed(() => {
    const orderInStorage = JSON.parse(<string>sessionStorage.getItem(_STORAGE_KEY))

    if (orderInStorage) {
      _cart$.value = orderInStorage
    }
    return _cart$.value
  })

  //TODO: Ajouter l erreur dans le formulaire
  async function autoSaveCart(): Promise<void> {
    if (securityStore.isLogged.value) {
      _cart$.value.status = 'IN_CART'
      const user = await userStore.getUserProfile()
      if (user.data.inCartId) {
        _updateMutation.mutate({ ...cart$.value, id: user.data.inCartId })
      } else {
        _createMutation.mutate(_cart$.value)
      }
    }
  }

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
      toastStore.infoMessage(_I18N_PREFIX + I18NSuffix.SUMMARY, _I18N_PREFIX + 'addItem')
      const formatedItem = mapItemDataViewPropsToOrderItem(item)
      _cart$.value.items.push(formatedItem)
      sessionStorage.setItem(_STORAGE_KEY, JSON.stringify(_cart$.value))
    }
  }

  function updateSavedCart(cart: CreateClientOrderDto) {
    _cart$.value = cart
    sessionStorage.setItem(_STORAGE_KEY, JSON.stringify(_cart$.value))
  }

  function setShippingAddress(shippingAddress: AddressDto) {
    console.log(shippingAddress)
    _cart$.value.shippingAddress = shippingAddress
    console.log(cart$.value)
  }

  function removeFromCart(item: CreateClientOrderItemDto) {
    const index = _cart$.value.items.findIndex(
      (inItem) => inItem.objectId === item.objectId && inItem.object === item.object
    )
    if (index > -1) {
      _cart$.value.items.splice(index, 1)
      toastStore.infoMessage(_I18N_PREFIX + I18NSuffix.SUMMARY, _I18N_PREFIX + 'removeItem')
    }
    sessionStorage.setItem(_STORAGE_KEY, JSON.stringify(_cart$.value))
  }

  function clearCart() {
    if (cart$.value) {
      _cart$.value = getClientOrderDto()
    }
  }

  function mapItemDataViewPropsToOrderItem(item: DataViewProps): CreateClientOrderItemDto {
    return {
      object: item.object.toUpperCase(),
      price: item.price,
      objectId: item.id,
      quantity: 1,
      to: item.to as unknown as RouteToDto,
      name: `${item.name} `,
      factory: item.factory,
      comment: `${item.subTitle}`,
      category: item.category ?? null,
      totalPrice: 0,
      status: '',
      maxAvailableQuantity: item.stock,
      id: null
    }
  }
  const getByIdQuery = (id?: string) =>
    useQuery({
      queryKey: [_GET_BY_ID_FN, id],
      queryFn: () => _fetchById(id),
      enabled: !!id,
      retry: 0
    })
  const _fetchById = async (id?: string) => {
    if (!id) return null
    const res = await api.api.clientOrderControllerFindById(parseInt(id))
    _cart$.value = res.data
    return res.data
  }

  const _createMutation = useMutation({
    mutationFn: async (order: CreateClientOrderDto) => {
      return await api.api.clientOrderControllerCreate(order)
    },
    onSuccess: async () => {
      sessionStorage.removeItem(_STORAGE_KEY)
      _cart$.value = getClientOrderDto()
    }
  })

  const _updateMutation = useMutation({
    mutationFn: async (order: UpdateClientOrderDto) => {
      return await api.api.clientOrderControllerEdit(order.id, order)
    },
    onSuccess() {
      localStorage.removeItem(_STORAGE_KEY)
    },
    onError(error: any) {
      toastStore.errorMessage(
        _I18N_PREFIX + I18NSuffix.SUMMARY,
        'error.' + error.response.data.message
      )
    }
  })
  const getAllQuery = () => {
    return useQuery({
      queryKey: [_GET_ALL_FN, queryFilters],
      queryFn: () => _fetchAll(queryFilters.value),
      retry: 0,
      enabled: !!queryFilters.value,
      placeholderData: (old) => old
    })
  }

  const _fetchAll = async (filters: ClientOrderFilter) => {
    if (!filters) return null
    const res = await api.api.clientOrderControllerFindAll({ filters })
    return res.data
  }

  function useOrderForm() {
    const id: string | undefined = userStore.getCartId?.toString() ?? undefined
    const emptyForm: CreateClientOrderDto = cart$.value
    return useFormHandler<CreateClientOrderDto, AxiosResponse<ClientOrderDto>>(
      emptyForm,
      getByIdQuery,
      _createMutation,
      _updateMutation,
      _I18N_PREFIX,
      _GET_BY_ID_FN,
      _GET_ALL_FN,
      id,
      (data) => ({
        ...data
      })
    )
  }

  return {
    addToCart,
    cart$,
    formBuilder: useOrderForm,
    getI18NPrefix: _I18N_PREFIX,
    removeFromCart,
    updateSavedCart,
    autoSaveCart,
    clearCart,
    setCartById: _fetchById,
    setShippingAddress
  }
})
