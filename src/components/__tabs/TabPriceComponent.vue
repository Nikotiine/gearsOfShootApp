<template>
  <TabCardComponent :props="priceInfo" v-if="priceInfo" />
  <h3 class="text-center field-capitalise-underlined-semi-bold text-xl">
    {{ t(i18nPrefix + 'histories') }}
  </h3>
  <DataTable :value="data" columnResizeMode="fit" class="mt-4">
    <template #empty> {{ t(i18nPrefix + 'notFound') }} </template>
    <Column :header="t(i18nPrefix + 'createdAt')">
      <template #body="{ data }">
        {{ DateFormatter(data.createdAt, 'short') }}
      </template>
    </Column>
    <Column :header="t(i18nPrefix + 'supplierPrice')">
      <template #body="{ data }">
        {{ NumberFormatter(data.supplierPrice, 'euro') }}
      </template>
    </Column>
    <Column :header="t(i18nPrefix + 'supplier')">
      <template #body="{ data }">
        {{ data.supplier.name }}
      </template>
    </Column>
    <Column :header="t(i18nPrefix + 'recommendedSalePrice')">
      <template #body="{ data }">
        {{ NumberFormatter(data.recommendedSalePrice, 'euro') }}
      </template>
    </Column>
    <Column :header="t(i18nPrefix + 'currentSalePrice')">
      <template #body="{ data }">
        {{ NumberFormatter(data.currentSalePrice, 'euro') }}
      </template>
    </Column>
    <Column :header="t(i18nPrefix + 'discountedPrice')">
      <template #body="{ data }">
        {{ NumberFormatter(data.discountedPrice, 'euro') }}
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
const i18nPrefix = store.getI18NPrefix
const { data } = store.findAll(parseInt(id), type)
const priceInfo = computed(() => {
  if (!price) return undefined
  return [
    {
      label: t(i18nPrefix + 'supplierPrice'),
      title: NumberFormatter(price.supplierPrice, 'euro')
    },
    {
      label: t(i18nPrefix + 'recommendedSalePrice'),
      title: NumberFormatter(price.recommendedSalePrice, 'euro')
    },
    {
      label: t(i18nPrefix + 'currentSalePrice'),
      title: NumberFormatter(price.currentSalePrice, 'euro')
    },
    {
      label: t(i18nPrefix + 'supplier'),
      title: price.supplier.name
    }
  ]
})
</script>

<style scoped></style>
