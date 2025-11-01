<template>
  <Dialog
    v-model:visible="visible"
    modal
    :header="t('priceHistory.priceHistoryModalHeader')"
    :style="{ width: '50rem' }"
    @hide="hide"
  >
    <OrderStatusInputSelect
      :current-status="currentStatus"
      @onSelect="onSelect"
      :disable="disableSelect"
    />
    <div class="text-red-500 text-center text-xl font-semibold mr-4" v-if="disableSelect">
      <p>{{ t('orderStatus.warning') }}</p>
      <Button
        icon="pi pi-exclamation-triangle"
        variant="text"
        aria-label="Filter"
        severity="danger"
        class="ml-2"
        label="Oui"
        @click="disableSelectStatus$ = false"
      />
    </div>
    <div class="flex justify-end mt-2">
      <slot name="updateBtn"></slot>
    </div>
  </Dialog>
</template>
<script setup lang="ts">
import Dialog from 'primevue/dialog'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import OrderStatusInputSelect from '@/components/__form/__specific_select/OrderStatusInputSelect.vue'
import Button from 'primevue/button'
import { useOrderStatusStore } from '@/stores/shared/order-status.store'
import { storeToRefs } from 'pinia'

export interface OrderEditStatusModalExposed {
  show: () => void
  hide: () => void
}
const orderStatusStore = useOrderStatusStore()
const { disableSelectStatus$ } = storeToRefs(orderStatusStore)
const emit = defineEmits(['onSelect', 'hide'])
const { currentStatus = 'ON_ORDER' } = defineProps<{
  currentStatus?: string
}>()
const { t } = useI18n()
const visible = ref<boolean>(false)

function show() {
  visible.value = true
}

function hide() {
  visible.value = false
  disableSelectStatus$.value = true
  emit('hide')
}
const onSelect = (status: string) => {
  emit('onSelect', status)
}

const disableSelect = computed(() => {
  return disableSelectStatus$.value && currentStatus === 'RECEIVED'
})
defineExpose({ show, hide })
</script>

<style scoped></style>
