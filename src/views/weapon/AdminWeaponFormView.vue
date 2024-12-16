<template>
  <h2-form-component :initial-state="isShowForm" :selected-options="options" />
  <select-weapon-type-component @next-step="chooseType" :open-drawer="openDrawerForm" />
  <div v-if="isShowForm">
    <riffle-form-component
      v-if="isRiffleWeapon.value"
      :selected-options="options"
      :open-drawer="openDrawerForm"
    />
    <hand-gun-form-component :selected-options="options" v-if="!isRiffleWeapon.value" />
  </div>
</template>
<script setup lang="ts">
import type { WeaponTypeDto } from '@/api/Api'

import SelectWeaponTypeComponent from '@/components/__weapon/SelectWeaponTypeComponent.vue'
import { computed, ref } from 'vue'
import { type NewWeapon, useWeaponStore } from '@/stores/weapon'
import { storeToRefs } from 'pinia'
import RiffleFormComponent from '@/components/__weapon/RiffleFormComponent.vue'
import HandGunFormComponent from '@/components/__weapon/HandGunFormComponent.vue'
import H2FormComponent from '@/components/__weapon/H2FormComponent.vue'
import type { DrawerType } from '@/types/form-type'

const store = useWeaponStore()
const { weaponTypes$ } = storeToRefs(store)
const isShowForm = ref<boolean>(false)
const options = ref<NewWeapon>({
  type: 0,
  category: 0
})
const chooseType = (ids: NewWeapon) => {
  options.value = ids
  isShowForm.value = ids.type > 0 && ids.category > 0
}
const openDrawerForm = (type: DrawerType) => {
  console.log(type)
}
const isRiffleWeapon = computed(() => {
  const isRiffleWeapon = ref<boolean>(true)

  const weaponType: WeaponTypeDto | undefined = weaponTypes$.value.find(
    (type) => type.id === options.value.type
  )

  if (weaponType && (weaponType.name === 'Pistolet' || weaponType.name === 'Revolver')) {
    isRiffleWeapon.value = false
  }
  return isRiffleWeapon
})
</script>

<style scoped></style>
