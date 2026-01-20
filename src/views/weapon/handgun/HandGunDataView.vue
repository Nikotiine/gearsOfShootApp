<template>
  <table-title-component :i18n-prefix="i18nPrefix" :category="category" />
  <data-view-wrapper-view :data="data" type="handgun" />
</template>
<script setup lang="ts">
import { useHandGunStore } from '@/stores/hand-gun.store'
import { storeToRefs } from 'pinia'
import { computed, onBeforeMount, watch } from 'vue'
import type { HandGunDto } from '@/api/Api'
import DataViewWrapperView, { type DataViewProps } from '@/views/shared/DataViewWrapperView.vue'
import TableTitleComponent from '@/components/__table/TableTitleComponent.vue'

const { category } = defineProps<{
  category: string
}>()
const store = useHandGunStore()
const { queryFilters$ } = storeToRefs(store)
onBeforeMount(() => {
  queryFilters$.value.category = category
})
const i18nPrefix = store.getI18NPrefix
const { data: handgun$, isLoading, isError, refetch } = store.getAll()
const data = computed<DataViewProps[]>(() => {
  if (!handgun$.value) {
    return []
  }
  return handgun$.value.data.map((handgun: HandGunDto) => {
    return {
      id: handgun.id,
      name: handgun.name,
      factory: handgun.factory,
      category: handgun.category,
      stock: handgun.inStock,
      description: handgun.description ?? '',
      subTitle: `${handgun.type.name} - Calibre ${handgun.caliber.name} `,
      price: handgun.priceHistory.currentSalePrice,
      discountedPrice: handgun.priceHistory.discountedPrice
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
