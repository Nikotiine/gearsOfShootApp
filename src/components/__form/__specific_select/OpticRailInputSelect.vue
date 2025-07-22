<template>
  <InputGroup>
    <input-group-required-icon :is-validate="railSizeId > 0" v-if="required" />
    <input-group-optional-icon :is-completed="railSizeId > 0" v-else />
    <input-group-select
      :options="railSizeList"
      label="name"
      @option-id="onSelect($event)"
      :required="required"
      placeholder="name"
      filter
      input-id="railSizeId"
      :initial-value="railSizeId"
      :i18n-prefix="i18Prefix"
      :disabled="disabled"
    />
  </InputGroup>
</template>
<script setup lang="ts">
import InputGroupOptionalIcon from '@/components/__form/InputGroupOptionalIcon.vue'
import InputGroup from 'primevue/inputgroup'
import InputGroupRequiredIcon from '@/components/__form/InputGroupRequiredIcon.vue'
import InputGroupSelect from '@/components/__form/InputGroupSelect.vue'
import { useOpticRailStore } from '@/stores/optic-rail'
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
const store = useOpticRailStore()
const i18Prefix = store.getI18NPrefix
const { data } = store.getAll()
const railSizeId = ref<number>(initialValue)
const emit = defineEmits(['onSelect'])
const railSizeList = computed(() => data.value || [])
const onSelect = (id: number) => {
  const rail = railSizeList.value.find((i) => i.id === id)
  emit('onSelect', rail)
  railSizeId.value = id
}
watch(
  () => initialValue,
  (value) => {
    railSizeId.value = value
  }
)
</script>

<style scoped></style>
