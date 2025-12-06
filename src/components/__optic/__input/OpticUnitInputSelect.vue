<template>
  <InputGroup>
    <input-group-required-icon :is-validate="opticUnitId > 0" v-if="required" />
    <input-group-optional-icon :is-completed="opticUnitId > 0" v-else />
    <input-group-select
      :options="opticUnitList"
      label="name"
      @option-id="onSelect($event)"
      :required="required"
      placeholder="placeholder"
      input-id="opticTypeId"
      :initial-value="opticUnitId"
      :i18n-prefix="i18nPrefix"
    />
  </InputGroup>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useOpticUnitStore } from '@/stores/optic-unit.store'
import InputGroup from 'primevue/inputgroup'
import InputGroupRequiredIcon from '@/components/__form/InputGroupRequiredIcon.vue'
import InputGroupOptionalIcon from '@/components/__form/InputGroupOptionalIcon.vue'
import InputGroupSelect from '@/components/__form/InputGroupSelect.vue'

const { initialValue = 0, required = false } = defineProps<{
  initialValue?: number
  required?: boolean
}>()
const emit = defineEmits(['onSelect'])
const store = useOpticUnitStore()
const i18nPrefix = store.getI18NPrefix
const { data } = store.getAll()
const opticUnitList = computed(() => data.value || [])
const opticUnitId = ref<number>(initialValue)
const onSelect = (id: number) => {
  const type = opticUnitList.value.find((item) => item.id === id)
  emit('onSelect', type)
  opticUnitId.value = id
}
watch(
  () => initialValue,
  (value) => {
    opticUnitId.value = value
  }
)
</script>

<style scoped></style>
