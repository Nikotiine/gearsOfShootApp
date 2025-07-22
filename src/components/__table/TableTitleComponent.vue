<template>
  <h2 class="text-center mt-2 text-2xl text-blue-500">{{ t(i18nPrefix + 'list') }}</h2>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const { i18nPrefix } = defineProps<{
  i18nPrefix: string
}>()
</script>

<style scoped></style>
