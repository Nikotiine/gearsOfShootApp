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
import { useTriggerTypeStore } from '@/stores/trigger-type'
import { computed, ref } from 'vue'

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
  emit('onSelect', id)
  triggerTypeId.value = id
}
</script>

<style scoped></style>
