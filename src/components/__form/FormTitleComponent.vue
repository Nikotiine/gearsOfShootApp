<template>
  <h2 class="text-center mt-2 text-2xl text-blue-500">
    {{ t(i18nPrefix + formStatus) }}
  </h2>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useFormStore } from '@/stores/form.store'
import type { FormStatus } from '@/types/form-status.type'
const formStore = useFormStore()
const formStatus: FormStatus = formStore.getFormStatus()

const { t } = useI18n()
const i18nPrefix = formStore.getI18nPrefix()
</script>

<style scoped></style>
