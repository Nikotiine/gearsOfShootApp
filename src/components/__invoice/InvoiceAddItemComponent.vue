<template>
  <Button
    icon="pi pi-cart-plus"
    aria-label="Save"
    type="button"
    severity="info"
    @click="onClickAction"
  />
  <price-history-modal
    ref="priceHistoryModalRef"
    :id="objectId"
    :type="object"
    v-if="objectId"
    @on-select-item="(event) => OnSelectItem(event)"
  />
</template>
<script setup lang="ts">
import Button from 'primevue/button'
import type { CreateItemInvoiceSupplierDto } from '@/api/Api'
import type { PriceableObjectType } from '@/types/priceable-object.type'
import { ref } from 'vue'
import PriceHistoryModal, {
  type PriceHistoryModalExposed
} from '@/components/__modal/PriceHistoryModal.vue'
import { useInvoiceStore } from '@/stores/invoice.store'
import { useToastStore } from '@/stores/toast'
const store = useInvoiceStore()

const priceHistoryModalRef = ref<PriceHistoryModalExposed | null>(null)
const { objectId, object } = defineProps<{
  objectId: string
  object: PriceableObjectType
}>()
const onClickAction = () => {
  priceHistoryModalRef.value?.show()
}
const OnSelectItem = (item: CreateItemInvoiceSupplierDto) => {
  priceHistoryModalRef.value?.hide()

  store.addItemInInvoice(item)
}
</script>

<style scoped></style>
