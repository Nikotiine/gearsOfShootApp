<template>
  <IftaLabel>
    <InputNumber
      v-model="value"
      :placeholder="t('inputNumber.placeholder.' + placeholder)"
      :minFractionDigits="minFractionDigits"
      id="input"
      @focus="onFocus"
      @update:modelValue="onChange"
      :invalid="isInvalid"
    />
    <label for="input" v-capitalize="t('inputNumber.' + label) + isRequiredInput"></label>
  </IftaLabel>
</template>

<script setup lang="ts">
import InputNumber from 'primevue/inputnumber'
import IftaLabel from 'primevue/iftalabel'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
const emit = defineEmits(['value'])
const { t } = useI18n()
const requiredLabel: string = '(*)'
const {
  min = 0,
  minFractionDigits = 0,
  label = 'default',
  required = false
} = defineProps<{
  min?: number
  minFractionDigits?: number
  placeholder?: string
  required?: boolean
  label?: string
}>()
const value = ref(0)
const hasFocused = ref(false)
const onFocus = () => {
  hasFocused.value = true
}
const isRequiredInput = computed(() => {
  return required ? requiredLabel : ''
})
const isInvalid = computed(() => {
  return hasFocused.value && value.value < min
})
const onChange = () => {
  console.log(value.value)
  emit('value', value.value)
}
</script>

<style scoped></style>
