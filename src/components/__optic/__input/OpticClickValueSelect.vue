<template>
  <InputGroup>
    <input-group-required-icon :is-validate="valueOfOneClick > 0" />
    <input-group-select
      :options="clickValueOption"
      label="name"
      i18n-prefix="clickValue."
      required
      input-id="valueOfOneClick"
      :initial-value="initialValue"
      :disabled="opticUnit.id === 0"
      @option-id="onSelect($event)"
    />
  </InputGroup>
</template>
<script setup lang="ts">
import type { OpticUnitDto } from '@/api/Api'
import InputGroupSelect from '@/components/__form/InputGroupSelect.vue'
import InputGroup from 'primevue/inputgroup'
import InputGroupRequiredIcon from '@/components/__form/InputGroupRequiredIcon.vue'
import { computed, ref, watch } from 'vue'
import { useOpticClickValueStore } from '@/stores/optic-click-value.store'
const { initialValue, opticUnit } = defineProps<{
  initialValue: number
  opticUnit: OpticUnitDto
}>()
const store = useOpticClickValueStore()
const { data } = store.getAll()
const emit = defineEmits(['select-value'])

const valueOfOneClick = ref(initialValue)
const onSelect = (id: number) => {
  const value = clickValueOption.value.find((i) => i.id === id)
  emit('select-value', value)
  valueOfOneClick.value = id
}
watch(
  () => initialValue,
  (value) => {
    valueOfOneClick.value = value
  }
)
const clickValueOption = computed(() => {
  return data.value?.filter((item) => item.opticUnit.name === opticUnit.name) || []
})
</script>

<style scoped></style>
