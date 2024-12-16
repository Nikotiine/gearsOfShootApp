<template>
  <InputGroupAddon>
    <Button
      :icon="icon"
      severity="secondary"
      v-tooltip="t('tooltip.' + type)"
      @click="openDrawer(type)"
    />
  </InputGroupAddon>
</template>

<script setup lang="ts">
import InputGroupAddon from 'primevue/inputgroupaddon'
import Button from 'primevue/button'

import { useI18n } from 'vue-i18n'
import type { DrawerType } from '@/types/form-type'
const { t } = useI18n()
const icon: string = 'pi pi-plus text-blue-700'
const { type, openDrawer } = defineProps<{
  type: DrawerType
  openDrawer: Function
}>()
</script>

<style scoped></style>
