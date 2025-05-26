<template>
  <InputGroup>
    <input-group-required-icon :is-validate="barrelTypeId > 0" v-if="required" />
    <input-group-optional-icon :is-completed="barrelTypeId > 0" v-else />
    <input-group-select
      :options="barrelTypeList"
      label="name"
      @option-id="onSelect($event)"
      :required="required"
      placeholder="placeholder"
      input-id="categoryId"
      :initial-value="barrelTypeId"
      :i18n-prefix="i18nPrefix"
    />
  </InputGroup>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useBarrelTypeStore } from '@/stores/barrel-type'
import InputGroupRequiredIcon from '@/components/__form/InputGroupRequiredIcon.vue'
import InputGroupSelect from '@/components/__form/InputGroupSelect.vue'
import InputGroup from 'primevue/inputgroup'
import InputGroupOptionalIcon from '@/components/__form/InputGroupOptionalIcon.vue'
const store = useBarrelTypeStore()
const { initialValue = 0, required = false } = defineProps<{
  initialValue?: number
  required?: boolean
}>()
const i18nPrefix = store.getI18NPrefix
const { data } = store.getAll()
const barrelTypeList = computed(() => data.value || [])
const emit = defineEmits(['onSelect'])

const barrelTypeId = ref<number>(initialValue)
const onSelect = (id: number) => {
  const type = barrelTypeList.value.find((item) => item.id === id)
  emit('onSelect', type)
  barrelTypeId.value = id
}
watch(
  () => initialValue,
  (value) => {
    barrelTypeId.value = value
  }
)
</script>

<style scoped></style>
