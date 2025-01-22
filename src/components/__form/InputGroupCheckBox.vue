<template>
  <InputGroupAddon :class="isWidthHalfSize ? 'w-6/12' : 'w-4/12'">
    <Checkbox
      :id="inputId"
      v-model="isCheck"
      :binary="true"
      @change="onChange"
      :disabled="disabled"
    />
    <label
      :for="inputId"
      v-tooltip="toolTip ? t(toolTip) : null"
      :class="isCheck ? checkedTextColor : ''"
    >
      {{ t(label) }}
    </label>
  </InputGroupAddon>
</template>
<script setup lang="ts">
import InputGroupAddon from 'primevue/inputgroupaddon'
import Checkbox from 'primevue/checkbox'
import { useI18n } from 'vue-i18n'
import { ref, watch } from 'vue'
const { t } = useI18n()
const checkedTextColor: string = 'text-slate-500'
const {
  label,
  inputId,
  checked = false,
  isWidthHalfSize = false,
  disabled = false,
  toolTip = null
} = defineProps<{
  label: string
  inputId: string
  checked?: boolean
  isWidthHalfSize?: boolean
  disabled?: boolean
  toolTip?: string
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
