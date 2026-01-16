<template>
  <InputGroup>
    <input-group-required-icon :is-validate="factoryTypeId > 0" v-if="required" />
    <input-group-optional-icon :is-completed="factoryTypeId > 0" v-else />
    <input-group-select
      :options="factoryTypeList"
      label="type"
      @option-id="onSelect($event)"
      :required="required"
      option-label="label"
      placeholder="chooseType"
      input-id="categoryId"
      :initial-value="factoryTypeId"
      :i18n-prefix="i18nPrefix"
    />
  </InputGroup>
</template>
<script setup lang="ts">
import { useFactoryStore } from '@/stores/factory.store'
import { computed, ref, watch } from 'vue'
import InputGroupOptionalIcon from '@/components/__form/InputGroupOptionalIcon.vue'
import InputGroupRequiredIcon from '@/components/__form/InputGroupRequiredIcon.vue'
import InputGroupSelect from '@/components/__form/InputGroupSelect.vue'
import InputGroup from 'primevue/inputgroup'
import { FactoryTypeFormatter } from '@/shared/utils/formatter.utils'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const store = useFactoryStore()
const { data } = store.getFactoryTypes()
const { initialValue = 0, required = false } = defineProps<{
  initialValue?: number
  required?: boolean
}>()
const factoryTypeId = ref<number>(initialValue)
const i18nPrefix = store.getI18NPrefix
const factoryTypeList = computed(() => FactoryTypeFormatter(t, data.value))
const emit = defineEmits(['onSelect'])
const onSelect = (id: number) => {
  const type = factoryTypeList.value.find((item) => item.id === id)
  emit('onSelect', type)
  factoryTypeId.value = id
}
watch(
  () => initialValue,
  (value) => {
    factoryTypeId.value = value
  }
)
</script>

<style scoped></style>
