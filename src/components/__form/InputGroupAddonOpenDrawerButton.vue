<template>
  <InputGroupAddon>
    <Button
      :icon="icon"
      severity="secondary"
      v-tooltip.left="t('tooltip.' + type)"
      @click="toggleDrawer"
    />
  </InputGroupAddon>

  <drawer-form-view
    :visible="isVisibleDrawer"
    :type="type"
    @on-close="isVisibleDrawer = $event"
    :factory-type="factoryType"
  />
</template>

<script setup lang="ts">
import InputGroupAddon from 'primevue/inputgroupaddon'
import Button from 'primevue/button'
import { useI18n } from 'vue-i18n'
import type { DrawerType } from '@/types/form-type'
import { ref, watch } from 'vue'
import type { FactoryType } from '@/stores/factory'
import DrawerFormView from '@/views/shared/DrawerFormView.vue'

const { t } = useI18n()
const icon: string = 'pi pi-plus text-blue-700'
const {
  type,
  factoryType = 'weapon',
  close = false
} = defineProps<{
  type: DrawerType
  factoryType?: FactoryType
  close: boolean
}>()

const isVisibleDrawer = ref(false)
const toggleDrawer = () => {
  isVisibleDrawer.value = !isVisibleDrawer.value
}

watch(
  () => close,
  (value) => {
    if (value) {
      isVisibleDrawer.value = !isVisibleDrawer.value
    }
  }
)
</script>

<style scoped>
.p-inputgroupaddon {
  min-width: 11%;
}
</style>
