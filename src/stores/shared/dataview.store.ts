import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoutableObjectStore } from '@/stores/shared/routable-object.store'

export const useDataViewStore = defineStore('dataview', () => {
  const { t } = useI18n()
  const routableObjectStore = useRoutableObjectStore()
  const sortOptions = ref([
    { label: t('dataView.orderHigh'), value: '!price' },
    { label: t('dataView.orderLow'), value: 'price' }
  ])

  function getSeverity(inStock: number) {
    return inStock === 0 ? 'danger' : 'success'
  }
  const sortKey = ref()
  const sortOrder = ref()
  const sortField = ref()
  const layout = ref('list')
  const options = ref(['list', 'grid'])
  const onSortChange = (event: any) => {
    const value = event.value.value
    const sortValue = event.value
    if (value.indexOf('!') === 0) {
      sortOrder.value = -1
      sortField.value = value.substring(1, value.length)
      sortKey.value = sortValue
    } else {
      sortOrder.value = 1
      sortField.value = value
      sortKey.value = sortValue
    }
  }

  return {
    sortOptions,
    getSeverity,
    layout,
    layoutOptions: options,
    onSortChange,
    sortField,
    sortKey,
    sortOrder,
    redirectToDetail: routableObjectStore.redirectToDetail
  }
})
