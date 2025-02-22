<template>
  <SplitButton :model="items" severity="secondary">
    <span class="flex items-center font-bold">
      <span class="pi pi-lock"></span>
    </span>
  </SplitButton>
</template>
<script setup lang="ts">
import SplitButton from 'primevue/splitbutton'
import type { MenuItem } from 'primevue/menuitem'
import { ref } from 'vue'
import { useConnexionStore } from '@/stores/connexion'
import { useRegisterStore } from '@/stores/register'
const connexionStore = useConnexionStore()
const registerStore = useRegisterStore()
import { useI18n } from 'vue-i18n'
const { t, locale } = useI18n()
const items: MenuItem = ref([
  {
    label: t('topbar.connexion'),
    icon: 'pi pi-sign-in',
    subtext: 'Subtext of item',
    command: () => {
      connexionStore.toggleConnexionDialog()
    }
  },
  {
    label: t('topbar.register'),
    icon: 'pi pi-user-plus',
    subtext: 'Subtext of item',
    command: () => {
      registerStore.toggleRegisterDialog()
    }
  },
  {
    separator: true
  },
  {
    label: t('global.french'),
    key: 'fr',
    icon: 'pi pi-flag-fill',
    command: () => {
      locale.value = 'fr'
    }
  },
  {
    label: t('global.english'),
    key: 'en',
    icon: 'pi pi-flag',
    command: () => {
      locale.value = 'en'
    }
  }
])
</script>
<style scoped></style>
