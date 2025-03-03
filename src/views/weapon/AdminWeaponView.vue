<template>
  <weapon-detail-component
    v-if="(isRiffle ? getRiffleIsSuccess : getHandGunIsSuccess) && weapon"
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
import { storeToRefs } from 'pinia'
import { WeaponEnum } from '@/enum/weapon.enum'
export type WeaponViewType = 'riffle' | 'handgun'
const riffleStore = useRiffleStore()
const handGunStore = useHandGunStore()
const weapon = ref<WeaponViewModel>()
const { id, type } = defineProps<{
  id: string
  type: WeaponViewType
}>()

const isRiffle = computed(() => {
  return type === WeaponEnum.RIFFLE
})
const riffleId = ref<number>(0)
const handgunId = ref<number>(0)
const { isSuccess: getRiffleIsSuccess } = riffleStore.getRiffleById(riffleId)
const { isSuccess: getHandGunIsSuccess } = handGunStore.getHandGunById(handgunId)
const { handgun$ } = storeToRefs(handGunStore)
const { riffle$ } = storeToRefs(riffleStore)
watchEffect(() => {
  if (type === WeaponEnum.RIFFLE) {
    riffleId.value = parseInt(id)
    if (riffle$.value) {
      weapon.value = { ...riffle$.value }
    }
  } else {
    handgunId.value = parseInt(id)
    if (handgun$.value) {
      weapon.value = { ...handgun$.value }
    }
  }
})
</script>

<style scoped></style>
