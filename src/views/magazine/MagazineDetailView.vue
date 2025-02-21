<template>
  <magazine-detail-component v-if="magazine?.data" :magazine="magazine?.data" />
</template>
<script setup lang="ts">
import { useWeaponMagazineStore } from '@/stores/weapon-magazine'
import { ref } from 'vue'
import MagazineDetailComponent from '@/components/__weaponMagazine/MagazineDetailComponent.vue'

const { id } = defineProps<{ id: string }>()
const store = useWeaponMagazineStore()
const magazineId = ref<number>(parseInt(id))
const { data: magazine } = store.getById(magazineId)
</script>

<style scoped></style>
