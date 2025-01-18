<template>
  <weapon-detail-component
    v-if="
      (isRiffle ? riffleStore.getRiffleById.isSuccess : handGunStore.getHandGunById.isSuccess) &&
      weapon
    "
    :weapon="weapon"
    :type="type"
  />
</template>

<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue'
import WeaponDetailComponent from '@/components/__weapon/WeaponDetailComponent.vue'
import { useRiffleStore } from '@/stores/riffle'
import { useHandGunStore } from '@/stores/hand-gun'
import type { WeaponViewModel } from '@/stores/weapon'
export type WeaponViewType = 'riffle' | 'handgun'
const riffleStore = useRiffleStore()
const handGunStore = useHandGunStore()
const weapon = ref<WeaponViewModel | null>(null)
const { id, type } = defineProps<{
  id: string
  type: WeaponViewType
}>()

const isRiffle = computed(() => {
  return type === 'riffle'
})

watchEffect(() => {
  if (type === 'riffle') {
    riffleStore.setRiffleId(parseInt(id))
    weapon.value = riffleStore.getRiffleById.isSuccess ? riffleStore.getRiffleById.data?.data : null
  } else {
    handGunStore.setHandGunId(parseInt(id))
    weapon.value = handGunStore.getHandGunById.isSuccess
      ? handGunStore.getHandGunById.data?.data
      : null
  }
})
</script>

<style scoped></style>
