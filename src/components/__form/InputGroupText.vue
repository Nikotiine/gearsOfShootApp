<template>
  <IftaLabel>
    <InputText
      id="name"
      v-model="value"
      :placeholder="t('inputText.placeholder.' + placeholder)"
      @focus="onFocus"
      :invalid="isInvalid"
      @change="onChange"
    />
    <label for="name" v-capitalize="t('inputText.' + label) + isRequiredText"></label>
  </IftaLabel>
</template>

<script setup lang="ts">
import IftaLabel from 'primevue/iftalabel'
import InputText from 'primevue/inputtext'
import { useI18n } from 'vue-i18n'
import { computed, ref } from 'vue'
const requiredLabel: string = '(*)'
const {
  minLength = 0,
  label = 'default',
  required = false
} = defineProps<{
  minLength?: number
  placeholder?: string
  label?: string
  required?: boolean
}>()
const emit = defineEmits(['value'])
const { t } = useI18n()
const hasFocused = ref(false)
const value = ref('')

const onFocus = () => {
  hasFocused.value = true
}
const isInvalid = computed(() => {
  return hasFocused.value && value.value.length < minLength
})
const onChange = () => {
  console.log(value.value)
  emit('value', value.value)
}
const isRequiredText = computed(() => {
  return required ? requiredLabel : ''
})
</script>

<style scoped></style>
