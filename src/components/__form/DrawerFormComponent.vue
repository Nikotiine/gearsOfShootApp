<template>
  <Drawer
    v-model:visible="isVisible"
    position="bottom"
    style="height: auto"
    @update:visible="onClose($event)"
  >
    <div class="p-4">
      <caliber-form-component v-if="type === 'caliber'" @on-save="isVisible = false" />
      <factory-form-component v-if="type === 'factory'" @on-save="isVisible = false" />
      <magazine-form-component v-if="type === 'magazine'" />
      <weapon-type-form-component v-if="type === 'weaponType'" @on-save="isVisible = false" />
      <color-form-component v-if="type === 'color'" />
      <threaded-size-form-component v-if="type === 'threadSize'" @on-save="isVisible = false" />
      <material-form-component v-if="type === 'material'" />
    </div>
  </Drawer>
</template>

<script setup lang="ts">
import MagazineFormComponent from '@/components/__weaponMagazine/MagazineFormComponent.vue'
import Drawer from 'primevue/drawer'
import type { DrawerType } from '@/types/form-type'
import { ref, watch } from 'vue'
import CaliberFormComponent from '@/components/__caliber/CaliberFormComponent.vue'
import FactoryFormComponent from '@/components/__factory/FactoryFormComponent.vue'
import WeaponTypeFormComponent from '@/components/__weapon/WeaponTypeFormComponent.vue'
import ColorFormComponent from '@/components/__color_and_material/ColorFormComponent.vue'
import ThreadedSizeFormComponent from '@/components/__threaded-size/ThreadedSizeFormComponent.vue'
import MaterialFormComponent from '@/components/__color_and_material/MaterialFormComponent.vue'

const { visible, type } = defineProps<{
  visible: boolean
  type?: DrawerType
}>()
const emit = defineEmits(['onClose'])
const isVisible = ref(false)
watch(
  () => visible,
  (value) => (isVisible.value = value)
)
const onClose = (isVisible: boolean) => {
  emit('onClose', isVisible)
}
</script>

<style scoped></style>
