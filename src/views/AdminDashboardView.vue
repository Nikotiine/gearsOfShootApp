<template>
  <div class="card">
    <h2 class="text-center text-2xl mt-2 mb-2">admin</h2>
    <div class="flex flex-row">
      <div class="basis-1/4">
        <PanelMenu :model="items">
          <template #item="{ item }">
            <a class="flex items-center px-4 py-2 cursor-pointer group">
              <span :class="[item.icon, 'text-primary group-hover:text-inherit']" />
              <span :class="['ml-2', { 'font-semibold': item.items }]">{{ item.label }}</span>
              <Badge v-if="item.badge" class="ml-auto" :value="item.badge" />
              <span
                v-if="item.shortcut"
                class="ml-auto border border-surface rounded bg-emphasis text-muted-color text-xs p-1"
                >{{ item.shortcut }}</span
              >
            </a>
          </template>
        </PanelMenu>
      </div>
      <div class="basis-3/4"><RouterView /></div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

import PanelMenu from 'primevue/panelmenu'
import { RouterView, useRouter } from 'vue-router'

const { push } = useRouter()

const items = ref([
  {
    label: 'Categorie C',
    icon: 'pi pi-envelope',
    badge: 5,
    items: [
      {
        label: 'Ajouter une reference d arme',
        icon: 'pi pi-file-edit',
        shortcut: '⌘+N',
        command: () => {
          push('/admin/gestion/categprie-c')
        }
      },
      {
        label: 'Ajouter une reference de munitions',
        icon: 'pi pi-inbox',
        badge: 5
      },
      {
        label: 'Ajouter une reference d accessoire',
        icon: 'pi pi-send',
        shortcut: '⌘+S'
      },
      {
        label: 'Gestion des stocks',
        icon: 'pi pi-trash',
        shortcut: '⌘+T'
      }
    ]
  },
  {
    label: 'Categorie B',
    icon: 'pi pi-chart-bar',
    items: [
      {
        label: 'Ajouter une reference d arme',
        icon: 'pi pi-chart-line',
        badge: 3
      },
      {
        label: 'Ajouter une reference de munitions',
        icon: 'pi pi-list',
        badge: 6
      },
      {
        label: 'Ajouter une reference d accessoire',
        icon: 'pi pi-list',
        badge: 6
      }
    ]
  },
  {
    label: 'Vente libre',
    icon: 'pi pi-user',
    items: [
      {
        label: 'Settings',
        icon: 'pi pi-cog',
        shortcut: '⌘+O'
      },
      {
        label: 'Privacy',
        icon: 'pi pi-shield',
        shortcut: '⌘+P'
      }
    ]
  }
])
</script>
<style scoped></style>
