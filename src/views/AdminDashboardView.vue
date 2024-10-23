<template>
  <div class="card">
    <h2 class="text-center text-2xl mt-4 mb-2 font-bold">Dashboard Adminstration</h2>
    <div class="flex flex-row">
      <div class="basis-1/4 mt-20">
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
import Badge from 'primevue/badge'
import PanelMenu from 'primevue/panelmenu'
import { RouterView, useRouter } from 'vue-router'
import type { LegislationCategories } from '@/stores/weapon'
const categoryD: LegislationCategories = 'D'
const categoryC: LegislationCategories = 'C'
const categoryB: LegislationCategories = 'B'

const { push } = useRouter()

const items = ref([
  {
    label: 'Categorie ' + categoryC,
    icon: 'pi pi-envelope',
    badge: 5,
    items: [
      {
        label: 'Liste des references d arme existantes',
        icon: 'pi pi-list',
        command: () => {
          push('/admin/gestion/list/weapon/' + categoryC)
        }
      },
      {
        label: 'Ajouter une reference d arme',
        icon: 'pi pi-plus',
        command: () => {
          push('/admin/gestion/add/weapon/' + categoryC)
        }
      },
      {
        label: 'Liste des references de munitions existantes',
        icon: 'pi pi-list'
      },
      {
        label: 'Ajouter une reference de munitions',
        icon: 'pi pi-plus',
        command: () => {
          push('/admin/gestion/add/ammuntion/' + categoryC)
        }
      },
      {
        label: 'Liste des references des accessoire existantes',
        icon: 'pi pi-list'
      },
      {
        label: 'Ajouter une reference d accessoire',
        icon: 'pi pi-plus'
      },
      {
        label: 'Gestion des stocks',
        icon: 'pi pi-warehouse'
      }
    ]
  },
  {
    label: 'Categorie ' + categoryB,
    icon: 'pi pi-chart-bar',
    items: [
      {
        label: 'Liste des references d arme existantes',
        icon: 'pi pi-list',
        command: () => {
          push('/admin/gestion/list/weapon/' + categoryB)
        }
      },
      {
        label: 'Ajouter une reference d arme',
        icon: 'pi pi-chart-line',
        badge: 3,
        command: () => {
          push('/admin/gestion/add/weapon/' + categoryB)
        }
      },
      {
        label: 'Ajouter une reference de munitions',
        icon: 'pi pi-list',
        command: () => {
          push('/admin/gestion/add/ammuntion/' + categoryC)
        }
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
  },
  {
    label: 'Global',
    icon: 'pi pi-globe',
    items: [
      {
        label: 'Marque',
        icon: 'pi pi-cog',
        shortcut: '⌘+O'
      },
      {
        label: 'Calibre',
        icon: 'pi pi-circle',
        shortcut: '⌘+P'
      },
      {
        label: 'Type d arme',
        icon: 'pi pi-sort',
        shortcut: '⌘+P'
      }
    ]
  }
])
</script>
<style scoped></style>
