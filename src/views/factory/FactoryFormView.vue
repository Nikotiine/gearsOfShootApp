<template>
  <div class="card">
    <h2 class="text-center mt-2 text-2xl">
      Ajouter une marque de {{ t('global.' + factoryTypeName) }}
    </h2>
    <div class="text-center mt-2">
      <Button label="Voir la liste des marque disponible" text @click="isVisible = true" />
    </div>
    <Dialog
      v-model:visible="isVisible"
      modal
      header="Liste"
      :style="{ width: '50rem' }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    >
      <factories-table :type="factoryTypeName" />
    </Dialog>
    <factory-form-component @change-Type="setTypeId" />
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue'
import Button from 'primevue/button'
import { useI18n } from 'vue-i18n'
import { useFactoryStore } from '@/stores/factory'
import FactoriesTable from '@/components/__factory/FactoriesTableComponent.vue'
import Dialog from 'primevue/dialog'
import FactoryFormComponent from '@/components/__factory/FactoryFormComponent.vue'

const { t } = useI18n()
const store = useFactoryStore()
const typeId = ref(0)

const setTypeId = (id: number) => {
  typeId.value = id
}

const isVisible = ref(false)

const factoryTypeName = computed(() => {
  let name = 'weapon'
  if (store.getFactoryTypes.data?.data.types) {
    const type = store.getFactoryTypes.data?.data.types.find((type) => type.id === typeId.value)
    if (type) {
      name = type.name
    }
  }
  return name
})
</script>

<style scoped></style>
