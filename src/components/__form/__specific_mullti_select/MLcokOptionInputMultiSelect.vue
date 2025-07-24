<template>
  <input-group-multi-select
    input-id="mLockOptions"
    :options="data"
    :disabled="disabled"
    @selected-options="onChange($event)"
    :clear="clear"
    label="name"
    :initial-value="selectedOptions"
    :i18n-prefix="i18nPrefix"
    :invalid="invalid"
    placeholder="placeholder"
  />
</template>

<script setup lang="ts">
import { useMLockOptionStore } from '@/stores/m-lock-options.store'
import InputGroupMultiSelect from '@/components/__form/InputGroupMultiSelect.vue'
import { ref, watch } from 'vue'
import type { MLockOptionDto } from '@/api/Api'

const {
  initialValue = [],
  clear = false,
  disabled = false,
  invalid = false
} = defineProps<{
  initialValue: MLockOptionDto[]
  clear?: boolean
  disabled?: boolean
  invalid?: boolean
}>()
const emit = defineEmits(['onSelect'])
const store = useMLockOptionStore()
const { data } = store.getAll()
const i18nPrefix = store.getI18NPrefix
const selectedOptions = ref<MLockOptionDto[]>(initialValue)
const onChange = (options: MLockOptionDto[]) => {
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
