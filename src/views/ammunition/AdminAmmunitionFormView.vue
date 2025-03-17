<template>
  <ammunition-form-component :id="id" :key="id" :form-status="formStatus" />
</template>

<script setup lang="ts">
import AmmunitionFormComponent from '@/components/__ammunition/AmmunitionFormComponent.vue'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import type { FormStatus } from '@/types/form-status.type'

const route = useRoute()

const id = ref<string | undefined>(route.params.id ? (route.params.id as string) : undefined)
const formStatus = ref<FormStatus>(route.params.id ? 'edit' : 'save')
watch(
  () => route.params.id,
  (newId) => {
    id.value = newId ? (newId as string) : undefined
    formStatus.value = newId ? 'edit' : 'save'
  }
)
</script>

<style scoped></style>
