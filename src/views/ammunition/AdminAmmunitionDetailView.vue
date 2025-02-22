<template>
  <ammunition-detail-component :id="id" />
</template>
<script setup lang="ts">
import AmmunitionDetailComponent from '@/components/__ammunition/AmmunitionDetailComponent.vue'
import { ref } from 'vue'
import { useAmmunitionStore } from '@/stores/ammunition'
const store = useAmmunitionStore()
const { id } = defineProps<{
  id: string
}>()
</script>

<style scoped></style>
