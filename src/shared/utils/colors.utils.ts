export function GetClassTextColorByQuantity(quantity?: number) {
  if (!quantity) {
    return ''
  }
  if (quantity > 20) {
    return 'text-blue-500'
  } else if (quantity > 10 && quantity < 21) {
    return 'text-green-600'
  } else if (quantity > 2 && quantity < 11) {
    return 'text-orange-600'
  } else {
    return 'text-red-500'
  }
}
export function GetClassTextColorByOrderStatus(status: string): string {
  if (!status) {
    return ''
  }
  switch (status) {
    case 'IN_ORDER':
      return 'text-orange-500'
    case 'SHIPPING':
      return 'text-green-600'
    case 'RECEIVED':
      return 'text-blue-500'
    case 'ARCHIVE':
      return 'text-black-600'
    case 'CANCELED':
      return 'text-red-500'
    default:
      return 'text-orange-500'
  }
}
