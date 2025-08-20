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
