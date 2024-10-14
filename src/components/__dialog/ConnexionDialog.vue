<script setup lang="ts">
import { useConnexionStore } from '@/stores/connexion'
import InputText from 'primevue/inputtext'

import Dialog from 'primevue/dialog'

import Button from 'primevue/button'
import { useI18n } from 'vue-i18n'

const { isVisible, toggleConnexionDialog } = useConnexionStore()
//const {t} = useI18n()
</script>

<template>
  <div class="card flex justify-center">
    <Dialog v-model:visible="isVisible" modal header="Edit Profile" :style="{ width: '25rem' }">
      <span class="text-surface-500 dark:text-surface-400 block mb-8"
        >Update your information.</span
      >
      <div class="flex items-center gap-4 mb-4">
        <label for="email" class="font-semibold w-24">Username</label>
        <InputText id="email" class="flex-auto" autocomplete="off" />
      </div>
      <div class="flex items-center gap-4 mb-8">
        <label for="password" class="font-semibold w-24">Email</label>
        <InputText id="password" class="flex-auto" autocomplete="off" />
      </div>
      <div class="flex justify-end gap-2">
        <Button
          type="button"
          label="Cancel"
          severity="secondary"
          @click="toggleConnexionDialog"
        ></Button>
        <Button type="button" label="Save" @click="toggleConnexionDialog"></Button>
      </div>
    </Dialog>
  </div>
</template>

<style scoped></style>
