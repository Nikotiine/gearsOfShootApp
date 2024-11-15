<template>
  <weapon-type-form-component />
  <div class="text-center mt-2">
    <Button label="Voir les type d'arme disponible" @click="isVisibleDrawer = true" text />
  </div>
  <Drawer v-model:visible="isVisibleDrawer" position="bottom" style="height: auto">
    <weapon-types-table />
  </Drawer>
</template>
<script setup lang="ts">
import Button from 'primevue/button'

import { ref } from 'vue'

import WeaponTypesTable from '@/components/__weapon/WeaponTypesTable.vue'
import Drawer from 'primevue/drawer'
import WeaponTypeFormComponent from '@/components/__weapon/WeaponTypeFormComponent.vue'

const isVisibleDrawer = ref(false)
</script>

<style scoped></style>
