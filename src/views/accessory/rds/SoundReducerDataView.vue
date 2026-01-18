<template>
  <data-view-wrapper-view :data="data" type="optic" />
</template>
<script setup lang="ts">
import { useSoundReducerStore } from '@/stores/sound-noise-reducer.store'
import { computed } from 'vue'

import type { SoundNoiseReducerDto } from '@/api/Api'
import DataViewWrapperView, { type DataViewProps } from '@/views/shared/DataViewWrapperView.vue'

const store = useSoundReducerStore()
const { data: rds, isError, isLoading } = store.getAll()
const data = computed<DataViewProps[]>(() => {
  if (!rds.value?.data) {
    return []
  }

  return rds.value.data.map((rds: SoundNoiseReducerDto) => ({
    id: rds.id,
    name: rds.name ?? '',
    stock: rds.inStock ?? 0,
    price: rds.priceHistory.currentSalePrice ?? 0,
    factoryName: rds.factory.name ?? '',
    subTitle: `Pour calibre:${rds.caliber.name}`,
    description: rds.description ?? ''
  }))
})
</script>

<style scoped></style>
