<template>
  <InputGroup>
    <input-group-required-icon :is-validate="factoryId > 0" />
    <input-group-select
      :options="factories$"
      label="name"
      @option-id="onSelect($event)"
      required
      placeholder="factory"
      filter
      input-id="factoryId"
      :initial-value="factoryId"
    />
    <input-group-addon-open-drawer-button
      type="factory"
      :close="closeDrawer"
      v-if="canAddNew"
      :factory-type="factoryType"
    />
  </InputGroup>
</template>
<script setup lang="ts">
import InputGroupRequiredIcon from '@/components/__form/InputGroupRequiredIcon.vue'
import InputGroupSelect from '@/components/__form/InputGroupSelect.vue'
import InputGroup from 'primevue/inputgroup'
import { ref, watch } from 'vue'
import { type FactoryType, useFactoryStore } from '@/stores/factory'
import InputGroupAddonOpenDrawerButton from '@/components/__form/InputGroupAddonOpenDrawerButton.vue'
import { storeToRefs } from 'pinia'
const store = useFactoryStore()
const emit = defineEmits(['onSelect'])
const { mutationSuccess } = storeToRefs(store)
const {
  initialValue = 0,
  canAddNew = false,
  factoryType = undefined
} = defineProps<{
  initialValue?: number
  canAddNew?: boolean
  factoryType?: FactoryType
}>()
const factoryId = ref<number>(initialValue)
const closeDrawer = ref(false)
const { data: factories$, refetch } = store.getFactoriesByType(factoryType)

const onSelect = (id: number) => {
  emit('onSelect', id)
  factoryId.value = id
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
