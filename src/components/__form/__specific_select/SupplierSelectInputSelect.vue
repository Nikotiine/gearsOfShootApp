<template>
  <InputGroup>
    <input-group-required-icon :is-validate="supplierId > 0" v-if="required" />
    <input-group-optional-icon :is-completed="supplierId > 0" v-else />
    <input-group-select
      :options="supplierList"
      label="supplier"
      @option-id="onSelect($event)"
      :required="required"
      placeholder="supplier"
      input-id="supplierId"
      :initial-value="supplierId"
      i18n-prefix="priceHistory."
    />
  </InputGroup>
</template>
<script setup lang="ts">
import InputGroupRequiredIcon from '@/components/__form/InputGroupRequiredIcon.vue'
import InputGroup from 'primevue/inputgroup'
import InputGroupSelect from '@/components/__form/InputGroupSelect.vue'
import { useSupplierStore } from '@/stores/supplier.store'
import { computed, ref, watch } from 'vue'
import InputGroupOptionalIcon from '@/components/__form/InputGroupOptionalIcon.vue'

const { initialValue = 0, required = false } = defineProps<{
  initialValue?: number
  required?: boolean
}>()
const emit = defineEmits(['onSelect'])
const store = useSupplierStore()
const { data } = store.getAll()
const supplierList = computed(() => data.value || [])
const supplierId = ref<number>(initialValue)
const onSelect = (id: number) => {
  const type = supplierList.value.find((item) => item.id === id)
  emit('onSelect', type)
  supplierId.value = id
}
watch(
  () => initialValue,
  (value) => {
    supplierId.value = value
  }
)
</script>

<style scoped></style>
