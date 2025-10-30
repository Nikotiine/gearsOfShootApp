<template>
  <InputGroup>
    <input-group-select
      :options="status"
      label="name"
      option-label="label"
      @option-id="onSelect($event)"
      :required="required"
      placeholder="placeholder"
      input-id="opticTypeId"
      :initial-value="findStatus"
      i18n-prefix="orderStatus."
      :disabled="disable"
    />
  </InputGroup>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue'

import InputGroupSelect from '@/components/__form/InputGroupSelect.vue'
import InputGroup from 'primevue/inputgroup'
import { getItemInvoiceStatus, type OrderStatus } from '@/shared/utils/order-status.utils'
const {
  required = false,
  currentStatus,
  disable = false
} = defineProps<{
  required?: boolean
  currentStatus: string
  disable?: boolean
}>()

const emit = defineEmits(['onSelect'])
const status = ref<OrderStatus[]>(getItemInvoiceStatus())

const findStatus = computed(() => {
  const s = status.value.find((item) => item.name === currentStatus)
  return s ? s.id : 0
})

const onSelect = (id: number) => {
  const type = status.value.find((item) => item.id === id)
  if (type) {
    emit('onSelect', type.name)
  }
}
</script>

<style scoped></style>
