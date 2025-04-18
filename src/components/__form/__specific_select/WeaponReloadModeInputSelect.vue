<template>
  <InputGroup>
    <input-group-required-icon :is-validate="modeId > 0" v-if="required" />
    <input-group-optional-icon :is-completed="modeId > 0" v-else />
    <input-group-select
      :options="modes$"
      label="name"
      @option-id="onSelect($event)"
      :required="required"
      placeholder="placeholder"
      input-id="categoryId"
      :initial-value="modeId"
      :i18n-prefix="i18nPrefix"
      :disabled="disable"
    />
  </InputGroup>
</template>
<script setup lang="ts">
import InputGroupOptionalIcon from '@/components/__form/InputGroupOptionalIcon.vue'
import InputGroupRequiredIcon from '@/components/__form/InputGroupRequiredIcon.vue'
import InputGroupSelect from '@/components/__form/InputGroupSelect.vue'
import InputGroup from 'primevue/inputgroup'
import { useWeaponReloadModeStore } from '@/stores/weaponReloadMode'
import { ref } from 'vue'
const {
  initialValue = 0,
  required = false,
  disable = false
} = defineProps<{
  initialValue?: number
  required?: boolean
  disable?: boolean
}>()
const emit = defineEmits(['onSelect'])
const store = useWeaponReloadModeStore()
const i18nPrefix = store.getI18NPrefix
const { data: modes$ } = store.getAll()
const modeId = ref<number>(initialValue)
const onSelect = (id: number) => {
  emit('onSelect', id)
  modeId.value = id
}
</script>

<style scoped></style>
