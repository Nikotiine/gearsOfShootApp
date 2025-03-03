<template>
  <div v-if="!isRiffle && getHandGunByIdIsSuccess">
    <hand-gun-form-component
      v-if="getHandGunByIdIsSuccess"
      :selected-options="{
        type: handgun.data.type.id,
        category: handgun.data.category.id
      }"
      :hand-gun="handgun?.data"
    />
  </div>
  <div class="" v-if="isRiffle">
    <riffle-form-component
      v-if="getriffleByIdIsSuccess"
      :selected-options="{
        type: riffle.data.type.id,
        category: riffle.data.data.category.id
      }"
      :riffle="riffle.data"
    />
  </div>
</template>

<script setup lang="ts">
import { useHandGunStore } from '@/stores/hand-gun'
import { useRiffleStore } from '@/stores/riffle'
import type { WeaponViewType } from '@/views/weapon/AdminWeaponView.vue'
import { computed, ref, watchEffect } from 'vue'
import HandGunFormComponent from '@/components/__weapon/handgun/HandGunFormComponent.vue'

import RiffleFormComponent from '@/components/__weapon/riffle/RiffleFormComponent.vue'

const handGunStore = useHandGunStore()
const riffleStore = useRiffleStore()
const riffleId = ref<number>(0)
const handgunId = ref<number>(0)
const { data: handgun, isSuccess: getHandGunByIdIsSuccess } = handGunStore.getHandGunById(handgunId)
const { data: riffle, isSuccess: getriffleByIdIsSuccess } = riffleStore.getRiffleById(riffleId)
const { id, type } = defineProps<{
  id: string
  type: WeaponViewType
}>()

const isRiffle = computed(() => {
  return type === 'riffle'
})
watchEffect(() => {
  const weaponId = parseInt(id)
  if (type === 'riffle') {
    riffleId.value = weaponId
  } else {
    handgunId.value = weaponId
  }
})
</script>

<style scoped></style>
