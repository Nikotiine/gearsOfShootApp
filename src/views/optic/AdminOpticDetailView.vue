<template>
  <optic-detail-component :id="id" />
</template>
<script setup lang="ts">
import OpticDetailComponent from '@/components/__optic/OpticDetailComponent.vue'

const { id } = defineProps<{
  id: string
}>()
</script>

<style scoped></style>
