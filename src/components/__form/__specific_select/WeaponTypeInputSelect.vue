<template>
  <InputGroup>
    <input-group-required-icon :is-validate="typeId > 0" v-if="required" />
    <input-group-optional-icon :is-completed="typeId > 0" v-else />
    <input-group-select
      v-if="weaponTypeList.length > 0"
      :options="weaponTypeList"
      label="name"
      @option-id="onSelect($event)"
      required
      placeholder="name"
      :filter="filter"
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
import { useWeaponTypeStore } from '@/stores/weapon-type.store'
import InputGroup from 'primevue/inputgroup'
import { computed, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import InputGroupOptionalIcon from '@/components/__form/InputGroupOptionalIcon.vue'

import { type WeaponTypeDto, WeaponTypeDtoTypeEnum } from '@/api/Api'
import type { WeaponEnum } from '@/enum/weapon.enum'
const {
  initialValue = 0,
  canAddNew = false,
  required = false,
  prefilter = null,
  filter = false
} = defineProps<{
  filter?: boolean
  initialValue?: number
  canAddNew?: boolean
  required?: boolean
  prefilter?: WeaponEnum
}>()
const typeId = ref<number>(initialValue)
const store = useWeaponTypeStore()
const i18Prefix = store.getI18NPrefix
const { data: weaponType$, refetch } = store.getAll()

const { mutationSuccess } = storeToRefs(store)
const emit = defineEmits(['onSelect'])
const weaponTypeList = computed(() => {
  let list: WeaponTypeDto[] = []
  if (!prefilter) {
    list = weaponType$.value || []
  }

  if (prefilter === 'handgun') {
    list =
      weaponType$?.value?.filter((item) => {
        return item.type === WeaponTypeDtoTypeEnum.Handgun
      }) || []
  }
  if (prefilter === 'riffle') {
    list =
      weaponType$?.value?.filter((item) => {
        return item.type === WeaponTypeDtoTypeEnum.Riffle
      }) || []
  }

  return list
})

const closeDrawer = ref(false)
const onSelect = (id: number) => {
  const type = weaponTypeList.value.find((t) => t.id === id)
  emit('onSelect', type)
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
