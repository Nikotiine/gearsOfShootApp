import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type {
  ClientOrderDto,
  ClientOrderFilter,
  CreateClientOrderDto,
  CreateClientOrderItem
} from '@/api/Api'
import { I18NSuffix } from '@/enum/I18NSuffix.enum'
import { useToastStore } from '@/stores/toast'
import { I18nPrefix } from '@/i18n/i18n-prefix.enum'
import type { DataViewProps } from '@/views/shared/DataViewWrapperView.vue'
import { getClientOrderDto } from '@/shared/api-dto/get-client-order.dto'
import { useMutation, useQuery } from '@tanstack/vue-query'
import { useApiStore } from '@/stores/api'
import { useFormHandler } from '@/shared/useFormHandler'
import type { AxiosResponse } from 'axios'
import { buildOrderFilter } from '@/shared/api-dto/query-filters.builder'

export const useCartStore = defineStore('cart-store', () => {
  const _STORAGE_KEY = 'cart'
  const _GET_BY_ID_FN = 'getOrderById'
  const _GET_ALL_FN = 'getAllOrders'
  const { api } = useApiStore()
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
    return res.data
  }

  const _createMutation = useMutation({
    mutationFn: async (order: CreateClientOrderDto) => {
      return await api.api.clientOrderControllerCreate(order)
    },
    onSuccess: async () => {
      // submitSuccess.value = true
      sessionStorage.removeItem(_STORAGE_KEY)
      _cart$.value = getClientOrderDto()
      //await router.push({ name: AdminRouterEnum.ADMIN_DASHBOARD })
    }
  })

  const _updateMutation = useMutation({
    mutationFn: async (order: ClientOrderDto) => {
      return await api.api.clientOrderControllerEdit(order.id, order)
    },
    onSuccess() {
      localStorage.removeItem(_STORAGE_KEY)
      // submitSuccess.value = true
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

  function useOrderForm(id?: string) {
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
    getI18NPrefix: _I18N_PREFIX
  }
})
