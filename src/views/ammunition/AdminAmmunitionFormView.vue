<template>
  <ammunition-form-component :open-drawer="openDrawerForm" />
</template>

<script setup lang="ts">
import AmmunitionFormComponent from '@/components/__ammunition/AmmunitionFormComponent.vue'
import type { DrawerType } from '@/types/form-type'

const openDrawerForm = (type: DrawerType) => {
  console.log(type)
}
</script>

<style scoped></style>
