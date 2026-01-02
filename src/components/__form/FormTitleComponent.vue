<template>
  <h2 class="text-center mt-2 text-2xl text-blue-500">
    {{ t(i18nPrefix + status) }}
  </h2>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useFormStore } from '@/stores/form.store'
import type { FormStatus } from '@/types/form-status.type'
import { computed } from 'vue'

const formStore = useFormStore()
const formStatus: FormStatus = formStore.getFormStatus()
const { i18nPrefix = 'global.', customStatus = undefined } = defineProps<{
  i18nPrefix?: string
  customStatus?: FormStatus
}>()
const { t } = useI18n()
const status = computed(() => {
  return customStatus !== undefined ? customStatus : formStatus
})
</script>

<style scoped></style>
