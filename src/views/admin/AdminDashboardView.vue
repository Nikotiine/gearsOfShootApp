<template>
  <h2 class="text-center text-xl lg:text-2xl mt-4 mb-2 font-bold">
    {{ t('admin.dashboard.title') }}
  </h2>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<style scoped></style>
