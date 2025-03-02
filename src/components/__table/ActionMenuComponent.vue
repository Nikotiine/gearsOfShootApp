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
import { ref } from 'vue'
import type { MenuItem } from 'primevue/menuitem'
import { useConfirmationStore } from '@/stores/confirmation'
export type ActionMenuType = 'optic' | 'magazine'
export type ActionMenuEmit = 'view' | 'edit'
const confirmationStore = useConfirmationStore()
const { type, reference, id } = defineProps<{
  type: ActionMenuType
  reference: string
  id: number
}>()
const emit = defineEmits<{
  (e: 'onClickAction', action: ActionMenuEmit | boolean, id: number): void
}>()

const menu = ref()
const items = ref<MenuItem[]>([
  {
    label: 'Action',
    items: [
      {
        label: 'View',
        icon: 'pi pi-refresh',
        command: () => {
          emit('onClickAction', 'view', id)
        }
      },
      {
        label: 'Edit',
        icon: 'pi pi-upload',
        command: () => {
          emit('onClickAction', 'edit', id)
        }
      },
      {
        label: 'Delete',
        icon: 'pi pi-upload',
        command: async () => {
          const confirmation = await confirmationStore.confirmDelete(type, reference)
          emit('onClickAction', confirmation, id)
        }
      }
    ]
  }
])

const toggle = (event: MouseEvent) => {
  menu.value.toggle(event)
}
</script>

<style scoped></style>
