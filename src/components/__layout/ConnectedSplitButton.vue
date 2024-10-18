<template>
  <SplitButton :model="items" severity="secondary">
    <span class="flex items-center font-bold">
      <span class="pi pi-user"></span>
    </span>
  </SplitButton>
</template>
<script setup lang="ts">
import SplitButton from 'primevue/splitbutton'
import type { MenuItem } from 'primevue/menuitem'
import { useI18n } from 'vue-i18n'
import { ref } from 'vue'
import { useSecurityStore } from '@/stores/security'
const { t, locale } = useI18n()
const { logout } = useSecurityStore()
const items: MenuItem = ref([
  {
    label: t('connexion.myAccount'),
    icon: 'pi pi-address-book',
    subtext: 'Subtext of item'
  },
  {
    label: t('connexion.myInvoices'),
    icon: 'pi pi-shopping-cart',
    subtext: 'Subtext of item'
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
  },
  {
    separator: true
  },
  {
    label: t('connexion.logout'),
    icon: 'pi pi-unlock',
    command: () => {
      logout()
    }
  }
])
</script>

<style scoped></style>
