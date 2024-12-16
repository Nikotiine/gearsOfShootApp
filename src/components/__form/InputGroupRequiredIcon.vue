<template>
  <InputGroupAddon>
    <i :class="isValidate ? validIcon : requiredIcon"></i>
  </InputGroupAddon>
</template>
<script setup lang="ts">
import InputGroupAddon from 'primevue/inputgroupaddon'

const { isValidate } = defineProps<{
  isValidate: boolean
}>()
const requiredIcon: string = 'pi pi-circle-fill'
const validIcon: string = 'pi pi-circle-fill text-green-400'
</script>

<style scoped></style>
