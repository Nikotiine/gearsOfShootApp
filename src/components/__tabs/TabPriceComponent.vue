<template>
  <TabCardComponent :props="priceInfo" v-if="priceInfo" />
  <h3 class="text-center field-capitalise-underlined-semi-bold text-xl">
    {{ t('priceHistory.histories') }}
  </h3>
  <DataTable :value="data" columnResizeMode="fit" class="mt-4">
    <template #empty> {{ t('priceHistory.notFound') }} </template>
    <Column :header="t('priceHistory.createdAt')">
      <template #body="{ data }">
        {{ DateFormatter(data.createdAt, 'short') }}
      </template>
    </Column>
    <Column :header="t('priceHistory.supplierPrice')">
      <template #body="{ data }">
        {{ NumberFormatter(data.supplierPrice, 'euro') }}
      </template>
    </Column>
    <Column :header="t('priceHistory.supplier')">
      <template #body="{ data }">
        {{ data.supplier.name }}
      </template>
    </Column>
    <Column :header="t('priceHistory.recommendedSalePrice')">
      <template #body="{ data }">
        {{ NumberFormatter(data.recommendedSalePrice, 'euro') }}
      </template>
    </Column>
    <Column :header="t('priceHistory.currentSalePrice')">
      <template #body="{ data }">
        {{ NumberFormatter(data.currentSalePrice, 'euro') }}
      </template>
    </Column>
    <Column field="createdBy.lastName" :header="t('auditInfo.createdBy')">
      <template #body="{ data }">
        {{ data.createdBy ? data.createdBy.lastName : t('global.notRegistered') }} -
        {{ data.createdBy ? data.createdBy.firstName : t('global.notRegistered') }}
      </template>
    </Column>
  </DataTable>
</template>
<script setup lang="ts">
import type { CreatePriceHistoryDto } from '@/api/Api'
import { computed } from 'vue'
import { DateFormatter, NumberFormatter } from '@/shared/utils/formatter.utils'
import { useI18n } from 'vue-i18n'
import TabCardComponent from '@/components/__tabs/TabCardComponent.vue'
import Column from 'primevue/column'
import DataTable from 'primevue/datatable'
import type { PriceableObjectType } from '@/types/priceable-object.type'
import { usePriceHistoryStore } from '@/stores/price-history.store'
const { t } = useI18n()
const store = usePriceHistoryStore()
const { price, id, type } = defineProps<{
  price: CreatePriceHistoryDto | undefined
  id: string
  type: PriceableObjectType
}>()
const { data } = store.findAll(parseInt(id), type)
const priceInfo = computed(() => {
  if (!price) return undefined
  return [
    {
      label: t('priceHistory.supplierPrice'),
      title: NumberFormatter(price.supplierPrice, 'euro')
    },
    {
      label: t('priceHistory.recommendedSalePrice'),
      title: NumberFormatter(price.recommendedSalePrice, 'euro')
    },
    {
      label: t('priceHistory.currentSalePrice'),
      title: NumberFormatter(price.currentSalePrice, 'euro')
    },
    {
      label: t('priceHistory.supplier'),
      title: price.supplier.name
    }
  ]
})
</script>

<style scoped></style>
