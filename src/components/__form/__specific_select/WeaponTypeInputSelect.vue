<template>
  <InputGroup>
    <input-group-required-icon :is-validate="typeId > 0" v-if="required" />
    <input-group-optional-icon :is-completed="typeId > 0" v-else />
    <input-group-select
      :options="weaponTypeList"
      label="name"
      @option-id="onSelect($event)"
      required
      placeholder="name"
      filter
      input-id="caliberId"
      :initial-value="typeId"
      :i18n-prefix="i18Prefix"
    />
    <input-group-addon-open-drawer-button type="weaponType" :close="closeDrawer" v-if="canAddNew" />
  </InputGroup>
</template>
<script setup lang="ts">
import InputGroupAddonOpenDrawerButton from '@/components/__form/InputGroupAddonOpenDrawerButton.vue'
import InputGroupRequiredIcon from '@/components/__form/InputGroupRequiredIcon.vue'
import InputGroupSelect from '@/components/__form/InputGroupSelect.vue'
import { useWeaponTypeStore } from '@/stores/weaponType'
import InputGroup from 'primevue/inputgroup'
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
const typeId = ref<number>(initialValue)
const store = useWeaponTypeStore()
const i18Prefix = store.getI18NPrefix
const { data: weaponType$, refetch } = store.getAll()
const { mutationSuccess } = storeToRefs(store)
const emit = defineEmits(['onSelect'])
const weaponTypeList = computed(() => weaponType$.value || [])
const closeDrawer = ref(false)
const onSelect = (id: number) => {
  const otot = weaponTypeList.value.find((t) => t.id === id)
  emit('onSelect', otot)
  typeId.value = id
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
watch(
  () => initialValue,
  (value) => {
    typeId.value = value
  }
)
</script>

<style scoped></style>
