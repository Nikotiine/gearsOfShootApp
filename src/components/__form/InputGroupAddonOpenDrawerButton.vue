<template>
  <InputGroupAddon>
    <Button
      :icon="icon"
      severity="secondary"
      v-tooltip.left="t('tooltip.' + type)"
      @click="openDrawer(type)"
    />
  </InputGroupAddon>

  <drawer-form-component
    :visible="isVisibleDrawer"
    :type="drawerType"
    @on-close="isVisibleDrawer = $event"
    :factory-type="factoryType"
  />
</template>

<script setup lang="ts">
import InputGroupAddon from 'primevue/inputgroupaddon'
import Button from 'primevue/button'
import { useI18n } from 'vue-i18n'
import type { DrawerType } from '@/types/form-type'
import { ref } from 'vue'
import DrawerFormComponent from '@/components/__form/DrawerFormComponent.vue'
import type { FactoryType } from '@/stores/factory'
const { t } = useI18n()
const icon: string = 'pi pi-plus text-blue-700'
const drawerType = ref<DrawerType>()
const { type, factoryType = 'Weapon' } = defineProps<{
  type: DrawerType
  factoryType?: FactoryType
}>()
const isVisibleDrawer = ref(false)
const openDrawer = (type: DrawerType) => {
  isVisibleDrawer.value = !isVisibleDrawer.value
  drawerType.value = type
}
</script>

<style scoped>
.p-inputgroupaddon {
  min-width: 11%;
}
</style>
