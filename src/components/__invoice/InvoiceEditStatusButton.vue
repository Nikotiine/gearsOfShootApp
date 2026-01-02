<template>
  <Button
    icon="pi pi-cog"
    variant="text"
    aria-label="Filter"
    severity="secondary"
    class="ml-2"
    @click="onClickAction"
  />
  <OrderEditStatusModal
    :current-status="currentStatus"
    ref="orderEditModalRef"
    @on-select="(value) => updateStatus(value)"
    @hide="onHide"
  >
    <template #updateBtn>
      <Button
        icon="pi pi-check"
        variant="text"
        :severity="disableBtn ? 'secondary' : 'primary'"
        aria-label="Filter"
        class="ml-2"
        @click="updateFunction(newStatus, itemId)"
        :disabled="disableBtn"
      />
    </template>
  </OrderEditStatusModal>
</template>
<script setup lang="ts">
import Button from 'primevue/button'
import { ref } from 'vue'
import OrderEditStatusModal, {
  type OrderEditStatusModalExposed
} from '@/components/__modal/OrderEditStatusModal.vue'
import { useInvoiceStore } from '@/stores/invoice.store'

const store = useInvoiceStore()
const { currentStatus, itemId } = defineProps<{
  currentStatus: string
  itemId: number
}>()
const orderEditModalRef = ref<OrderEditStatusModalExposed | null>(null)
const newStatus = ref(currentStatus)
const disableBtn = ref(true)
const updateStatus = (value: string) => {
  if (value !== newStatus.value) {
    newStatus.value = value
    disableBtn.value = false
  }
}
const onClickAction = () => {
  orderEditModalRef.value?.show()
}
function updateFunction(status: string, itemId: number): void {
  store.updateItem.mutate({ itemId, status })
  orderEditModalRef.value?.hide()
}
const onHide = () => {
  disableBtn.value = true
  newStatus.value = currentStatus
}
</script>

<style scoped></style>
