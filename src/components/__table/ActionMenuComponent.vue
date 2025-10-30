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
    <Menu ref="menu" id="overlay_menu" :model="items" :popup="true" />
  </div>
</template>
<script setup lang="ts">
import Button from 'primevue/button'
import Menu from 'primevue/menu'
import { computed, ref } from 'vue'
import type { MenuItem } from 'primevue/menuitem'
import { useConfirmationStore } from '@/stores/confirmation.store'
import { useI18n } from 'vue-i18n'
export type ActionMenuType =
  | 'optic'
  | 'magazine'
  | 'ammunition'
  | 'riffle'
  | 'handgun'
  | 'accessory'
  | 'factory'
  | 'rds'
  | 'collar'
export type ActionMenuEmit = 'view' | 'edit' | 'archive'
const { t } = useI18n()
const confirmationStore = useConfirmationStore()
const {
  type,
  reference,
  id,
  archiveOption = false
} = defineProps<{
  type: ActionMenuType
  reference: string
  id: number
  archiveOption?: boolean
}>()
const emit = defineEmits<{
  (e: 'onClickAction', action: ActionMenuEmit | boolean, id: number): void
}>()

const menu = ref()
const items = computed<MenuItem[]>(() => {
  const baseItems: MenuItem[] = [
    {
      label: t('global.detail'),
      icon: 'pi pi-eye',
      command: () => emit('onClickAction', 'view', id)
    },
    {
      label: t('global.edit'),
      icon: 'pi pi-pencil',
      command: () => emit('onClickAction', 'edit', id)
    },
    {
      label: t('global.delete'),
      icon: 'pi pi-trash',
      command: async () => {
        const confirmation = await confirmationStore.confirmDelete(type, reference)
        emit('onClickAction', confirmation, id)
      }
    }
  ]

  // ✅ On ajoute dynamiquement l’option Archive
  if (archiveOption) {
    baseItems.push({
      label: t('global.archive'),
      icon: 'pi pi-folder',
      command: () => emit('onClickAction', 'archive', id)
    })
  }

  return [
    {
      label: t('global.action'),
      items: baseItems
    }
  ]
})

const toggle = (event: MouseEvent) => {
  menu.value.toggle(event)
}
</script>

<style scoped></style>
