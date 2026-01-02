<template>
  <Button
    icon="pi pi-list-check"
    variant="text"
    aria-label="Filter"
    severity="warn"
    class="ml-2"
    label="Modifier les status"
    @click="onClickAction"
  />
  <OrderEditStatusModal
    ref="orderEditModalRef"
    @on-select="(value) => updateStatuses(value)"
    @hide="onHide"
    :current-status="receivedStatus"
  >
    <template #updateBtn>
      <Button
        icon="pi pi-check"
        variant="text"
        aria-label="Filter"
        class="ml-2"
        @click="updateFunction(newStatus)"
        :disabled="disableSelectStatus$"
      />
    </template>
  </OrderEditStatusModal>
</template>

<script setup lang="ts">
import OrderEditStatusModal, {
  type OrderEditStatusModalExposed
} from '@/components/__modal/OrderEditStatusModal.vue'
import { computed, ref } from 'vue'
import Button from 'primevue/button'
import { useInvoiceStore } from '@/stores/invoice.store'
import { useOrderStatusStore } from '@/stores/shared/order-status.store'
import { storeToRefs } from 'pinia'

const store = useInvoiceStore()
const orderStatusStore = useOrderStatusStore()
const { disableSelectStatus$ } = storeToRefs(orderStatusStore)
const newStatus = ref('')
const emit = defineEmits(['updated'])
const { itemIds, isAllReceived = false } = defineProps<{
  itemIds: number[]
  isAllReceived?: boolean
}>()
const onClickAction = () => {
  orderEditModalRef.value?.show()
}
const orderEditModalRef = ref<OrderEditStatusModalExposed | null>(null)
const updateStatuses = (status: string) => {
  newStatus.value = status
}
const onHide = () => {
  console.log('hide', itemIds)
}
function updateFunction(status: string): void {
  store.updateBulkItem.mutate({ ids: itemIds, status })
  emit('updated')
  orderEditModalRef.value?.hide()
}
const receivedStatus = computed(() => (isAllReceived ? 'RECEIVED' : undefined))
</script>

<style scoped></style>
