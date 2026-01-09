<template>
  <div class="card mt-4">
    <h3 class="text-2xl text-center text-blue-500">{{ t(i18nPrefix + 'news') }}</h3>
    <Carousel
      :value="items"
      :numVisible="2"
      :numScroll="1"
      :responsiveOptions="responsiveOptions$"
      circular
      :autoplayInterval="interval"
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
              <div class="mt-0 font-semibold text-xl" v-if="slotProps.data.discountedPrice">
                {{ t('priceHistory.discountedPrice') }}:
                {{ NumberFormatter(slotProps.data.discountedPrice, 'euro') }}
              </div>
            </div>

            <span>
              <Button
                icon="pi pi-eye"
                severity="info"
                variant="outlined"
                @click="onClick(slotProps.data.type, slotProps.data.id, slotProps.data.category)"
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
import Carousel from 'primevue/carousel'
import Button from 'primevue/button'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { storeToRefs } from 'pinia'
import { NumberFormatter } from '@/shared/utils/formatter.utils'
import type { RoutableObjectType } from '@/types/routable.type'
import type { LegislationCategoryDto } from '@/api/Api'

const store = usePublicDashboardStore()
const i18nPrefix = store.getI18NPrefix
const { t } = useI18n()
const { data } = store.getAllNewItems()
const interval: number = 10000

const { responsiveOptions$ } = storeToRefs(store)
const items = computed(() => {
  return data.value?.filter(Boolean) ?? []
})
const onClick = (type: string, id: number, category?: LegislationCategoryDto) => {
  store.redirectToDetail(type as RoutableObjectType, id, category)
}
</script>

<style scoped></style>
