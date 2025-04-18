<template>
  <InputGroup>
    <input-group-required-icon :is-validate="bodyTypeId > 0" />
    <input-group-select
      :options="bodyTypesList"
      :i18n-prefix="i18nPrefix"
      placeholder="placeholder"
      label="name"
      @option-id="onSelect($event)"
      required
      input-id="bodyTypeId"
      :initial-value="bodyTypeId"
    />
    <input-group-addon-open-drawer-button :close="closeDrawer" type="bodyType" v-if="canAddNew" />
  </InputGroup>
</template>
<script setup lang="ts">
import InputGroupRequiredIcon from '@/components/__form/InputGroupRequiredIcon.vue'
import InputGroupSelect from '@/components/__form/InputGroupSelect.vue'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddonOpenDrawerButton from '@/components/__form/InputGroupAddonOpenDrawerButton.vue'
import { useBodyTypeStore } from '@/stores/bodyType'
import { computed, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
const store = useBodyTypeStore()
const i18nPrefix = store.getI18NPrefix
const { data: bodyTypes$, refetch } = store.getAll()
const { initialValue = 0, canAddNew = false } = defineProps<{
  initialValue?: number
  canAddNew?: boolean
}>()
const emit = defineEmits(['onSelect'])
const bodyTypesList = computed(() => bodyTypes$.value || [])
const bodyTypeId = ref<number>(initialValue)
const closeDrawer = ref(false)
const { mutationSuccess } = storeToRefs(store)
const onSelect = (id: number) => {
  emit('onSelect', id)
  bodyTypeId.value = id
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
