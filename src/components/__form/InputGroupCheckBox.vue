<template>
  <InputGroupAddon :class="withSize">
    <Checkbox
      :id="inputId"
      v-model="isCheck"
      :binary="true"
      @change="onChange"
      :disabled="disabled"
    />
    <label
      :for="inputId"
      v-tooltip="toolTip ? t(i18nPrefix + toolTip) : null"
      :class="isCheck ? checkedTextColor : ''"
    >
      {{ t(i18nPrefix + label) }}
    </label>
  </InputGroupAddon>
</template>
<script setup lang="ts">
import InputGroupAddon from 'primevue/inputgroupaddon'
import Checkbox from 'primevue/checkbox'
import { useI18n } from 'vue-i18n'
import { computed, ref, watch } from 'vue'
export type CheckboxSize = 'small' | 'medium' | 'large'
const { t } = useI18n()
const checkedTextColor: string = 'text-slate-500'
const {
  label,
  inputId,
  checked = false,
  disabled = false,
  toolTip = null,
  i18nPrefix = 'global',
  size = 'small'
} = defineProps<{
  label: string
  i18nPrefix?: string
  inputId: string
  checked?: boolean
  disabled?: boolean
  toolTip?: string
  size?: CheckboxSize
}>()
const isCheck = ref(checked)
const emit = defineEmits(['checked'])
const onChange = () => {
  emit('checked', isCheck.value)
}
// Surveille le changement de valeur de la props checked
watch(
  () => checked,
  (newValue) => {
    isCheck.value = newValue
  }
)
const withSize = computed(() => {
  let width = ''
  switch (size) {
    case 'small':
      width = 'w-4/12'
      break
    case 'medium':
      width = 'w-6/12'
      break
    case 'large':
      width = 'w-full'
      break
  }
  return width
})
</script>

<style scoped>
.p-checkbox {
  margin-right: 0.5rem;
}
label {
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
