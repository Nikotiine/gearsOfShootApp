<template>
  <table-title-component :i18n-prefix="i18nPrefix" :category="category" />
  <data-view-wrapper-view :data="data" type="ammunition" />
</template>
<script setup lang="ts">
import { useAmmunitionStore } from '@/stores/ammunition.store'
import { storeToRefs } from 'pinia'
import { computed, onBeforeMount, watch } from 'vue'

import type { AmmunitionDto } from '@/api/Api'
import TableTitleComponent from '@/components/__table/TableTitleComponent.vue'
import DataViewWrapperView, { type DataViewProps } from '@/views/shared/DataViewWrapperView.vue'

const { category } = defineProps<{
  category: string
}>()
const store = useAmmunitionStore()
const { queryFilters$ } = storeToRefs(store)
onBeforeMount(() => {
  queryFilters$.value.category = category
})
const i18nPrefix = store.getI18NPrefix
const { data: ammunition$, refetch, isError, isLoading: storeIsLoading } = store.getByCategory()
const data = computed<DataViewProps[]>(() => {
  if (!ammunition$.value) {
    return []
  }
  return ammunition$.value.data.map((ammo: AmmunitionDto) => {
    return {
      id: ammo.id,
      name: ammo.name,
      factory: ammo.factory,
      category: ammo.category,
      stock: ammo.inStock,
      description: ammo.description ?? '',
      subTitle: `Calibre ${ammo.caliber.name}, Packaging: ${ammo.packaging}`,
      price: ammo.priceHistory.currentSalePrice,
      discountedPrice: ammo.priceHistory.discountedPrice
    }
  })
})
watch(
  () => category,
  (newCategory) => {
    if (newCategory !== queryFilters$.value.category) {
      queryFilters$.value.category = newCategory
      refetch()
    }
  }
)
</script>

<style scoped></style>
