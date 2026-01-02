<template>
  <div class="text-center mt-2">
    <Button type="submit" :label="t('global.' + status)" :disabled="disabled"></Button>
  </div>
</template>
<script setup lang="ts">
import Button from 'primevue/button'
import { useI18n } from 'vue-i18n'
import type { FormStatus } from '@/types/form-status.type'
import { useFormStore } from '@/stores/form.store'

const { t } = useI18n()
const formStore = useFormStore()
const status: FormStatus = formStore.getFormStatus()
const { disabled = false } = defineProps<{
  disabled?: boolean
}>()
</script>

<style scoped></style>
