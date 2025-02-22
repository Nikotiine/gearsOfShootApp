<template>
  <caliber-form-component />
  <div class="text-center mt-2">
    <Button :label="t('caliber.existingList')" @click="isVisibleDrawer = true" text />
  </div>
  <Drawer v-model:visible="isVisibleDrawer" position="bottom" style="height: auto">
    <div class="p-4"><caliber-table /></div>
  </Drawer>
</template>

<script setup lang="ts">
import Drawer from 'primevue/drawer'
import { ref } from 'vue'
import CaliberTable from '@/components/__caliber/CaliberTableComponent.vue'
import Button from 'primevue/button'
import { useI18n } from 'vue-i18n'
import CaliberFormComponent from '@/components/__caliber/CaliberFormComponent.vue'
const isVisibleDrawer = ref(false)

const { t } = useI18n()
</script>

<style scoped></style>
