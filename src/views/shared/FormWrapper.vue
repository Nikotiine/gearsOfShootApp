<template>
  <component :is="formComponent" :id="id" :key="id" :form-status="formStatus" />
</template>
<script setup lang="ts">
// Props : On passe le composant de formulaire en paramètre
import { useRoute } from 'vue-router'
import { ref, watch } from 'vue'
import type { FormStatus } from '@/types/form-status.type'

const { formComponent } = defineProps<{
  formComponent: any // Le composant de formulaire à afficher
}>()

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
