<template>
  <div>
    <h2 class="text-center text-2xl">{{ t('bodyType.form.addTitle') }}</h2>
    <div class="text-center mt-2">
      <Button label="Voir les types disponible" @click="isVisibleDrawer = true" text />
    </div>
    <body-type-form-component />
  </div>

  <Drawer v-model:visible="isVisibleDrawer" position="bottom" style="height: auto">
    <div class="p-4"><body-types-table /></div>
  </Drawer>
</template>
<script setup lang="ts">
import { ref } from 'vue'

import Button from 'primevue/button'

import Drawer from 'primevue/drawer'
import { useI18n } from 'vue-i18n'
import BodyTypesTable from '@/components/__ammunition/BodyTypesTableComponent.vue'
import BodyTypeFormComponent from '@/components/__ammunition/BodyTypeFormComponent.vue'

const { t } = useI18n()
const isVisibleDrawer = ref(false)
</script>

<style scoped></style>
