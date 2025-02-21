<template>
  <h2-form-component
    :initial-state="isShowForm"
    :selected-options="options"
    :change-options="toggleDisplay"
  />
  <select-weapon-type-component @next-step="chooseType" :reset="!isShowForm" />
  <div v-if="isShowForm">
    <riffle-form-component v-if="isRiffleWeapon.value" :selected-options="options" />
    <hand-gun-form-component :selected-options="options" v-if="!isRiffleWeapon.value" />
  </div>
</template>
<script setup lang="ts">
import type { WeaponTypeDto } from '@/api/Api'
import SelectWeaponTypeComponent from '@/components/__weapon/SelectWeaponTypeComponent.vue'
import { computed, ref } from 'vue'
import { type NewWeapon, useWeaponStore } from '@/stores/weapon'
import { storeToRefs } from 'pinia'
import RiffleFormComponent from '@/components/__weapon/riffle/RiffleFormComponent.vue'
import HandGunFormComponent from '@/components/__weapon/handgun/HandGunFormComponent.vue'
import H2FormComponent from '@/components/__weapon/H2FormComponent.vue'

const store = useWeaponStore()
const { weaponTypes$ } = storeToRefs(store)
const isShowForm = ref<boolean>(false)
const options = ref<NewWeapon>({
  type: 0,
  category: 0
})

const toggleDisplay = () => {
  options.value.type = 0
  options.value.category = 0
  isShowForm.value = !isShowForm.value
}

const chooseType = (ids: NewWeapon) => {
  options.value = ids
  isShowForm.value = ids.type > 0 && ids.category > 0
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
