<template>
  <InputGroup>
    <input-group-required-icon :is-validate="caliberId > 0" v-if="required" />
    <input-group-optional-icon :is-completed="caliberId > 0" v-else />
    <input-group-select
      :options="calibersList"
      label="name"
      @option-id="onSelect($event)"
      required
      placeholder="name"
      filter
      input-id="caliberId"
      :initial-value="caliberId"
      :i18n-prefix="i18Prefix"
    />
    <input-group-addon-open-drawer-button type="caliber" :close="closeDrawer" v-if="canAddNew" />
  </InputGroup>
</template>
<script setup lang="ts">
import InputGroupRequiredIcon from '@/components/__form/InputGroupRequiredIcon.vue'
import InputGroupSelect from '@/components/__form/InputGroupSelect.vue'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddonOpenDrawerButton from '@/components/__form/InputGroupAddonOpenDrawerButton.vue'
import { useCaliberStore } from '@/stores/caliber'
import { computed, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
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
const { data: calibers$, refetch } = store.getAll()
const { mutationSuccess } = storeToRefs(store)
const emit = defineEmits(['onSelect'])
const calibersList = computed(() => calibers$.value || [])
const closeDrawer = ref(false)
const onSelect = (id: number) => {
  emit('onSelect', id)
  caliberId.value = id
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
