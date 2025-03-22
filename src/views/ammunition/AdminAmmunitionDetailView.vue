<template>
  <ammunition-detail-component :id="id" />
</template>
<script setup lang="ts">
import AmmunitionDetailComponent from '@/components/__ammunition/AmmunitionDetailComponent.vue'

const { id } = defineProps<{
  id: string
}>()
</script>

<style scoped></style>
