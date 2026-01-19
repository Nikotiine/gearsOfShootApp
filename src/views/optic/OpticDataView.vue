<template>
  <table-title-component :i18n-prefix="i18nPrefix" />
  <data-view-wrapper-view :data="data" type="optic" />
</template>
<script setup lang="ts">
import { useOpticStore } from '@/stores/optic.store'
import type { OpticDto } from '@/api/Api'
import DataViewWrapperView, { type DataViewProps } from '@/views/shared/DataViewWrapperView.vue'
import { computed } from 'vue'
import TableTitleComponent from '@/components/__table/TableTitleComponent.vue'

const store = useOpticStore()
const i18nPrefix = store.getI18NPrefix
const { data: optics$, isError, isLoading, refetch } = store.getAll()

const data = computed<DataViewProps[]>(() => {
  if (!optics$.value?.data) {
    return []
  }

  return optics$.value?.data.map((optic: OpticDto) => {
    return {
      id: optic.id,
      name: optic.name,
      stock: optic.inStock ?? 0,
      price: optic.priceHistory.currentSalePrice ?? 0,
      factoryName: optic.factory.name ?? '',
      subTitle: `Type: ${optic.opticType.name}`,
      description: optic.description ?? ''
    }
  })
})
</script>

<style scoped></style>
