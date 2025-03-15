<template>
  <optic-collar-detail-component v-if="data" :collar="data" />
</template>
<script setup lang="ts">
import OpticCollarDetailComponent from '@/components/__optic/OpticCollarDetailComponent.vue'
import { useOpticCollarStore } from '@/stores/optic-collar'

const store = useOpticCollarStore()
const { id } = defineProps<{
  id: string
}>()
const { data } = store.getById(id)
</script>

<style scoped></style>
