<template>
  <input-group-multi-select
    input-id="opticReadyPlates"
    :options="data"
    :disabled="disabled"
    @selected-options="onChange($event)"
    :clear="clear"
    label="name"
    placeholder="name"
    :initial-value="selectedOptions"
    :i18n-prefix="i18nPrefix"
  />
</template>
<script setup lang="ts">
import { useOpticReadyPlateStore } from '@/stores/optic-ready-plate'
import InputGroupMultiSelect from '@/components/__form/InputGroupMultiSelect.vue'
import { ref, watch } from 'vue'
import type { OpticReadyPlateDto } from '@/api/Api'
const {
  initialValue = [],
  clear = false,
  disabled = false
} = defineProps<{
  initialValue: OpticReadyPlateDto[]
  clear?: boolean
  disabled?: boolean
}>()
const emit = defineEmits(['onSelect'])
const store = useOpticReadyPlateStore()
const i18nPrefix = store.getI18NPrefix
const { data } = store.getAll()
const selectedOptions = ref<OpticReadyPlateDto[]>(initialValue)
const onChange = (options: OpticReadyPlateDto[]) => {
  selectedOptions.value = options
  emit('onSelect', selectedOptions.value)
}
watch(
  () => initialValue,
  (value) => {
    selectedOptions.value = value
  }
)
</script>

<style scoped></style>
