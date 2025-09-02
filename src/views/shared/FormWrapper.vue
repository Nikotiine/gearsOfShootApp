<template>
  <component :is="formComponent" :id="id" :key="id" />
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref, watch } from 'vue'
import type { FormStatus } from '@/types/form-status.type'
import { useFormStore } from '@/stores/form.store'
// Props : On passe le composant de formulaire en paramètre
const { formComponent } = defineProps<{
  formComponent: any // Le composant de formulaire à afficher
}>()
const formStore = useFormStore()

const route = useRoute()
const id = ref<string | undefined>(route.params.id ? (route.params.id as string) : undefined)
const formStatus = ref<FormStatus>(route.params.id ? 'edit' : 'save')
formStore.setFormStatus(formStatus.value)
formStore.setCurrentId(id.value)
watch(
  () => route.params.id,
  (newId) => {
    id.value = newId ? (newId as string) : undefined
    formStore.setCurrentId(id.value)
    formStatus.value = newId ? 'edit' : 'save'
    formStore.setFormStatus(formStatus.value)
  }
)
</script>

<style scoped></style>
