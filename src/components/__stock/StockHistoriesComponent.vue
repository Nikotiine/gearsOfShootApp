<template>
  <h2 class="text-xl text-center mb-2">
    {{ t('stock.quantity') }} :
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
    <Column field="createdAt" :header="t('stock.lastUpdated')">
      <template #body="{ data }">
        {{ DateFormatter(data.createdAt, 'short') }}
      </template>
    </Column>
    <Column field="newQuantity" :header="t('stock.newQuantity')"></Column>
    <Column field="previousQuantity" :header="t('stock.previousQuantity')"></Column>
    <Column field="movementQuantity" :header="t('stock.movementQuantity')"></Column>
    <Column field="movement" :header="t('stock.movementType')">
      <template #body="{ data }">
        {{ t('stock.' + data.movement) }}
      </template>
    </Column>
    <Column field="reason" :header="t('stock.reason')"></Column>
    <Column field="createdBy.lastName" :header="t('stock.updatedBy')">
      <template #body="{ data }">
        {{ data.createdBy.lastName }}-{{ data.createdBy.firstName }}
      </template>
    </Column>
  </DataTable>
</template>
<script setup lang="ts">
import { useStockStore } from '@/stores/stock.store'
import { storeToRefs } from 'pinia'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { DateFormatter, NumberFormatter } from '@/shared/utils/formatter.utils'
import { useI18n } from 'vue-i18n'
import { GetClassTextColorByQuantity } from '@/shared/utils/colors.utils'

const store = useStockStore()
const { stockAndHistories } = storeToRefs(store)
const { t } = useI18n()
</script>

<style scoped></style>
