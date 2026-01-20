<template>
  <table-title-component :i18n-prefix="i18nPrefix" :category="category" />
  <data-view-wrapper-view :data="data" type="magazine" />
</template>
<script setup lang="ts">
import { useWeaponMagazineStore } from '@/stores/weapon-magazine.store'
import { storeToRefs } from 'pinia'
import { computed, onBeforeMount, watch } from 'vue'
import type { WeaponMagazineDto } from '@/api/Api'
import DataViewWrapperView, { type DataViewProps } from '@/views/shared/DataViewWrapperView.vue'
import TableTitleComponent from '@/components/__table/TableTitleComponent.vue'

const { category } = defineProps<{
  category: string
}>()
const store = useWeaponMagazineStore()
const i18nPrefix = store.getI18NPrefix
const { queryFilters$ } = storeToRefs(store)
onBeforeMount(() => {
  queryFilters$.value.category = category
})
const { data: magazine$, isError, isLoading, refetch } = store.getAll()

const data = computed<DataViewProps[]>(() => {
  if (!magazine$.value) {
    return []
  }
  return magazine$.value.data.map((magazine: WeaponMagazineDto) => {
    return {
      id: magazine.id,
      name: magazine.reference,
      factory: magazine.factory,
      category: magazine.category,
      stock: magazine.inStock,
      description: magazine.description ?? '',
      subTitle: `Calibre ${magazine.caliber.name} `,
      price: magazine.priceHistory.currentSalePrice,
      discountedPrice: magazine.priceHistory.discountedPrice
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
