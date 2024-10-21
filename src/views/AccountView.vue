<template>
  <h2 class="mt-2 mb-2 text-2xl text-center">Mon compte</h2>

  <Panel toggleable>
    <template #header>
      <div class="flex items-center gap-2">
        <span class="font-bold">Identite</span>
      </div>
    </template>
    <template #footer>
      <div class="flex flex-wrap items-center justify-between gap-4">
        <div class="flex items-center gap-2">
          <Button icon="pi pi-user-edit" rounded text v-tooltip="'Modifier mon compte'"></Button>
        </div>
        <span class="text-surface-500 dark:text-surface-400">Updated 2 hours ago</span>
      </div>
    </template>
    <template #icons>
      <Button icon="pi pi-cog" severity="secondary" rounded text />
    </template>
    <p class="m-0">Nom: {{ getUser?.lastName }} - {{ getUser?.firstName }}</p>
    <p class="m-0">
      Adresse: {{ getUser?.address }} - {{ getUser?.zipCode }} {{ getUser?.city }}
      {{ getUser?.state }}
    </p>
    <p class="m-0">Contact: {{ getUser?.email }} / {{ getUser?.phone }}</p>
  </Panel>
</template>
<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import Panel from 'primevue/panel'
import Button from 'primevue/button'
const { getUser } = useUserStore()
</script>

<style scoped></style>
