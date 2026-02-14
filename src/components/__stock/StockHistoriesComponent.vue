<template>
  <h2 class="text-xl text-center mb-2">
    {{ t(i18nPrefix + 'quantity') }} :
    <span :class="GetClassTextColorByQuantity(stockAndHistories?.quantity)">{{
      NumberFormatter(stockAndHistories?.quantity, 'pcs')
    }}</span>
  </h2>
  <DataTable
    :value="stockAndHistories?.histories"
    tableStyle="min-width: 50rem"
    paginator
    :rows="5"
    :rowsPerPageOptions="[5, 10]"
  >
    <Column field="createdAt" :header="t(i18nPrefix + 'lastUpdated')">
      <template #body="{ data }">
        {{ DateFormatter(data.createdAt, 'short') }}
      </template>
    </Column>
    <Column field="newQuantity" :header="t(i18nPrefix + 'newQuantity')"></Column>
    <Column field="previousQuantity" :header="t(i18nPrefix + 'previousQuantity')"></Column>
    <Column field="movementQuantity" :header="t(i18nPrefix + 'movementQuantity')"></Column>
    <Column field="movement" :header="t(i18nPrefix + 'movementType')">
      <template #body="{ data }">
        {{ t(i18nPrefix + '' + data.movement) }}
      </template>
    </Column>
    <Column field="reason" :header="t(i18nPrefix + 'reason')"></Column>
    <Column field="createdBy.lastName" :header="t(i18nPrefix + 'updatedBy')">
      <template #body="{ data }">
        {{ data.createdBy.lastName }}-{{ data.createdBy.firstName }}
      </template>
    </Column>
  </DataTable>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { DateFormatter, NumberFormatter } from '@/shared/utils/formatter.utils'
import { useI18n } from 'vue-i18n'
import { GetClassTextColorByQuantity } from '@/shared/utils/colors.utils'
import { useStockStore } from '@/stores/stock.store'

const store = useStockStore()
const i18nPrefix = store.getI18NPrefix
const { stockAndHistories } = storeToRefs(store)
const { t } = useI18n()
</script>

<style scoped></style>
