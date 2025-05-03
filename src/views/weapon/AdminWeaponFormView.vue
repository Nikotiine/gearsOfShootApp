<template>
  <h2-form-component
    :initial-state="isShowForm"
    :selected-options="options"
    :change-options="toggleDisplay"
  />
  <select-weapon-type-component @next-step="chooseType" :selected-options="options" />
  <div v-if="isShowForm">
    <riffle-form-component v-if="isRiffleWeapon.value" :selected-options="options" />
    <hand-gun-form-component :selected-options="options" v-if="!isRiffleWeapon.value" />
  </div>
</template>
<script setup lang="ts">
import SelectWeaponTypeComponent from '@/components/__weapon/SelectWeaponTypeComponent.vue'
import { computed, ref } from 'vue'
import { type NewWeapon, useWeaponStore } from '@/stores/weapon'
import RiffleFormComponent from '@/components/__weapon/riffle/RiffleFormComponent.vue'
import HandGunFormComponent from '@/components/__weapon/handgun/HandGunFormComponent.vue'
import H2FormComponent from '@/components/__weapon/H2FormComponent.vue'
import { storeToRefs } from 'pinia'
import { WeaponEnum } from '@/enum/weapon.enum'

const store = useWeaponStore()

const isShowForm = ref<boolean>(false)

const { options } = storeToRefs(store)

const toggleDisplay = () => {
  store.resetOptions()
  isShowForm.value = !isShowForm.value
}

const chooseType = (ids: NewWeapon) => {
  options.value = ids
  isShowForm.value = ids.type.id > 0 && ids.category.id > 0
}

const isRiffleWeapon = computed(() => {
  const isRiffleWeapon = ref<boolean>(true)

  if (
    options.value.type &&
    (options.value.type.name === WeaponEnum.PISTOLET ||
      options.value.type.name === WeaponEnum.REVLOVER)
  ) {
    isRiffleWeapon.value = false
  }
  return isRiffleWeapon
})
</script>

<style scoped></style>
