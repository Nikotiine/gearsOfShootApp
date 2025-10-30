export interface OrderStatus {
  name: string
  id: number
  label: string
}

export const getItemInvoiceStatus = (): OrderStatus[] => {
  return [
    { name: 'IN_ORDER', id: 1, label: 'En commande' },
    { name: 'SHIPPING', id: 2, label: 'Expedie' },
    { name: 'RECEIVED', id: 3, label: 'Recue' },
    { name: 'CANCELED', id: 4, label: 'Annulée' }
  ]
}
export const getInvoiceStatus = (): OrderStatus[] => {
  return [
    { name: 'IN_ORDER', id: 1, label: 'En commande' },
    { name: 'SHIPPING', id: 2, label: 'Expedie' },
    { name: 'RECEIVED', id: 3, label: 'Recue' },
    { name: 'CANCELED', id: 4, label: 'Annulée' },
    { name: 'ARCHIVE', id: 5, label: 'Archivée' }
  ]
}
