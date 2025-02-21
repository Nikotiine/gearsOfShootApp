<template>
  <weapon-detail-component
    v-if="(isRiffle ? getRiffleIsSuccess : gethandGunIsSuccess) && weapon"
    :weapon="isRiffle ? riffle : handgun"
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
const riffleId = ref<number>(0)
const handgunId = ref<number>(0)
const { data: riffle, isSuccess: getRiffleIsSuccess } = riffleStore.getRiffleById(riffleId)
const { data: handgun, isSuccess: gethandGunIsSuccess } = handGunStore.getHandGunById(riffleId)
watchEffect(() => {
  if (type === 'riffle') {
    riffleId.value = parseInt(id)
  } else {
    handgunId.value = parseInt(id)
  }
})
</script>

<style scoped></style>
