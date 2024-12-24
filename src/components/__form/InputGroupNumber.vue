<template>
  <IftaLabel>
    <InputNumber
      v-model="value"
      :placeholder="t('inputNumber.placeholder.' + placeholder)"
      :minFractionDigits="minFractionDigits"
      :id="inputId"
      @focus="onFocus"
      @update:modelValue="onChange"
      :invalid="isInvalid"
      :disabled="disabled"
    />
    <label :for="inputId" v-capitalize="t('inputNumber.' + label) + isRequiredInput"></label>
  </IftaLabel>
</template>

<script setup lang="ts">
import InputNumber from 'primevue/inputnumber'
import IftaLabel from 'primevue/iftalabel'
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
const emit = defineEmits(['value'])
const { t } = useI18n()
const requiredLabel: string = '(*)'
const {
  min = 0,
  minFractionDigits = 0,
  label = 'default',
  required = false,
  disabled = false,
  maxWidth = 100,
  initialValue = 0
} = defineProps<{
  min?: number
  minFractionDigits?: number
  placeholder?: string
  required?: boolean
  label?: string
  inputId: string
  disabled?: boolean
  maxWidth?: number
  initialValue?: number
}>()
const value = ref(initialValue)
const hasFocused = ref(false)
const onFocus = () => {
  hasFocused.value = true
}
const isRequiredInput = computed(() => {
  return required ? requiredLabel : ''
})
/**
 * Critere d invaliite du champs
 * Si la valeur est infiereur au min passer en props = invalide
 */
const isInvalid = computed(() => {
  return hasFocused.value && value.value < min
})

const onChange = () => {
  emit('value', value.value)
}
/**
 * Surveille le changement de valeur de la initialValue
 * Si celle ci est change passe le focus a false et donne la valeur passe a la ref du input number
 */
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
