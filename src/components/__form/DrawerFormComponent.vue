<template>
  <Drawer
    v-model:visible="isVisible"
    position="bottom"
    style="height: auto"
    @update:visible="onClose($event)"
  >
    <div class="p-4">
      <caliber-form-component v-if="type === 'caliber'" @on-save="isVisible = false" />
      <factory-form-component
        v-if="type === 'factory'"
        @on-save="isVisible = false"
        :factory="factoryType"
      />
      <magazine-form-component v-if="type === 'magazine'" @on-save="isVisible = false" />
      <weapon-type-form-component v-if="type === 'weaponType'" @on-save="isVisible = false" />
      <color-form-component v-if="type === 'color'" @on-save="isVisible = false" />
      <threaded-size-form-component v-if="type === 'threadSize'" @on-save="isVisible = false" />
      <material-form-component v-if="type === 'material'" @on-save="isVisible = false" />
      <head-type-form-component v-if="type === 'headType'" @on-save="isVisible = false" />
      <body-type-form-component v-if="type === 'bodyType'" @on-save="isVisible = false" />
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
import WeaponTypeFormComponent from '@/components/__weapon/type/WeaponTypeFormComponent.vue'
import ColorFormComponent from '@/components/__color_and_material/ColorFormComponent.vue'
import ThreadedSizeFormComponent from '@/components/__threaded-size/ThreadedSizeFormComponent.vue'
import MaterialFormComponent from '@/components/__color_and_material/MaterialFormComponent.vue'
import type { FactoryType } from '@/stores/factory'
import HeadTypeFormComponent from '@/components/__ammunition/HeadTypeFormComponent.vue'
import BodyTypeFormComponent from '@/components/__ammunition/BodyTypeFormComponent.vue'

const { visible, type, factoryType } = defineProps<{
  visible: boolean
  type?: DrawerType
  factoryType: FactoryType
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
