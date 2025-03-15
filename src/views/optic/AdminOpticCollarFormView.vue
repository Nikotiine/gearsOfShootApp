<template>
  <optic-collar-form-component :id="id" :key="id" />
</template>
<script setup lang="ts">
import OpticCollarFormComponent from '@/components/__optic/OpticCollarFormComponent.vue'
import { useRoute } from 'vue-router'
import { ref, watch } from 'vue'

const route = useRoute()

const id = ref<string | undefined>(route.params.id ? (route.params.id as string) : undefined)

watch(
  () => route.params.id,
  (newId) => {
    id.value = newId ? (newId as string) : undefined
  }
)
</script>

<style scoped></style>
