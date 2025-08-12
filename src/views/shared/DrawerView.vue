<template>
  <div class="card flex justify-center">
    <Drawer
      v-model:visible="visible"
      header="Drawer"
      :position="position"
      class="!w-full md:!w-80 lg:!w-[30rem]"
    >
      <component :is="resolvedComponent" v-if="visible" />
    </Drawer>
  </div>
</template>

<script setup lang="ts">
import Drawer from 'primevue/drawer'

import { computed, watch } from 'vue'
import AdminEditStockForm from '@/components/__stock/AdminEditStockForm.vue'
import { useStockStore } from '@/stores/stock.store'
import StockHistoriesComponent from '@/components/__stock/StockHistoriesComponent.vue'
export type DrawerPosition = 'left' | 'right' | 'bottom' | 'top' | 'full'
export type DrawerViewFormComponent = 'stock' | 'stockHistory'
const visible = defineModel<boolean>('visible')
const { position = 'right', component } = defineProps<{
  component: DrawerViewFormComponent
  position?: DrawerPosition
}>()
const componentMap = {
  stock: AdminEditStockForm,
  stockHistory: StockHistoriesComponent
}
const storeMap = {
  stock: useStockStore,
  stockHistory: useStockStore

  // ...
}
const currentStore = computed(() => {
  const storeFn = storeMap[component]
  return storeFn ? storeFn() : null
})
const resolvedComponent = computed(() => componentMap[component])

// Watch sur la mutation de succès
watch(
  () => currentStore.value?.submitSuccess,
  (success) => {
    if (success && currentStore.value) {
      visible.value = false
      // Optionnel : reset la success pour une prochaine utilisation
      currentStore.value.submitSuccess = false
    }
  }
)
</script>

<style scoped></style>
