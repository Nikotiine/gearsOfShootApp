<template>
  <InputGroup>
    <input-group-required-icon :is-validate="percussionTypeId > 0" />
    <input-group-select
      :options="percussionTypes$"
      label="name"
      @option-id="onSelect($event)"
      :required="required"
      placeholder="placeholder"
      input-id="percussionTypeId"
      :initial-value="percussionTypeId"
      :i18n-prefix="i18nPrefix"
    />
  </InputGroup>
</template>
<script setup lang="ts">
import InputGroupRequiredIcon from '@/components/__form/InputGroupRequiredIcon.vue'
import InputGroupSelect from '@/components/__form/InputGroupSelect.vue'
import InputGroup from 'primevue/inputgroup'
import { ref } from 'vue'
import { usePercussionTypeStore } from '@/stores/percussion-type'
const { initialValue = 0, required = false } = defineProps<{
  initialValue?: number
  required?: boolean
}>()
const emit = defineEmits(['onSelect'])
const store = usePercussionTypeStore()
const i18nPrefix = store.getI18NPrefix
const { data: percussionTypes$ } = store.getAll()
const percussionTypeId = ref<number>(initialValue)
const onSelect = (id: number) => {
  emit('onSelect', id)
  percussionTypeId.value = id
}
</script>

<style scoped></style>
