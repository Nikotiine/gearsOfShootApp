<template>
  <IftaLabel>
    <MultiSelect
      :id="inputId"
      v-model="selectedOptions"
      :options="options"
      option-value="id"
      :optionLabel="optionLabel"
      :filter="filter"
      :placeholder="t('inputMultiSelect.' + placeholder)"
      :maxSelectedLabels="maxSelectedLabels"
      class="w-full md:w-80"
      @change="onChange"
      :disabled="disabled"
      :invalid="invalid"
      :show-toggle-all="showToggleAll"
      :empty-message="t('inputMultiSelect.' + emptyMessage)"
    />
    <label :for="inputId">{{ t(label) }}</label>
  </IftaLabel>
</template>
<script setup lang="ts">
import MultiSelect from 'primevue/multiselect'
import IftaLabel from 'primevue/iftalabel'
import { useI18n } from 'vue-i18n'
import { ref, watch, watchEffect } from 'vue'
const { t } = useI18n()
const {
  options,
  maxSelectedLabels = 3,
  optionLabel = 'name',
  filter = false,
  disabled = false,
  invalid = false,
  emptyMessage = 'emptyDefaultMessage',
  showToggleAll = false,
  placeholder = 'defaultPlaceHolder',
  clear = false,
  initialValue = []
} = defineProps<{
  options: any
  maxSelectedLabels?: number
  optionLabel?: string
  inputId: string
  filter?: boolean
  disabled?: boolean
  invalid?: boolean
  emptyMessage?: string
  showToggleAll?: boolean
  placeholder?: string
  clear?: boolean
  initialValue?: any
  label: string
}>()
const emit = defineEmits(['selectedOptions'])
const selectedOptions = ref(initialValue)

const onChange = () => {
  emit('selectedOptions', selectedOptions.value)
}
watch(
  () => clear,
  () => {
    selectedOptions.value = []
  }
)
watch(
  () => initialValue,
  (value, oldValue) => {
    if (value !== oldValue) {
      selectedOptions.value = value
    }
  }
)
</script>

<style scoped></style>
