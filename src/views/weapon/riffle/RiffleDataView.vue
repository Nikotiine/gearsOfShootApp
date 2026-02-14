<template>
  <table-title-component :i18n-prefix="i18nPrefix" :category="category" />
  <data-view-wrapper-view :data="data" type="riffle" />
</template>

<script setup lang="ts">
import { useRiffleStore } from '@/stores/riffle.store'
import { storeToRefs } from 'pinia'
import { computed, onBeforeMount, watch } from 'vue'
import type { RiffleDto } from '@/api/Api'
import DataViewWrapperView, { type DataViewProps } from '@/views/shared/DataViewWrapperView.vue'
import TableTitleComponent from '@/components/__table/TableTitleComponent.vue'
import { PublicRouterEnum } from '@/enum/router/public-router.enum'

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
  return riffle$.value.data.map((riffle: RiffleDto) => {
    return {
      id: riffle.id,
      name: riffle.name,
      factory: riffle.factory,
      category: riffle.category,
      stock: riffle.inStock ?? 0,
      description: riffle.description ?? '',
      subTitle: `${riffle.type.name} - Calibre ${riffle.caliber.name} `,
      price: riffle.priceHistory.currentSalePrice,
      discountedPrice: riffle.priceHistory.discountedPrice,
      object: 'riffle',
      to: {
        name: PublicRouterEnum.PUBLIC_RIFFLE_DETAIL,
        params: {
          id: riffle.id,
          category: riffle.category.name
        }
      }
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
