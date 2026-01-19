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
  return magazine$.value.data.map((ammo: WeaponMagazineDto) => {
    return {
      id: ammo.id,
      name: ammo.reference,
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
