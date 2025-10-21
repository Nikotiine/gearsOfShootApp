import { defineStore } from 'pinia'
import { useApiStore } from '@/stores/api'
import { useMutation, useQuery } from '@tanstack/vue-query'
import { getI18NPrefix, I18NSuffix } from '@/enum/I18NSuffix.enum'
import { computed, ref } from 'vue'
import type {
  CreateInvoiceSupplierDto,
  CreateItemInvoiceSupplierDto,
  InvoiceSupplierDto,
  UpdateInvoiceSupplierDto
} from '@/api/Api'

import { useFormHandler } from '@/shared/useFormHandler'
import type { AxiosResponse } from 'axios'
import { getInvoiceDto } from '@/shared/api-dto/get-invoice.dto'
import { useToastStore } from '@/stores/toast'

export const useInvoiceStore = defineStore('invoice-store', () => {
  // Appel API
  const { api } = useApiStore()
  const toastStore = useToastStore()
  const submitSuccess = ref(false)

  const tempInvoice = ref<CreateInvoiceSupplierDto | null>(null)

  const tempInvoice$ = computed(() => {
    const invoiceInStorage = JSON.parse(<string>sessionStorage.getItem(_STORAGE_KEY))

    if (!tempInvoice.value && invoiceInStorage) {
      tempInvoice.value = invoiceInStorage
    }
    if (!tempInvoice.value && !invoiceInStorage) {
      tempInvoice.value = getInvoiceDto()
    }
    // If tempinvoice vide et localsotagevide faire requete api pour le remplir
    return tempInvoice.value
  })
  const _I18N_PREFIX = 'invoice'
  const _STORAGE_KEY = 'invoice'
  const _GET_ALL_FN = 'getAllInvoices'
  const _GET_BY_ID_FN = 'getInvoiceById'
  const getAllInvoicesQuery = () =>
    useQuery({
      queryKey: [_GET_ALL_FN],
      queryFn: async () => _fetchAll(),
      retry: 0
    })
  const _fetchAll = async () => {
    const res = await api.api.supplierInvoiceControllerFindAll()
    return res.data
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
    const res = await api.api.supplierInvoiceControllerFindById(parseInt(id))
    return res.data
  }
  const _createMutation = useMutation({
    mutationFn: async (invoice: CreateInvoiceSupplierDto) => {
      return await api.api.supplierInvoiceControllerCreate(invoice)
    },
    onSuccess: async () => {
      submitSuccess.value = true
    }
  })

  const _updateMutation = useMutation({
    mutationFn: async (invoice: UpdateInvoiceSupplierDto) => {
      return await api.api.supplierInvoiceControllerUpdate(invoice.id, invoice)
    },
    onSuccess() {
      submitSuccess.value = true
    }
  })

  function setTempInvoice(invoice: CreateInvoiceSupplierDto): void {
    tempInvoice.value = invoice
    sessionStorage.setItem(_STORAGE_KEY, JSON.stringify(tempInvoice.value))
  }

  function useInvoiceForm(id?: string) {
    const emptyForm: CreateInvoiceSupplierDto = tempInvoice$.value
    return useFormHandler<CreateInvoiceSupplierDto, AxiosResponse<InvoiceSupplierDto>>(
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

  function addItemInInvoice(item: CreateItemInvoiceSupplierDto): void {
    const prefix = getI18NPrefix(_I18N_PREFIX)
    if (tempInvoice.value) {
      const isAlreadyInInvoice = tempInvoice$.value?.items.find((it) => {
        return it.object === item.object && it.objectId === item.objectId
      })
      if (isAlreadyInInvoice) {
        toastStore.warnMessage(prefix + I18NSuffix.SUMMARY, prefix + 'alreadyItemInInvoice')
        return
      }
      tempInvoice.value.items.push(item)
      toastStore.infoMessage(prefix + I18NSuffix.SUMMARY, prefix + 'itemAdded')
      sessionStorage.setItem(_STORAGE_KEY, JSON.stringify(tempInvoice.value))
    }
  }
  return {
    getAll: getAllInvoicesQuery,
    getI18NPrefix: getI18NPrefix(_I18N_PREFIX),
    submitSuccess,
    formBuilder: useInvoiceForm,
    setTempInvoice,
    addItemInInvoice,
    tempInvoice$
  }
})
