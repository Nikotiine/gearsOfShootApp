<template>
  <div class="card flex justify-center">
    <Drawer
      v-model:visible="visible"
      :header="t('drawer.' + component)"
      :position="position"
      :class="drawerClass"
      style="height: auto"
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
import { useI18n } from 'vue-i18n'
import WeaponTypeFormView from '@/views/internal-ref/weapon-type/WeaponTypeFormView.vue'
import { useWeaponTypeStore } from '@/stores/weapon-type.store'
import CaliberFormView from '@/views/internal-ref/caliber/CaliberFormView.vue'
import FactoryFormView from '@/views/factory/FactoryFormView.vue'
import MaterialFormView from '@/views/internal-ref/material/MaterialFormView.vue'
import ColorFormView from '@/views/internal-ref/color/ColorFormView.vue'
import ThreadedSizeFormView from '@/views/internal-ref/threaded-size/ThreadedSizeFormView.vue'
import MagazineFormView from '@/views/weapon/magazine/MagazineFormView.vue'
import BodyTypeFormView from '@/views/internal-ref/ammunition/BodyTypeFormView.vue'
import HeadTypeFormView from '@/views/internal-ref/ammunition/HeadTypeFormView.vue'
import { useCaliberStore } from '@/stores/caliber.store'
import { useFactoryStore } from '@/stores/factory.store'
import { useMaterialStore } from '@/stores/material.store'
import { useColorStore } from '@/stores/color.store'
import { useThreadedSizeStore } from '@/stores/threaded-size.store'
import { useWeaponMagazineStore } from '@/stores/weapon-magazine.store'
import { useBodyTypeStore } from '@/stores/body-type.store'
import { useHeadTypeStore } from '@/stores/head-type.store'

export type DrawerPosition = 'left' | 'right' | 'bottom' | 'top' | 'full'
export type DrawerViewFormComponent =
  | 'stock'
  | 'stockHistory'
  | 'caliber'
  | 'factory'
  | 'material'
  | 'color'
  | 'threadSize'
  | 'weaponType'
  | 'magazine'
  | 'bodyType'
  | 'headType'
const visible = defineModel<boolean>('visible')
const { position = 'right', component } = defineProps<{
  component: DrawerViewFormComponent
  position?: DrawerPosition
}>()
const { t } = useI18n()
const componentMap = {
  stock: AdminEditStockForm,
  stockHistory: StockHistoriesComponent,
  weaponType: WeaponTypeFormView,
  caliber: CaliberFormView,
  factory: FactoryFormView,
  material: MaterialFormView,
  color: ColorFormView,
  threadSize: ThreadedSizeFormView,
  magazine: MagazineFormView,
  bodyType: BodyTypeFormView,
  headType: HeadTypeFormView
}
const storeMap = {
  stock: useStockStore,
  stockHistory: useStockStore,
  weaponType: useWeaponTypeStore,
  caliber: useCaliberStore,
  factory: useFactoryStore,
  material: useMaterialStore,
  color: useColorStore,
  threadSize: useThreadedSizeStore,
  magazine: useWeaponMagazineStore,
  bodyType: useBodyTypeStore,
  headType: useHeadTypeStore
  // ...
}
const currentStore = computed(() => {
  const storeFn = storeMap[component]
  return storeFn ? storeFn() : null
})
const resolvedComponent = computed(() => componentMap[component])
const drawerClass = computed(() => {
  if (position === 'top' || position === 'bottom') {
    return '!w-full'
  }
  return '!w-full md:!w-80 lg:!w-[30rem]'
})
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
