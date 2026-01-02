<template>
  <InputGroup>
    <template v-if="!hideIcon">
      <input-group-required-icon :is-validate="value > 0" v-if="required" />
      <input-group-optional-icon :is-completed="value > 0" v-else />
    </template>
    <IftaLabel>
      <InputNumber
        v-model="value"
        :placeholder="t(i18nPrefix + placeholder)"
        :minFractionDigits="minFractionDigits"
        :id="inputId"
        @focus="onFocus"
        @update:modelValue="onChange"
        :invalid="isInvalid"
        :disabled="disabled"
        :readonly="readonly"
      />
      <label :for="inputId">{{ t(i18nPrefix + label) + isRequiredInput }}</label>
    </IftaLabel>
    <InputGroupAddon v-if="addOn">{{ t('formatter.' + addOn) }} </InputGroupAddon>
  </InputGroup>
</template>

<script setup lang="ts">
import InputNumber from 'primevue/inputnumber'
import IftaLabel from 'primevue/iftalabel'
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import InputGroup from 'primevue/inputgroup'
import InputGroupOptionalIcon from '@/components/__form/InputGroupOptionalIcon.vue'
import InputGroupRequiredIcon from '@/components/__form/InputGroupRequiredIcon.vue'
import InputGroupAddon from 'primevue/inputgroupaddon'
import type { NumberFormatterType } from '@/shared/utils/formatter.utils'

const emit = defineEmits(['value'])
const { t } = useI18n()
const requiredLabel: string = '(*)'
const {
  min = 0,
  minFractionDigits = 0,
  label = 'label',
  required = false,
  disabled = false,
  maxWidth = 100,
  initialValue = 0,
  placeholder = 'defaultPlaceHolder',
  i18nPrefix = 'global.',
  addOn = null,
  hideIcon = false,
  readonly = false
} = defineProps<{
  min?: number
  i18nPrefix?: string
  minFractionDigits?: number
  placeholder?: string
  required?: boolean
  label?: string
  inputId: string
  disabled?: boolean
  maxWidth?: number
  initialValue?: number
  addOn?: NumberFormatterType
  hideIcon?: boolean
  readonly?: boolean
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
.p-inputgroupaddon {
  min-width: fit-content;
  padding: 0.8rem;
}
</style>
