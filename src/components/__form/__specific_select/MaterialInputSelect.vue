<template>
  <InputGroup>
    <input-group-required-icon :is-validate="materialId > 0" v-if="required" />
    <input-group-optional-icon :is-completed="materialId > 0" v-else />
    <input-group-select
      :options="materialsList"
      :label="label"
      @option-id="onSelect($event)"
      :required="required"
      :placeholder="placeholder"
      filter
      :input-id="inputId"
      :initial-value="materialId"
      :i18n-prefix="i18Prefix"
      :disabled="disabled"
    />
    <input-group-addon-open-drawer-button type="material" :close="closeDrawer" v-if="canAddNew" />
  </InputGroup>
</template>
<script setup lang="ts">
import InputGroupAddonOpenDrawerButton from '@/components/__form/InputGroupAddonOpenDrawerButton.vue'
import InputGroupRequiredIcon from '@/components/__form/InputGroupRequiredIcon.vue'
import InputGroupSelect from '@/components/__form/InputGroupSelect.vue'
import InputGroup from 'primevue/inputgroup'
import { computed, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useMaterialStore } from '@/stores/material'
import InputGroupOptionalIcon from '@/components/__form/InputGroupOptionalIcon.vue'

const {
  initialValue = 0,
  canAddNew = false,
  inputId = 'materialId',
  disabled = false,
  required = false,
  placeholder = 'placeholder',
  label = 'label'
} = defineProps<{
  initialValue?: number
  canAddNew?: boolean
  inputId?: string
  disabled?: boolean
  required?: boolean
  placeholder?: string
  label?: string
}>()
const store = useMaterialStore()
const i18Prefix = store.getI18NPrefix
const { data, refetch } = store.getAll()
const materialId = ref<number>(initialValue)
const { mutationSuccess } = storeToRefs(store)
const emit = defineEmits(['onSelect'])
const materialsList = computed(() => data.value || [])
const closeDrawer = ref(false)
const onSelect = (id: number) => {
  const material = materialsList.value.find((material) => material.id === id)
  emit('onSelect', material)
  materialId.value = id
}
watch(
  () => mutationSuccess.value,
  (value) => {
    if (value) {
      refetch()
      mutationSuccess.value = false
      closeDrawer.value = value
    }
  }
)
watch(
  () => initialValue,
  (value) => {
    materialId.value = value
  }
)
</script>

<style scoped></style>
