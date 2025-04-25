<template>
  <template>
    <InputGroup>
      <input-group-required-icon :is-validate="materialId > 0" v-if="required" />
      <input-group-optional-icon :is-completed="materialId > 0" v-else />
      <input-group-select
        :options="materialsList"
        label="name"
        @option-id="onSelect($event)"
        :required="required"
        placeholder="name"
        filter
        :input-id="inputId"
        :initial-value="materialId"
        :i18n-prefix="i18Prefix"
        :disabled="disabled"
      />
      <input-group-addon-open-drawer-button type="material" :close="closeDrawer" v-if="canAddNew" />
    </InputGroup>
  </template>
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
  required = false
} = defineProps<{
  initialValue?: number
  canAddNew?: boolean
  inputId?: string
  disabled?: boolean
  required?: boolean
}>()
const store = useMaterialStore()
const i18Prefix = store.getI18NPrefix
const { data: material$, refetch } = store.getAll()
const materialId = ref<number>(initialValue)
const { mutationSuccess } = storeToRefs(store)
const emit = defineEmits(['onSelect'])
const materialsList = computed(() => material$.value || [])
const closeDrawer = ref(false)
const onSelect = (id: number) => {
  emit('onSelect', id)
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
</script>

<style scoped></style>
