<template>
  <InputGroup>
    <input-group-required-icon :is-validate="categoryId > 0" v-if="required" />
    <input-group-optional-icon :is-completed="categoryId > 0" v-else />
    <input-group-select
      :options="categories$"
      label="name"
      @option-id="onSelect($event)"
      :required="required"
      placeholder="placeholder"
      input-id="categoryId"
      :initial-value="categoryId"
      :i18n-prefix="i18nPrefix"
    />
  </InputGroup>
</template>
<script setup lang="ts">
import InputGroupRequiredIcon from '@/components/__form/InputGroupRequiredIcon.vue'
import InputGroupSelect from '@/components/__form/InputGroupSelect.vue'
import InputGroup from 'primevue/inputgroup'

import { ref } from 'vue'
import { useLegalisationCategoryStore } from '@/stores/legalisation-category'
import InputGroupOptionalIcon from '@/components/__form/InputGroupOptionalIcon.vue'
const { initialValue = 0, required = false } = defineProps<{
  initialValue?: number
  required?: boolean
}>()
const emit = defineEmits(['onSelect'])
const store = useLegalisationCategoryStore()
const i18nPrefix = store.getI18NPrefix
const { data: categories$ } = store.getAll()
const categoryId = ref<number>(initialValue)
const onSelect = (id: number) => {
  emit('onSelect', id)
  categoryId.value = id
}
</script>

<style scoped></style>
