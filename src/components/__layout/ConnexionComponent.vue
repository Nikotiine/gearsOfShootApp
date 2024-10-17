<template>
  <SplitButton :model="choices" severity="secondary">
    <span class="flex items-center font-bold">
      <span class="pi pi-user"></span>
    </span>
  </SplitButton>
</template>
<script setup lang="ts">
import SplitButton from 'primevue/splitbutton'
import type { MenuItem } from 'primevue/menuitem'
import { ref } from 'vue'
import { useConnexionStore } from '@/stores/connexion'
import { useRegisterStore } from '@/stores/register'
const { toggleConnexionDialog } = useConnexionStore()
const { toggleRegisterDialog } = useRegisterStore()
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const choices: MenuItem = ref([
  {
    label: t('topbar.connexion'),
    icon: 'pi pi-list',
    subtext: 'Subtext of item',
    command: () => {
      toggleConnexionDialog()
    }
  },
  {
    label: t('topbar.register'),
    icon: 'pi pi-users',
    subtext: 'Subtext of item',
    command: () => {
      toggleRegisterDialog()
    }
  }
])
</script>
<style scoped></style>
