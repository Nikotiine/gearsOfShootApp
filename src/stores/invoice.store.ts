import { defineStore } from 'pinia'
import { useApiStore } from '@/stores/api'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { getI18NPrefix, I18NSuffix } from '@/enum/I18NSuffix.enum'
import { computed, ref } from 'vue'
import type {
  CountInvoicesDto,
  CreateInvoiceSupplierDto,
  CreateItemInvoiceSupplierDto,
  InvoiceSupplierDto,
  UpdateBulkItemStatusDto,
  UpdateInvoiceSupplierDto
} from '@/api/Api'

import { useFormHandler } from '@/shared/useFormHandler'
import type { AxiosResponse } from 'axios'
import { getInvoiceDto } from '@/shared/api-dto/get-invoice.dto'
import { useToastStore } from '@/stores/toast'
import { useRouter } from 'vue-router'
import { AdminRouterEnum } from '@/enum/router/admin-router.enum'

export const useInvoiceStore = defineStore('invoice-store', () => {
  // Appel API
  const { api } = useApiStore()
  const queryClient = useQueryClient()
  const toastStore = useToastStore()
  const router = useRouter()

  // PRIVATE FIELD
  const _I18N_PREFIX = 'invoice'
  const _STORAGE_KEY = 'invoice'
  const _GET_ALL_FN = 'getAllInvoices'
  const _GET_BY_ID_FN = 'getInvoiceById'
  const _COUNT_FN = 'countInvoices'

  // REFS
  const submitSuccess = ref(false)
  const statusFilter = ref<string | undefined>(undefined)
  const tempInvoice = ref<CreateInvoiceSupplierDto>({ ...getInvoiceDto() })

  // Private Computed
  const tempInvoice$ = computed(() => {
    const invoiceInStorage = JSON.parse(<string>sessionStorage.getItem(_STORAGE_KEY))

    if (invoiceInStorage) {
      tempInvoice.value = invoiceInStorage
    }
    return tempInvoice.value
  })

  // PRIVATE TYPE
  type UpdateItemVars = { itemId: number; status: string }
  // QUERY
  const getAllInvoicesQuery = () =>
    useQuery({
      queryKey: [_GET_ALL_FN, statusFilter],
      queryFn: async () => _fetchAll(),
      retry: 0
    })
  const _fetchAll = async () => {
    const res = await api.api.supplierInvoiceControllerFindAll({ status: statusFilter.value })
    return res.data.map((invoice) => {
      return {
        ...invoice,
        dueDate: new Date(invoice.dueDate)
      }
    })
  }

  const countInvoicesQuery = () =>
    useQuery({
      queryKey: [_COUNT_FN],
      queryFn: async () => _count(),
      retry: 0
    })

  const _count = async (): Promise<CountInvoicesDto> => {
    const res = await api.api.supplierInvoiceControllerCountInvoice()
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
      invoice.items.forEach((item) => {
        item.status = 'IN_ORDER'
      })
      return await api.api.supplierInvoiceControllerCreate(invoice)
    },
    onSuccess: async () => {
      submitSuccess.value = true
      sessionStorage.removeItem(_STORAGE_KEY)
      tempInvoice.value = getInvoiceDto()
      await router.push({ name: AdminRouterEnum.ADMIN_DASHBOARD })
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

  const updateItemMutation = useMutation({
    mutationFn: async ({ itemId, status }: UpdateItemVars) => {
      if (!itemId) return

      return await api.api.invoiceItemControllerUpdateStatus(itemId, { status: status })
    },
    onSuccess: async () => {
      /*  const prefix = getI18NPrefix(_I18N_PREFIX)
  submitSuccess.value = true
  await queryClient.invalidateQueries({ queryKey: [_GET_BY_ID_FN] })
  toastStore.successMessage(prefix + I18NSuffix.SUMMARY, prefix + 'statusUpdated')*/
      await _successInvoiceStatusMutation(_GET_BY_ID_FN, 'statusUpdated')
    },
    onError: async () => {
      /* const prefix = getI18NPrefix(_I18N_PREFIX)
      toastStore.errorMessage(prefix + I18NSuffix.SUMMARY, prefix + 'statusUpdatedFailed')*/
      _failedInvoiceStatusMutation('statusUpdatedFailed')
    }
  })

  const updateBulkItemMutation = useMutation({
    mutationFn: async (body: UpdateBulkItemStatusDto) => {
      if (body.ids.length === 0) return

      return await api.api.invoiceItemControllerUpdateStatuses(body)
    },
    onSuccess: async () => {
      /*  const prefix = getI18NPrefix(_I18N_PREFIX)
      submitSuccess.value = true
      await queryClient.invalidateQueries({ queryKey: [_GET_BY_ID_FN] })
      toastStore.successMessage(prefix + I18NSuffix.SUMMARY, prefix + 'statusUpdated')*/
      await _successInvoiceStatusMutation(_GET_BY_ID_FN, 'statusUpdated')
    },
    onError: () => {
      /* const prefix = getI18NPrefix(_I18N_PREFIX)
      toastStore.errorMessage(prefix + I18NSuffix.SUMMARY, prefix + 'statusUpdatedFailed')*/
      _failedInvoiceStatusMutation('statusUpdatedFailed')
    }
  })

  const archiveInvoiceMutation = useMutation({
    mutationFn: async (id?: number) => {
      if (!id) return
      return await api.api.supplierInvoiceControllerArchive(id)
    },
    onSuccess: async () => {
      /*      const prefix = getI18NPrefix(_I18N_PREFIX)
      submitSuccess.value = true
      await queryClient.invalidateQueries({ queryKey: [_GET_ALL_FN] })
      toastStore.successMessage(prefix + I18NSuffix.SUMMARY, prefix + 'archived')*/
      await _successInvoiceStatusMutation(_GET_ALL_FN, 'archived')
    },
    onError: async () => {
      /*  const prefix = getI18NPrefix(_I18N_PREFIX)
      toastStore.errorMessage(prefix + I18NSuffix.SUMMARY, prefix + 'archivedFailed')*/
      _failedInvoiceStatusMutation('archivedFailed')
    }
  })

  const _deleteInvoiceMutation = useMutation({
    mutationFn: async (id: number) => {
      return await api.api.supplierInvoiceControllerDelete(id)
    },
    onSuccess: async (): Promise<void> => {
      await _successInvoiceStatusMutation(_GET_ALL_FN, I18NSuffix.DELETED)
    }
  })

  const deleteFunction = (id: number) => {
    _deleteInvoiceMutation.mutate(id)
  }

  // FORM BUILDER
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

  // PRIVATE FUNC
  async function _successInvoiceStatusMutation(queryKey: string, successMessage: string) {
    const prefix = getI18NPrefix(_I18N_PREFIX)
    await queryClient.invalidateQueries({ queryKey: [queryKey] })
    toastStore.successMessage(prefix + I18NSuffix.SUMMARY, prefix + successMessage)
  }
  function _failedInvoiceStatusMutation(failureMessage: string) {
    const prefix = getI18NPrefix(_I18N_PREFIX)
    toastStore.errorMessage(prefix + I18NSuffix.SUMMARY, prefix + failureMessage)
  }

  return {
    getAll: getAllInvoicesQuery,
    getI18NPrefix: getI18NPrefix(_I18N_PREFIX),
    submitSuccess,
    getById: getByIdQuery,
    formBuilder: useInvoiceForm,
    addItemInInvoice,
    tempInvoice$,
    updateItem: updateItemMutation,
    updateBulkItem: updateBulkItemMutation,
    archive: archiveInvoiceMutation,
    count: countInvoicesQuery,
    statusFilter$: statusFilter,
    delete: deleteFunction
  }
})
