<template>
  <div class="text-center mt-2">
    <Button label="Voir les filletage disponible" @click="isVisibleDrawer = true" text />
  </div>
  <threaded-size-form-component />
  <Drawer v-model:visible="isVisibleDrawer" position="bottom" style="height: auto">
    <threaded-sizes-table-component />
  </Drawer>
</template>
<script setup lang="ts">
import Button from 'primevue/button'
import Drawer from 'primevue/drawer'
import { useI18n } from 'vue-i18n'
import { ref } from 'vue'
import ThreadedSizeFormComponent from '@/components/__threaded-size/ThreadedSizeFormComponent.vue'
import ThreadedSizesTableComponent from '@/components/__threaded-size/ThreadedSizesTableComponent.vue'
const { t } = useI18n()
const isVisibleDrawer = ref(false)
</script>

<style scoped></style>
