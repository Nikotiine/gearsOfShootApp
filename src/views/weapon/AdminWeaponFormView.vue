<template>
  <h2-form-component
    :initial-state="isShowForm"
    :selected-options="options"
    :change-options="toggleDisplay"
  />
  <select-weapon-type-component
    @next-step="chooseType"
    :selected-options="options"
    :show-button="!isShowForm"
  />
  <div v-if="isShowForm && isReady">
    <riffle-form-component v-if="isRiffleWeapon.value" :selected-options="options" />
    <hand-gun-form-component :selected-options="options" v-if="!isRiffleWeapon.value" :id="id" />
  </div>
</template>
<script setup lang="ts">
import SelectWeaponTypeComponent from '@/components/__weapon/SelectWeaponTypeComponent.vue'
import { computed, ref, watch, watchEffect } from 'vue'
import { type NewWeapon, useWeaponStore } from '@/stores/weapon'
import RiffleFormComponent from '@/components/__weapon/riffle/RiffleFormComponent.vue'
import HandGunFormComponent from '@/components/__weapon/handgun/HandGunFormComponent.vue'
import H2FormComponent from '@/components/__weapon/H2FormComponent.vue'
import { storeToRefs } from 'pinia'
import { WeaponEnum } from '@/enum/weapon.enum'

const store = useWeaponStore()

const isShowForm = ref<boolean>(false)
const isReady = ref<boolean>(false)
const { id, type } = defineProps<{
  id?: string
  type?: string
}>()
const { options } = storeToRefs(store)

const toggleDisplay = () => {
  store.resetOptions()
  isShowForm.value = !isShowForm.value
  isReady.value = false
  console.log(isShowForm.value)
}

const chooseType = (ids: NewWeapon) => {
  options.value = ids
  isShowForm.value = ids.type.id > 0 && ids.category.id > 0
  isReady.value = true
}
watchEffect(() => {
  console.log('toto', id)
  isShowForm.value = !!id

  isReady.value = true
})
const isRiffleWeapon = computed(() => {
  const isRiffleWeapon = ref<boolean>(true)
  console.log(type)
  if (
    options.value.type &&
    (options.value.type.name === WeaponEnum.PISTOLET ||
      options.value.type.name === WeaponEnum.REVLOVER ||
      type === 'handgun')
  ) {
    isRiffleWeapon.value = false
  }
  return isRiffleWeapon
})
</script>

<style scoped></style>
