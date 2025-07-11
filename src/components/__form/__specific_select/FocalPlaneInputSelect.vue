<template>
  <InputGroup>
    <input-group-required-icon :is-validate="focalPlaneId > 0" v-if="required" />
    <input-group-optional-icon :is-completed="focalPlaneId > 0" v-else />
    <input-group-select
      :options="focalPlaneList"
      label="name"
      @option-id="onSelect($event)"
      :required="required"
      placeholder="placeholder"
      input-id="opticTypeId"
      :initial-value="focalPlaneId"
      :i18n-prefix="i18nPrefix"
    />
  </InputGroup>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useFocalPlaneStore } from '@/stores/focal-plane.store'
import InputGroup from 'primevue/inputgroup'
import InputGroupRequiredIcon from '@/components/__form/InputGroupRequiredIcon.vue'
import InputGroupOptionalIcon from '@/components/__form/InputGroupOptionalIcon.vue'
import InputGroupSelect from '@/components/__form/InputGroupSelect.vue'

const { initialValue = 0, required = false } = defineProps<{
  initialValue?: number
  required?: boolean
}>()
const emit = defineEmits(['onSelect'])
const store = useFocalPlaneStore()
const i18nPrefix = store.getI18NPrefix
const { data } = store.getAll()
const focalPlaneList = computed(() => data.value || [])
const focalPlaneId = ref<number>(initialValue)
const onSelect = (id: number) => {
  const type = focalPlaneList.value.find((item) => item.id === id)
  emit('onSelect', type)
  focalPlaneId.value = id
}
watch(
  () => initialValue,
  (value) => {
    focalPlaneId.value = value
  }
)
</script>

<style scoped></style>
