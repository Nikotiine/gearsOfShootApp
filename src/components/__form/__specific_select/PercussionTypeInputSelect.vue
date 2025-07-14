<template>
  <InputGroup>
    <input-group-required-icon :is-validate="percussionTypeId > 0" />
    <input-group-select
      :options="percussionTypeList"
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
import { computed, ref, watch } from 'vue'
import { usePercussionTypeStore } from '@/stores/percussion-type'
const { initialValue = 0, required = false } = defineProps<{
  initialValue?: number
  required?: boolean
}>()
const emit = defineEmits(['onSelect'])
const store = usePercussionTypeStore()
const i18nPrefix = store.getI18NPrefix
const { data } = store.getAll()
const percussionTypeList = computed(() => data.value || [])
const percussionTypeId = ref<number>(initialValue)
const onSelect = (id: number) => {
  const type = percussionTypeList.value.find((item) => item.id === id)
  emit('onSelect', type)
  percussionTypeId.value = id
}
watch(
  () => initialValue,
  (value) => {
    percussionTypeId.value = value
  }
)
</script>

<style scoped></style>
