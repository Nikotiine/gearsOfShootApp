import type { CreateInvoiceSupplierDto } from '@/api/Api'
import { getSupplierDto } from '@/shared/api-dto/get-supplier.dto'

export const getInvoiceDto = (): CreateInvoiceSupplierDto => {
  return {
    comment: '',
    items: [],
    dueDate: '',
    shippingCost: 0,
    supplier: getSupplierDto(),
    invoiceSupplierReference: null,
    vat: 20
  }
}
