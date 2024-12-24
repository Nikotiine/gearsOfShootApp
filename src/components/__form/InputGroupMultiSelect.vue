<template>
  <IftaLabel>
    <MultiSelect
      :id="inputId"
      v-model="selectedOptions"
      :options="options"
      :optionLabel="optionLabel"
      :filter="filter"
      :placeholder="t('inputMultiSelect.' + placeholder)"
      :maxSelectedLabels="maxSelectedLabels"
      class="w-full md:w-80"
      @before-hide="onBeforeHide"
      :disabled="disabled"
      :invalid="invalid"
      :show-toggle-all="showToggleAll"
      :empty-message="t('inputMultiSelect.' + emptyMessage)"
    />
    <label :for="inputId" v-capitalize="t('weapon.form.' + inputId)"></label>
  </IftaLabel>
</template>
<script setup lang="ts">
import MultiSelect from 'primevue/multiselect'
import IftaLabel from 'primevue/iftalabel'
import { useI18n } from 'vue-i18n'
import { ref, watch } from 'vue'
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
  clear = false
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
}>()
const emit = defineEmits(['selectedOptions'])
const selectedOptions = ref([])
const onBeforeHide = () => {
  emit('selectedOptions', selectedOptions.value)
}
watch(
  () => clear,
  () => {
    selectedOptions.value = []
  }
)
</script>

<style scoped></style>
