<template>
  <h2 class="text-center mt-2 text-2xl text-blue-500">
    {{ t(i18nPrefix + 'list') }} {{ category ? category : '' }}
  </h2>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const { i18nPrefix, category } = defineProps<{
  i18nPrefix: string
  category?: string
}>()
</script>

<style scoped></style>
