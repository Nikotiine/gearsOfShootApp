<template>
  <InputGroup>
    <input-group-required-icon :is-validate="caliberId > 0" v-if="required" />
    <input-group-optional-icon :is-completed="caliberId > 0" v-else />
    <input-group-select
      :options="calibersList"
      label="name"
      @option-id="onSelect($event)"
      required
      filter
      input-id="caliberId"
      :initial-value="caliberId"
      :i18n-prefix="i18Prefix"
    />
    <input-group-addon-open-drawer-button type="caliber" v-if="canAddNew" />
  </InputGroup>
</template>
<script setup lang="ts">
import InputGroupRequiredIcon from '@/components/__form/InputGroupRequiredIcon.vue'
import InputGroupSelect from '@/components/__form/InputGroupSelect.vue'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddonOpenDrawerButton from '@/components/__form/InputGroupAddonOpenDrawerButton.vue'
import { useCaliberStore } from '@/stores/caliber.store'
import { computed, ref, watch } from 'vue'
import InputGroupOptionalIcon from '@/components/__form/InputGroupOptionalIcon.vue'

const {
  initialValue = 0,
  canAddNew = false,
  required = false
} = defineProps<{
  initialValue?: number
  canAddNew?: boolean
  required?: boolean
}>()
const caliberId = ref<number>(initialValue)
const store = useCaliberStore()
const i18Prefix = store.getI18NPrefix
const { data } = store.getAll()

const emit = defineEmits(['onSelect'])
const calibersList = computed(() => data.value || [])

const onSelect = (id: number) => {
  const caliber = calibersList.value.find((caliber) => caliber.id === id)
  emit('onSelect', caliber)
  caliberId.value = id
}

watch(
  () => initialValue,
  (value) => {
    caliberId.value = value
  }
)
</script>

<style scoped></style>
