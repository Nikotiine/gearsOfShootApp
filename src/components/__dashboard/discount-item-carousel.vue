<template>
  <div class="card mt-4">
    <h3 class="text-2xl text-center text-blue-500">{{ t(i18nPrefix + 'discounted') }}</h3>
    <Carousel
      :value="items"
      :numVisible="3"
      :numScroll="1"
      :responsiveOptions="responsiveOptions$"
      :circular="items.length > 3"
      :autoplayInterval="items.length > 3 ? interval : null"
      show-indicators
    >
      <template #item="slotProps">
        <div class="border border-surface-200 dark:border-surface-700 rounded m-2 p-4">
          <div class="mt-1 ml-2 font-semibold text-center text-blue-500 text-2xl">
            {{ t('global.' + slotProps.data.type) }}
          </div>
          <div class="mb-4 flex gap-2 items-center">
            <div class="mt-0 font-medium text-blue-500">
              {{ t('global.factory') }}: {{ slotProps.data.factory }}
            </div>
            <div class="mt-0 font-medium text-red-300">
              {{ t('global.model') }}: {{ slotProps.data.name }}
            </div>
            <div class="mt-0 font-medium ml-auto">
              {{ t(i18nPrefix + 'precentOfDiscount') }}
              {{ NumberFormatter(slotProps.data.precentOfDiscount, 'percent') }}
            </div>
          </div>

          <div class="mb-4 flex justify-between items-center">
            <div class="mt-0 font-medium">{{ slotProps.data.sub }}</div>
          </div>
          <div class="flex justify-between items-center">
            <div class="flex gap-4">
              <div
                class="mt-0 font-semibold text-xl"
                :class="slotProps.data.discountedPrice ? 'line-through' : ''"
              >
                {{ t('global.price') }}: {{ NumberFormatter(slotProps.data.price, 'euro') }}
              </div>
              <div class="mt-0 font-semibold text-xl">
                {{ t('priceHistory.discountedPrice') }}:
                {{ NumberFormatter(slotProps.data.discountedPrice, 'euro') }}
              </div>
            </div>

            <span>
              <Button
                icon="pi pi-eye"
                severity="info"
                variant="outlined"
                @click="onClick(slotProps.data.type, slotProps.data.id)"
              />
            </span>
          </div>
        </div>
      </template>
    </Carousel>
  </div>
</template>
<script setup lang="ts">
import { usePublicDashboardStore } from '@/stores/public-dashboard.store'
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'
import Carousel from 'primevue/carousel'
import Button from 'primevue/button'
import { storeToRefs } from 'pinia'
import { NumberFormatter } from '@/shared/utils/formatter.utils'
import type { RoutableObjectType } from '@/types/routable.type'

const store = usePublicDashboardStore()
const i18nPrefix = store.getI18NPrefix
const { t } = useI18n()
const { data } = store.getAllDiscountItems()
const { responsiveOptions$ } = storeToRefs(store)

const interval: number = 10000
const items = computed(() => {
  return data.value?.filter(Boolean) ?? []
})
const onClick = (type: string, id: number) => {
  store.redirectToDetail(type as RoutableObjectType, id)
}
</script>

<style scoped></style>
