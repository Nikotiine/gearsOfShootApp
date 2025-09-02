<template>
  <InputGroup>
    <input-group-required-icon :is-validate="headTypeId > 0" v-if="required" />
    <input-group-optional-icon :is-completed="headTypeId > 0" v-else />
    <input-group-select
      :options="headTypesList"
      :i18n-prefix="i18nPrefix"
      label="name"
      @option-id="onSelect($event)"
      :required="required"
      placeholder="placeholder"
      input-id="headTypeId"
      :initial-value="headTypeId"
    />
    <input-group-addon-open-drawer-button type="headType" v-if="canAddNew" />
  </InputGroup>
</template>
<script setup lang="ts">
import InputGroupRequiredIcon from '@/components/__form/InputGroupRequiredIcon.vue'
import InputGroupSelect from '@/components/__form/InputGroupSelect.vue'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddonOpenDrawerButton from '@/components/__form/InputGroupAddonOpenDrawerButton.vue'
import { computed, ref, watch } from 'vue'
import { useHeadTypeStore } from '@/stores/head-type.store'
import InputGroupOptionalIcon from '@/components/__form/InputGroupOptionalIcon.vue'

const store = useHeadTypeStore()
const i18nPrefix = store.getI18NPrefix
const { data: headTypes$ } = store.getAll()

const {
  initialValue = 0,
  canAddNew = false,
  required = false
} = defineProps<{
  initialValue?: number
  canAddNew?: boolean
  required?: boolean
}>()
const emit = defineEmits(['onSelect'])
const headTypesList = computed(() => headTypes$.value || [])
const headTypeId = ref<number>(initialValue)

const onSelect = (id: number) => {
  const type = headTypesList.value.find((type) => type.id === id)
  emit('onSelect', type)
  headTypeId.value = id
}

watch(
  () => initialValue,
  (value) => {
    headTypeId.value = value
  }
)
</script>

<style scoped></style>
