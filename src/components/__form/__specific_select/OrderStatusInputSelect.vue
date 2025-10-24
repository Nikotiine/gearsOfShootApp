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
const {
  required = false,
  currentStatus,
  disable = false
} = defineProps<{
  required?: boolean
  currentStatus: string
  disable?: boolean
}>()
interface OrderStatus {
  name: string
  id: number
  label: string
}
const emit = defineEmits(['onSelect'])
const status = ref<OrderStatus[]>([
  { name: 'IN_ORDER', id: 1, label: 'En commande' },
  { name: 'SHIPPING', id: 2, label: 'Expedie' },
  { name: 'RECEIVED', id: 3, label: 'Recue' },
  { name: 'DELIVERED', id: 4, label: 'Delivree' },
  { name: 'CANCELLED', id: 5, label: 'Annulée' }
])

const findStatus = computed(() => {
  const s = status.value.find((item) => item.name === currentStatus)
  return s ? s.id : 0
})

const onSelect = (id: number) => {
  const type = status.value.find((item) => item.id === id)
  emit('onSelect', type.name)
}
</script>

<style scoped></style>
