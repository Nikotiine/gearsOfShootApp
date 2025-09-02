<template>
  <InputGroupAddon>
    <Button
      :icon="icon"
      severity="secondary"
      v-tooltip.left="t('tooltip.' + type)"
      @click="toggleDrawer"
    />
  </InputGroupAddon>

  <drawer-view v-model:visible="visible" :component="type" position="bottom" />
</template>

<script setup lang="ts">
import InputGroupAddon from 'primevue/inputgroupaddon'
import Button from 'primevue/button'
import { useI18n } from 'vue-i18n'
import { ref } from 'vue'
import DrawerView, { type DrawerViewFormComponent } from '@/views/shared/DrawerView.vue'

const { t } = useI18n()
const icon: string = 'pi pi-plus text-blue-700'
const { type } = defineProps<{
  type: DrawerViewFormComponent
}>()

const visible = ref(false)
const toggleDrawer = () => {
  visible.value = !visible.value
}
</script>

<style scoped>
.p-inputgroupaddon {
  min-width: 11%;
}
</style>
