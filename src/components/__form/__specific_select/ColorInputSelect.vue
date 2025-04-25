<template>
  <template>
    <InputGroup>
      <input-group-required-icon :is-validate="colorId > 0" v-if="required" />
      <input-group-optional-icon :is-completed="colorId > 0" v-else />
      <input-group-select
        :options="colorsList"
        label="name"
        @option-id="onSelect($event)"
        required
        placeholder="name"
        filter
        :input-id="inputId"
        :initial-value="colorId"
        :i18n-prefix="i18Prefix"
        :disabled="disabled"
      />
      <input-group-addon-open-drawer-button type="color" :close="closeDrawer" v-if="canAddNew" />
    </InputGroup>
  </template>
</template>
<script setup lang="ts">
import InputGroupAddonOpenDrawerButton from '@/components/__form/InputGroupAddonOpenDrawerButton.vue'
import InputGroupRequiredIcon from '@/components/__form/InputGroupRequiredIcon.vue'
import InputGroupSelect from '@/components/__form/InputGroupSelect.vue'
import InputGroup from 'primevue/inputgroup'
import { computed, ref, watch } from 'vue'
import { useColorStore } from '@/stores/color'
import { storeToRefs } from 'pinia'
import InputGroupOptionalIcon from '@/components/__form/InputGroupOptionalIcon.vue'
const {
  initialValue = 0,
  canAddNew = false,
  inputId = 'colorId',
  disabled = false,
  required = false
} = defineProps<{
  initialValue?: number
  canAddNew?: boolean
  inputId?: string
  disabled?: boolean
  required?: boolean
}>()
const store = useColorStore()
const i18Prefix = store.getI18NPrefix
const { data: colors$, refetch } = store.getAll()
const colorId = ref<number>(initialValue)
const { mutationSuccess } = storeToRefs(store)
const emit = defineEmits(['onSelect'])
const colorsList = computed(() => colors$.value || [])
const closeDrawer = ref(false)
const onSelect = (id: number) => {
  emit('onSelect', id)
  colorId.value = id
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
