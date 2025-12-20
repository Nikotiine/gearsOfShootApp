<template>
  <InputGroup>
    <input-group-required-icon :is-validate="factoryId > 0" v-if="required" />
    <input-group-optional-icon :is-completed="factoryId > 0" v-else />
    <input-group-select
      :options="factoriesList"
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
      v-if="canAddNew"
      :factory-type="factoryType"
    />
  </InputGroup>
</template>
<script setup lang="ts">
import InputGroupRequiredIcon from '@/components/__form/InputGroupRequiredIcon.vue'
import InputGroupSelect from '@/components/__form/InputGroupSelect.vue'
import InputGroup from 'primevue/inputgroup'
import { computed, onBeforeMount, ref, watch } from 'vue'
import { type FactoryType, useFactoryStore } from '@/stores/factory.store'
import InputGroupAddonOpenDrawerButton from '@/components/__form/InputGroupAddonOpenDrawerButton.vue'
import InputGroupOptionalIcon from '@/components/__form/InputGroupOptionalIcon.vue'
import { storeToRefs } from 'pinia'

const store = useFactoryStore()
const emit = defineEmits(['onSelect'])

const {
  initialValue = 0,
  canAddNew = false,
  factoryType,
  required = false
} = defineProps<{
  initialValue?: number
  canAddNew?: boolean
  factoryType: FactoryType
  required?: boolean
}>()
const factoryId = ref<number>(initialValue)
const { queryFilters$ } = storeToRefs(store)
onBeforeMount(() => {
  queryFilters$.value.type = factoryType
})
const { data } = store.getAll()
const factoriesList = computed(() => data.value?.data || [])
const onSelect = (id: number) => {
  const factory = factoriesList.value.find((f) => f.id === id)
  emit('onSelect', factory)
  factoryId.value = id
}

watch(
  () => initialValue,
  (value) => {
    factoryId.value = value
  }
)
</script>

<style scoped></style>
