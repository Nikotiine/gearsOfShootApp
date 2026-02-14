<template>
  <Dialog
    v-model:visible="visible"
    modal
    maximizable
    @hide="onHide"
    :header="t(i18nPrefix + 'priceHistoryModalHeader')"
    :style="{ width: '50rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
  >
    <div class="card">
      <DataTable :value="data">
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
        <Column :header="t(i18nPrefix + 'currentSalePrice')">
          <template #body="{ data }">
            {{ data.supplier.name }}
          </template>
        </Column>
        <Column :header="t(i18nPrefix + 'currentSalePrice')">
          <template #body="{ data }">
            <Button
              :label="t(i18nPrefix + 'addToInvoice')"
              severity="info"
              @click="onClickAction(data)"
              text
            />
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
import Button from 'primevue/button'
import type { CreateItemInvoiceSupplierDto, PriceHistoryDto } from '@/api/Api'

export interface PriceHistoryModalExposed {
  show: () => void
  hide: () => void
  onClickAction: () => CreateItemInvoiceSupplierDto
}
const { t } = useI18n()
const store = usePriceHistoryStore()
const i18nPrefix = store.getI18NPrefix

const emit = defineEmits<{
  (e: 'onSelectItem', data: CreateItemInvoiceSupplierDto): void
  (e: 'onHide'): void
}>()
const { id, type } = defineProps<{
  id?: number
  type?: PriceableObjectType
}>()
const visible = ref<boolean>(true)
const { data } = store.findAll(id, type)

function onHide(): void {
  visible.value = false
  emit('onHide')
}

function onClickAction(data: PriceHistoryDto): void {
  const item: CreateItemInvoiceSupplierDto = {
    object: data.object,
    objectId: data.objectId,
    supplierPriceHT: data.supplierPrice,
    quantity: 1,
    accountHT: 0,
    comment: '',
    status: 'VALIDATE_ORDER',
    id: null,
    description: ''
  }
  emit('onSelectItem', item)
}
</script>

<style scoped></style>
