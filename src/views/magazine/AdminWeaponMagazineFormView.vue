<template>
  <magazine-form-component :magazine="magazine?.data" />
</template>
<script setup lang="ts">
import MagazineFormComponent from '@/components/__weaponMagazine/MagazineFormComponent.vue'
import { useWeaponMagazineStore } from '@/stores/weapon-magazine'
import { ref } from 'vue'
const { id = null } = defineProps<{
  id?: string
}>()
const store = useWeaponMagazineStore()
const magazineId = ref<number>(0)
if (id) {
  magazineId.value = parseInt(id)
}
const { data: magazine } = store.getById(magazineId)
</script>

<style scoped></style>
