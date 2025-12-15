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
import WeaponTypeFormComponent from '@/components/__weapon/type/WeaponTypeFormComponent.vue'
import { useWeaponTypeStore } from '@/stores/weapon-type.store'
import CaliberFormComponent from '@/components/__caliber/CaliberFormComponent.vue'
import FactoryFormView from '@/views/factory/FactoryFormView.vue'
import MaterialFormComponent from '@/components/__color_and_material/MaterialFormComponent.vue'
import ColorFormComponent from '@/components/__color_and_material/ColorFormComponent.vue'
import ThreadedSizeFormComponent from '@/components/__threaded-size/ThreadedSizeFormComponent.vue'
import MagazineFormComponent from '@/components/__weaponMagazine/MagazineFormComponent.vue'
import BodyTypeFormComponent from '@/components/__ammunition/BodyTypeFormComponent.vue'
import HeadTypeFormComponent from '@/components/__ammunition/HeadTypeFormComponent.vue'
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
  weaponType: WeaponTypeFormComponent,
  caliber: CaliberFormComponent,
  factory: FactoryFormView,
  material: MaterialFormComponent,
  color: ColorFormComponent,
  threadSize: ThreadedSizeFormComponent,
  magazine: MagazineFormComponent,
  bodyType: BodyTypeFormComponent,
  headType: HeadTypeFormComponent
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
