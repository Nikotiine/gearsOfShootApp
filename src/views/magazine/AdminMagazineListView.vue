<template>
  <magazine-table-component :category="category" />
</template>
<script setup lang="ts">
import MagazineTableComponent from '@/components/__weaponMagazine/MagazineTableComponent.vue'

const { category } = defineProps<{
  category: string
}>()
</script>

<style scoped></style>
