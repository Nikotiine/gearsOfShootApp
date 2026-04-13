<template>
  <h2>Ajouter une nouvelle adresse de lavraison</h2>
</template>
<script setup lang="ts">
import { useAddressStore } from '@/stores/address.store'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const store = useAddressStore()
</script>

<style scoped></style>
