<template>
  <div class="card">
    <Dialog
      v-model:visible="isVisible"
      modal
      header="Liste"
      :style="{ width: '50rem' }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    >
      <factories-table :type="factoryTypeName" />
    </Dialog>
    <factory-form-component @change-type="setFactoryTypeName" />
    <div class="text-center mt-2">
      <Button :label="t('factory.existingList')" text @click="isVisible = true" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import Button from 'primevue/button'
import FactoriesTable from '@/components/__factory/FactoriesTableComponent.vue'
import Dialog from 'primevue/dialog'
import FactoryFormComponent from '@/components/__factory/FactoryFormComponent.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const isVisible = ref(false)
const factoryTypeName = ref('')
const setFactoryTypeName = (name: string) => {
  factoryTypeName.value = name
}
</script>

<style scoped></style>
