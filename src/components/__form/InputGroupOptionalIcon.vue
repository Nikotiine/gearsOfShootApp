<template>
  <InputGroupAddon>
    <i :class="isCompleted ? completedIcon : optionalIcon"></i>
  </InputGroupAddon>
</template>

<script setup lang="ts">
import InputGroupAddon from 'primevue/inputgroupaddon'
const { isCompleted } = defineProps<{
  isCompleted?: boolean
}>()
const optionalIcon: string = 'pi pi-circle'
const completedIcon: string = 'pi pi-circle text-green-400'
</script>

<style scoped></style>
