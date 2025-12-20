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
    v-if="showModal"
    @on-hide="() => (showModal = false)"
    @on-select-item="(event) => OnSelectItem(event)"
  />
</template>
<script setup lang="ts">
import Button from 'primevue/button'
import type { CreateItemInvoiceSupplierDto } from '@/api/Api'
import type { PriceableObjectType } from '@/types/priceable-object.type'
import { ref } from 'vue'
import PriceHistoryModal from '@/components/__modal/PriceHistoryModal.vue'
import { useInvoiceStore } from '@/stores/invoice.store'

const store = useInvoiceStore()

const {
  objectId,
  object,
  description = ''
} = defineProps<{
  objectId: number
  object: PriceableObjectType
  description?: string
}>()
const showModal = ref<boolean>(false)
const onClickAction = () => {
  showModal.value = true
}
const OnSelectItem = (item: CreateItemInvoiceSupplierDto) => {
  showModal.value = false
  item.comment = description
  store.addItemInInvoice(item)
}
</script>

<style scoped></style>
