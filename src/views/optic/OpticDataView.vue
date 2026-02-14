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
import { PublicRouterEnum } from '@/enum/router/public-router.enum'

const store = useOpticStore()
const i18nPrefix = store.getI18NPrefix
const { data: optics$ } = store.getAll()

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
      factory: optic.factory,
      subTitle: `Type: ${optic.opticType.name}| ${optic.minZoom}-${optic.maxZoom}x${optic.lensDiameter}`,
      description: optic.description ?? '',
      discountedPrice: optic.priceHistory.discountedPrice,
      category: undefined,
      to: {
        name: PublicRouterEnum.PUBLIC_OPTIC_DETAIL,
        params: {
          id: optic.id
        }
      },
      object: 'optic'
    }
  })
})
</script>

<style scoped></style>
