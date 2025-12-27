<template>
  <div class="card">
    <h3 class="text-2xl text-center text-blue-500">{{ t(i18nPrefix + 'news') }}</h3>
    <Carousel
      :value="items"
      :numVisible="3"
      :numScroll="1"
      :responsiveOptions="responsiveOptions"
      circular
      :autoplayInterval="interval"
    >
      <template #item="slotProps">
        <div class="border border-surface-200 dark:border-surface-700 rounded m-2 p-4">
          <div class="mt-1 ml-2 font-semibold">{{ t('global.' + slotProps.data.type) }}</div>
          <div class="mb-4 flex gap-1 items-center">
            <div class="mt-0 font-medium text-blue-500">
              {{ t('global.factory') }}: {{ slotProps.data.factory }}
            </div>
            <div class="mt-0 font-medium text-red-300">
              {{ t('global.model') }}: {{ slotProps.data.name }}
            </div>
          </div>

          <div class="mb-4 flex justify-between items-center">
            <!--            <div class="mt-0 font-medium">{{ slotProps.data.type }}</div>-->
            <div class="mt-0 font-medium">{{ slotProps.data.sub }}</div>
          </div>
          <div class="flex justify-between items-center">
            <div class="mt-0 font-semibold text-xl">{{ slotProps.data.price }}€</div>

            <span>
              <Button icon="pi pi-eye" severity="info" variant="outlined" />
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

import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
const store = usePublicDashboardStore()
const i18nPrefix = store.getI18NPrefix
const { t } = useI18n()
const { data } = store.getAllNewItems()
const interval: number = 10000
const responsiveOptions = ref([
  {
    breakpoint: '1400px',
    numVisible: 2,
    numScroll: 1
  },
  {
    breakpoint: '1199px',
    numVisible: 3,
    numScroll: 1
  },
  {
    breakpoint: '767px',
    numVisible: 2,
    numScroll: 1
  },
  {
    breakpoint: '575px',
    numVisible: 1,
    numScroll: 1
  }
])
const items = computed(() => {
  return data.value?.filter(Boolean) ?? []
})
</script>

<style scoped></style>
