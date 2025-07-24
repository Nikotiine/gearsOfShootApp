<template>
  <Drawer
    v-model:visible="isVisible"
    position="bottom"
    style="height: auto"
    @update:visible="onClose($event)"
  >
    <div class="p-4">
      <component :is="detailComponent" :key="type" :factory-type="factoryType" />
    </div>
  </Drawer>
</template>
<script setup lang="ts">
import Drawer from 'primevue/drawer'
import type { DrawerType } from '@/types/form-type'
import { computed, ref, watch } from 'vue'
import CaliberFormComponent from '@/components/__caliber/CaliberFormComponent.vue'
import FactoryFormComponent from '@/components/__factory/FactoryFormComponent.vue'
import type { FactoryType } from '@/stores/factory.store'
import HeadTypeFormComponent from '@/components/__ammunition/HeadTypeFormComponent.vue'
import BodyTypeFormComponent from '@/components/__ammunition/BodyTypeFormComponent.vue'
import WeaponTypeFormComponent from '@/components/__weapon/type/WeaponTypeFormComponent.vue'
import ColorFormComponent from '@/components/__color_and_material/ColorFormComponent.vue'
import MaterialFormComponent from '@/components/__color_and_material/MaterialFormComponent.vue'
import ThreadedSizeFormComponent from '@/components/__threaded-size/ThreadedSizeFormComponent.vue'
const { visible, type, factoryType } = defineProps<{
  visible: boolean
  type: DrawerType
  factoryType?: FactoryType
}>()
const isVisible = ref(visible)
const emit = defineEmits(['onClose'])
const onClose = (isVisible: boolean) => {
  emit('onClose', isVisible)
}
watch(
  () => visible,
  (value) => (isVisible.value = value)
)

const componentMap = {
  ['caliber']: CaliberFormComponent,
  ['factory']: FactoryFormComponent,
  ['material']: MaterialFormComponent,
  ['color']: ColorFormComponent,
  ['opticRail']: CaliberFormComponent,
  ['threadSize']: ThreadedSizeFormComponent,
  ['weaponType']: WeaponTypeFormComponent,
  ['magazine']: CaliberFormComponent,
  ['bodyType']: BodyTypeFormComponent,
  ['headType']: HeadTypeFormComponent
}
const detailComponent = computed(() => componentMap[type as DrawerType])
</script>

<style scoped></style>
