<template>
  <Dialog
    v-model:visible="visible"
    modal
    :header="t('priceHistory.priceHistoryModalHeader')"
    :style="{ width: '50rem' }"
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
        @click="disable = false"
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

export interface OrderEditStatusModalExposed {
  show: () => void
  hide: () => void
}
const emit = defineEmits(['onSelect', 'hide'])
const { currentStatus } = defineProps<{
  currentStatus: string
}>()
const { t } = useI18n()
const visible = ref<boolean>(false)
const disable = ref<boolean>(true)
function show() {
  visible.value = true
}

function hide() {
  visible.value = false
  disable.value = true
  emit('hide')
}
const onSelect = (status: string) => {
  emit('onSelect', status)
}

const disableSelect = computed(() => {
  return disable.value && currentStatus === 'RECEIVED'
})
defineExpose({ show, hide })
</script>

<style scoped></style>
