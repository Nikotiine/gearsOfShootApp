<template>
  <InputGroup>
    <input-group-required-icon :is-validate="initialValue > 0" v-if="required" />
    <input-group-optional-icon :is-completed="initialValue > 0" v-else />
    <input-group-select
      :options="options"
      label="movementType"
      option-label="label"
      @option-id="onSelect($event)"
      :required="required"
      placeholder="placeholder"
      input-id="categoryId"
      :initial-value="initialValue"
      :i18n-prefix="i18nPrefix"
    />
  </InputGroup>
</template>

<script setup lang="ts">
import InputGroupOptionalIcon from '@/components/__form/InputGroupOptionalIcon.vue'
import InputGroupSelect from '@/components/__form/InputGroupSelect.vue'
import InputGroupRequiredIcon from '@/components/__form/InputGroupRequiredIcon.vue'
import InputGroup from 'primevue/inputgroup'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { MovementType } from '@/enum/movement.enum'

const { t } = useI18n()
const { required = false, i18nPrefix } = defineProps<{
  required?: boolean
  i18nPrefix: string
}>()
const emit = defineEmits(['onSelect'])
const initialValue = ref(0)
const options = [
  {
    value: MovementType.IN,
    label: t('stock.' + MovementType.IN),
    id: 1
  },
  {
    value: MovementType.OUT,
    label: t('stock.' + MovementType.OUT),
    id: 2
  }
]
const onSelect = (id: number) => {
  const selectedType = options.find((t) => t.id === id)
  emit('onSelect', selectedType?.value)
  initialValue.value = id
}
</script>

<style scoped></style>
