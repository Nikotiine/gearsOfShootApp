<template>
  <div v-if="!isRiffle && handGunStore.getHandGunById.isSuccess">
    <hand-gun-form-component
      :selected-options="{
        type: handGunStore.getHandGunById.data.data.type.id,
        category: handGunStore.getHandGunById.data.data.category.id
      }"
      :hand-gun="handGunStore.getHandGunById.data.data"
    />
  </div>
  <div class="" v-if="isRiffle && riffleStore.getRiffleById.isSuccess">
    <riffle-form-component
      :selected-options="{
        type: riffleStore.getRiffleById.data.data.type.id,
        category: riffleStore.getRiffleById.data.data.category.id
      }"
      :riffle="riffleStore.getRiffleById.data.data"
    />
  </div>
</template>

<script setup lang="ts">
import { useHandGunStore } from '@/stores/hand-gun'
import { useRiffleStore } from '@/stores/riffle'
import type { WeaponViewType } from '@/views/weapon/WeaponView.vue'
import { computed, watchEffect } from 'vue'
import HandGunFormComponent from '@/components/__weapon/HandGunFormComponent.vue'

import RiffleFormComponent from '@/components/__weapon/RiffleFormComponent.vue'

const handGunStore = useHandGunStore()

const riffleStore = useRiffleStore()
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
    riffleStore.setRiffleId(weaponId)
  } else {
    handGunStore.setHandGunId(weaponId)
  }
})
</script>

<style scoped></style>
