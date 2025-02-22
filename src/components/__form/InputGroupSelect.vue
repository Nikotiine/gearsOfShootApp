<template>
  <IftaLabel>
    <Select
      :id="inputId"
      @change="onChange"
      v-model="value"
      :options="options"
      :optionLabel="optionLabel"
      :optionValue="optionValue"
      :placeholder="t(placeholder)"
      @focus="onFocus()"
      checkmark
      :highlightOnSelect="true"
      :invalid="isInvalid"
      :disabled="disabled"
      :filter="filter"
      :emptyMessage="t('global.notFoundItem')"
    />
    <label :for="inputId">{{ t(label) + isRequiredSelect }}</label>
  </IftaLabel>
</template>
<script setup lang="ts">
import IftaLabel from 'primevue/iftalabel'
import Select from 'primevue/select'
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const requiredLabel: string = '(*)'
const hasFocused = ref(false)
const {
  options,
  required = false,
  disabled = false,
  filter = false,
  optionLabel = 'name',
  optionValue = 'id',
  maxWidth = 100,
  placeholder = 'global.defaultPlaceHolder',
  initialValue = 0
} = defineProps<{
  options: any
  label: string
  required?: boolean
  optionLabel?: string
  optionValue?: string
  disabled?: boolean
  filter?: boolean
  inputId: string
  maxWidth?: number
  placeholder?: string
  initialValue?: number
}>()

const onFocus = () => {
  hasFocused.value = true
}
const value = ref<number>(initialValue)
const emit = defineEmits(['option-id'])
const onChange = () => {
  emit('option-id', value.value)
}
const isInvalid = computed(() => {
  return hasFocused.value && value.value === 0
})

const isRequiredSelect = computed(() => {
  return required ? requiredLabel : ''
})

watch(
  () => initialValue,
  (newValue) => {
    value.value = newValue
    hasFocused.value = false
  }
)
</script>

<style scoped>
.p-inputgroup,
.p-inputgroup .p-floatlabel,
.p-inputgroup .p-iftalabel {
  width: v-bind(maxWidth + '%');
}
</style>
