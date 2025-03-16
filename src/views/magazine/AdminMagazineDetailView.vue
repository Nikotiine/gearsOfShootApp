<template>
  <magazine-detail-component v-if="data" :magazine="data" />
</template>
<script setup lang="ts">
import { useWeaponMagazineStore } from '@/stores/weapon-magazine'
import MagazineDetailComponent from '@/components/__weaponMagazine/MagazineDetailComponent.vue'

const store = useWeaponMagazineStore()
const { id } = defineProps<{
  id: string
}>()
const { data } = store.getById(id)
</script>

<style scoped></style>
