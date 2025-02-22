<template>
  <ammunition-table-composant :category="category" />
</template>
<script setup lang="ts">
import AmmunitionTableComposant from '@/components/__ammunition/AmmunitionTableComposant.vue'

const { category } = defineProps<{
  category: string
}>()
</script>

<style scoped></style>
