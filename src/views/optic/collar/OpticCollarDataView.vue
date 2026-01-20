<template>
  <table-title-component :i18n-prefix="i18nPrefix" />
  <data-view-wrapper-view :data="data" type="optic-collar" />
</template>
<script setup lang="ts">
import { useOpticCollarStore } from '@/stores/optic-collar.store'

import { computed } from 'vue'
import DataViewWrapperView, { type DataViewProps } from '@/views/shared/DataViewWrapperView.vue'
import type { OpticCollarDto } from '@/api/Api'
import TableTitleComponent from '@/components/__table/TableTitleComponent.vue'

const store = useOpticCollarStore()

const i18nPrefix = store.getI18NPrefix
const { data: collar$, isSuccess, isError, isLoading, refetch } = store.getAll()
const data = computed<DataViewProps[]>(() => {
  if (!collar$.value) {
    return []
  }
  return collar$.value.data.map((collar: OpticCollarDto) => {
    return {
      id: collar.id,
      name: collar.name,
      stock: collar.inStock ?? 0,
      price: collar.priceHistory.currentSalePrice ?? 0,
      factory: collar.factory,
      subTitle: `Rail: ${collar.railSize.name}`,
      description: collar.description ?? '',
      category: null
    }
  })
})
</script>

<style scoped></style>
