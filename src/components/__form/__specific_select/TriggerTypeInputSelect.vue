<template>
  <InputGroup>
    <input-group-required-icon :is-validate="triggerTypeId > 0" v-if="required" />
    <input-group-optional-icon :is-completed="triggerTypeId > 0" v-else />
    <input-group-select
      :options="triggerTypeList"
      label="name"
      @option-id="onSelect($event)"
      :required="required"
      placeholder="name"
      filter
      input-id="triggerTypeId"
      :initial-value="triggerTypeId"
      :i18n-prefix="i18Prefix"
      :disabled="disabled"
    />
  </InputGroup>
</template>

<script setup lang="ts">
import InputGroupOptionalIcon from '@/components/__form/InputGroupOptionalIcon.vue'
import InputGroupRequiredIcon from '@/components/__form/InputGroupRequiredIcon.vue'
import InputGroupSelect from '@/components/__form/InputGroupSelect.vue'
import InputGroup from 'primevue/inputgroup'
import { useTriggerTypeStore } from '@/stores/trigger-type.store'
import { computed, ref, watch } from 'vue'

const {
  initialValue = 0,
  disabled = false,
  required = false
} = defineProps<{
  initialValue?: number
  disabled?: boolean
  required?: boolean
}>()
const store = useTriggerTypeStore()
const i18Prefix = store.getI18NPrefix
const { data } = store.getAll()
const triggerTypeId = ref<number>(initialValue)

const emit = defineEmits(['onSelect'])
const triggerTypeList = computed(() => data.value || [])
const onSelect = (id: number) => {
  const type = triggerTypeList.value.find((item) => item.id === id)
  emit('onSelect', type)
  triggerTypeId.value = id
}
watch(
  () => initialValue,
  (value) => {
    triggerTypeId.value = value
  }
)
</script>

<style scoped></style>
