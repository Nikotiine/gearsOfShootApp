<template>
  <table-title-component :i18n-prefix="i18nPrefix" :category="category" />
  <data-view-wrapper-view :data="data" type="riffle" />
</template>

<script setup lang="ts">
import { useRiffleStore } from '@/stores/riffle.store'
import { storeToRefs } from 'pinia'
import { computed, onBeforeMount, watch } from 'vue'
import type { HandGunDto, RiffleDto } from '@/api/Api'
import DataViewWrapperView, { type DataViewProps } from '@/views/shared/DataViewWrapperView.vue'
import TableTitleComponent from '@/components/__table/TableTitleComponent.vue'

const { category } = defineProps<{
  category: string
}>()
const store = useRiffleStore()
const i18nPrefix = store.getI18NPrefix
const { queryFilters$ } = storeToRefs(store)
onBeforeMount(() => {
  queryFilters$.value.category = category
})
const { data: riffle$, isLoading: datasIsloading, isError, refetch } = store.getAll()
const data = computed<DataViewProps[]>(() => {
  if (!riffle$.value) {
    return []
  }
  return riffle$.value.data.map((ammo: RiffleDto) => {
    return {
      id: ammo.id,
      name: ammo.name,
      factoryName: ammo.factory.name,
      category: ammo.category,
      stock: ammo.inStock,
      description: ammo.description ?? '',
      subTitle: `Calibre ${ammo.caliber.name} `,
      price: ammo.priceHistory.currentSalePrice
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
