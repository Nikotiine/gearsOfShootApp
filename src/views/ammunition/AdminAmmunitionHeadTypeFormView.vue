<template>
  <head-type-form-component />
  <div class="text-center mt-2">
    <Button label="Voir les oviges disponibles" @click="isVisibleDrawer = true" text />
  </div>

  <Drawer v-model:visible="isVisibleDrawer" position="bottom" style="height: auto">
    <head-types-table />
  </Drawer>
</template>
<script setup lang="ts">
import { ref } from 'vue'

import Button from 'primevue/button'

import HeadTypesTable from '@/components/__ammunition/HeadTypesTableComponent.vue'
import Drawer from 'primevue/drawer'
import HeadTypeFormComponent from '@/components/__ammunition/HeadTypeFormComponent.vue'

const isVisibleDrawer = ref(false)
</script>

<style scoped></style>
