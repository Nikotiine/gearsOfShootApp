<template>
  <optic-collar-form-component :id="id" :key="id" :form-status="formStatus" />
</template>
<script setup lang="ts">
import OpticCollarFormComponent from '@/components/__optic/OpticCollarFormComponent.vue'
import { useRoute } from 'vue-router'
import { ref, watch } from 'vue'
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
