<template>
  <IftaLabel>
    <Select
      id="select"
      @change="onChange"
      v-model="value"
      :options="options"
      :optionLabel="optionLabel"
      :optionValue="optionValue"
      :placeholder="t('global.select')"
      @focus="onFocus()"
      checkmark
      :highlightOnSelect="true"
      :invalid="isInvalid"
      :disabled="disabled"
      :filter="filter"
      :emptyMessage="t('inputSelect.notFoundItem')"
    />
    <label for="select" v-capitalize="t('inputSelect.' + type) + isRequiredSelect"></label>
  </IftaLabel>
</template>
<script setup lang="ts">
import IftaLabel from 'primevue/iftalabel'
import Select from 'primevue/select'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import type { InputGroupSelectType } from '@/types/form-type'

const { t } = useI18n()
const requiredLabel: string = '(*)'
const hasFocused = ref(false)
const {
  options,
  required = false,
  disabled = false,
  filter = false,
  optionLabel = 'name',
  optionValue = 'id'
} = defineProps<{
  options: any
  type: InputGroupSelectType
  required?: boolean
  optionLabel?: string
  optionValue?: string
  disabled?: boolean
  filter: boolean
}>()

const onFocus = () => {
  hasFocused.value = true
}
const value = ref<number>(0)
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
</script>

<style scoped></style>
