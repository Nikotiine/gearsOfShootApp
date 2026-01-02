<template>
  <div v-if="stock" class="space-y-4">
    <p>
      <span class="field-capitalise-underlined-semi-bold">{{ t('global.inStock') }} </span>:
      {{ stock.quantity }}
    </p>
    <p>
      <span class="field-capitalise-underlined-semi-bold">{{ t('global.lastUpdate') }} </span>:
      {{ DateFormatter(stock.updatedAt, 'short') }}
    </p>
    <h3 class="text-center field-capitalise-underlined-semi-bold text-xl">
      {{ t('stock.histories') }}
    </h3>
    <DataTable :value="stock.histories" columnResizeMode="fit" class="mt-4">
      <Column field="newQuantity" :header="t('stock.newQuantity')"></Column>
      <Column field="previousQuantity" :header="t('stock.previousQuantity')"></Column>
      <Column field="movementQuantity" :header="t('stock.movementQuantity')"></Column>
      <Column field="movement" :header="t('stock.movementType')">
        <template #body="{ data }">
          {{ t('stock.' + data.movement) }}
        </template>
      </Column>
      <Column field="createdAt" :header="t('auditInfo.createdAt')">
        <template #body="{ data }">
          {{ DateFormatter(data.createdAt, 'short') }}
        </template>
      </Column>
      <Column field="createdBy.lastName" :header="t('auditInfo.createdBy')">
        <template #body="{ data }">
          {{ data.createdBy.lastName }} - {{ data.createdBy.firstName }}
        </template>
      </Column>
      <Column field="reason" :header="t('stock.reason')"></Column>
    </DataTable>
  </div>
</template>
<script setup lang="ts">
import type { StockDto } from '@/api/Api'
import { DateFormatter } from '@/shared/utils/formatter.utils'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { useI18n } from 'vue-i18n'

const { stock } = defineProps<{
  stock: StockDto | null
}>()
const { t } = useI18n()
</script>

<style scoped></style>
