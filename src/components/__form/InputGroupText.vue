<template>
  <IftaLabel>
    <InputText
      :id="inputId"
      v-model="value"
      :placeholder="t(i18nPrefix + placeholder)"
      @focus="onFocus"
      :invalid="isInvalid"
      @change="onChange"
    />
    <label :for="inputId">{{ t(i18nPrefix + label) + isRequiredText }}</label>
  </IftaLabel>
</template>

<script setup lang="ts">
import IftaLabel from 'primevue/iftalabel'
import InputText from 'primevue/inputtext'
import { useI18n } from 'vue-i18n'
import { computed, ref, watch } from 'vue'
import { useFormStore } from '@/stores/form.store'
const requiredLabel: string = '(*)'

const {
  minLength = 0,
  label = 'label',
  required = false,
  initialValue = '',
  i18nPrefix = 'global.',
  placeholder = 'defaultPlaceHolder'
} = defineProps<{
  i18nPrefix?: string
  minLength?: number
  placeholder?: string
  label?: string
  required?: boolean
  inputId: string
  initialValue?: string
}>()
const emit = defineEmits(['value'])
const { t } = useI18n()

const hasFocused = ref(false)
const value = ref(initialValue)

const onFocus = () => {
  hasFocused.value = true
}
const isInvalid = computed(() => {
  return hasFocused.value && value.value.length < minLength
})
const onChange = () => {
  emit('value', value.value)
}
const isRequiredText = computed(() => {
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

<style scoped></style>
