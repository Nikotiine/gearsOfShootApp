<template>
  <SplitButton :model="languages" severity="secondary">
    <span class="flex items-center font-bold">
      <span>{{ t('language.label') }}</span>
    </span>
  </SplitButton>
</template>

<script setup lang="ts">
import SplitButton from 'primevue/splitbutton'
import { ref } from 'vue'
import type { MenuItem } from 'primevue/menuitem'
import { useI18n } from 'vue-i18n'
const { t, locale } = useI18n()
const languages: MenuItem = ref([
  {
    label: 'Fr',
    key: 'fr',
    command: () => {
      locale.value = 'fr'
    }
  },
  {
    label: 'En',
    key: 'en',
    command: () => {
      locale.value = 'en'
    }
  }
])
</script>

<style scoped></style>
