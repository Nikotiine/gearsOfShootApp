<template>
  <InputGroup>
    <input-group-required-icon :is-validate="opticTypeId > 0" v-if="required" />
    <input-group-optional-icon :is-completed="opticTypeId > 0" v-else />
    <input-group-select
      :options="opticTypeList"
      label="name"
      @option-id="onSelect($event)"
      :required="required"
      placeholder="placeholder"
      input-id="opticTypeId"
      :initial-value="opticTypeId"
      :i18n-prefix="i18nPrefix"
    />
  </InputGroup>
</template>

<script setup lang="ts">
import { useOpticTypeStore } from '@/stores/optic-type.store'
import { computed, ref, watch } from 'vue'
import InputGroup from 'primevue/inputgroup'
import InputGroupRequiredIcon from '@/components/__form/InputGroupRequiredIcon.vue'
import InputGroupSelect from '@/components/__form/InputGroupSelect.vue'
import InputGroupOptionalIcon from '@/components/__form/InputGroupOptionalIcon.vue'

const { initialValue = 0, required = false } = defineProps<{
  initialValue?: number
  required?: boolean
}>()
const emit = defineEmits(['onSelect'])
const store = useOpticTypeStore()
const i18nPrefix = store.getI18NPrefix
const { data } = store.getAll()
const opticTypeList = computed(() => data.value || [])
const opticTypeId = ref<number>(initialValue)
const onSelect = (id: number) => {
  const type = opticTypeList.value.find((item) => item.id === id)
  emit('onSelect', type)
  opticTypeId.value = id
}
watch(
  () => initialValue,
  (value) => {
    opticTypeId.value = value
  }
)
</script>

<style scoped></style>
