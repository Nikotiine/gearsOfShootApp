<template>
  <ammunition-form-component :ammunition="ammunition$?.data" />
</template>

<script setup lang="ts">
import AmmunitionFormComponent from '@/components/__ammunition/AmmunitionFormComponent.vue'
import { useAmmunitionStore } from '@/stores/ammunition'
import { ref, watchEffect } from 'vue'
const { id } = defineProps<{ id?: string }>()
const store = useAmmunitionStore()
const ammunitionId = ref<number>(0)
if (id) {
  ammunitionId.value = parseInt(id)
}
const { data: ammunition$ } = store.getById(ammunitionId)
</script>

<style scoped></style>
