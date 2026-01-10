<template>
  <div class="card flex justify-center">
    <Button
      type="button"
      icon="pi pi-ellipsis-v"
      @click="toggle"
      aria-haspopup="true"
      aria-controls="overlay_menu"
      severity="secondary"
    />
    <Menu ref="menu" id="overlay_menu" :model="baseItems" :popup="true" />
  </div>
</template>
<script setup lang="ts">
import type { MenuItem } from 'primevue/menuitem'
import { useI18n } from 'vue-i18n'
import Menu from 'primevue/menu'
import Button from 'primevue/button'
import { ref } from 'vue'

export type PublicActionMenuCEmit = 'view' | 'add'
const { t } = useI18n()

const { id } = defineProps<{
  id: number
}>()
const menu = ref()
const emit = defineEmits<{
  (e: 'onClickAction', action: PublicActionMenuCEmit, id: number): void
}>()
const baseItems: MenuItem[] = [
  {
    label: t('global.detail'),
    icon: 'pi pi-eye',
    command: () => emit('onClickAction', 'view', id)
  },
  {
    label: t('global.addToCart'),
    icon: 'pi pi-pencil',
    command: () => emit('onClickAction', 'add', id)
  }
]
const toggle = (event: MouseEvent) => {
  menu.value.toggle(event)
}
</script>

<style scoped></style>
