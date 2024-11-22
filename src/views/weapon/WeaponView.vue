<template>
  <div class="" v-if="store.findById.isSuccess">
    <weapon-detail-component :weapon="store.findById.data.data" />
  </div>
</template>
<script setup lang="ts">
import { watchEffect } from 'vue'
import { useWeaponStore } from '@/stores/weapon'
import WeaponDetailComponent from '@/components/__weapon/WeaponDetailComponent.vue'

const store = useWeaponStore()
//const { setWeaponId } = storeToRefs(store)
const { id } = defineProps<{
  id: string
}>()

watchEffect(() => {
  console.log(id)
  store.setWeaponId(parseInt(id))
})
</script>

<style scoped></style>
