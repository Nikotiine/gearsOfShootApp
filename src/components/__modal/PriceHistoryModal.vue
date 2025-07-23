<template>
  <Dialog
    v-model:visible="visible"
    modal
    maximizable
    :header="t('priceHistory.priceHistoryModalHeader')"
    :style="{ width: '50rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
  >
    <div class="card">
      <DataTable :value="data">
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
      </DataTable>
    </div>
  </Dialog>
</template>
<script setup lang="ts">
import Dialog from 'primevue/dialog'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import type { PriceableObjectType } from '@/types/priceable-object.type'
import { usePriceHistoryStore } from '@/stores/price-history.store'
import { DateFormatter, NumberFormatter } from '@/shared/utils/formatter.utils'

export interface PriceHistoryModalExposed {
  show: () => void
  hide: () => void
}
const { t } = useI18n()
const store = usePriceHistoryStore()
const { id, type } = defineProps<{
  id?: string
  type?: PriceableObjectType
}>()
const visible = ref<boolean>(false)
const { data } = store.findAll(id, type)

function show() {
  visible.value = true
}

function hide() {
  visible.value = false
}
defineExpose({ show, hide })
</script>

<style scoped></style>
