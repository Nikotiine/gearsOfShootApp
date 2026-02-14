<template>
  <div class="text-center mt-2">
    <Button
      type="submit"
      :label="t('global.' + status)"
      :disabled="disabled"
      v-tooltip.bottom="status === 'next' ? t('global.pleaseConnect') : ''"
    ></Button>
  </div>
</template>
<script setup lang="ts">
import Button from 'primevue/button'
import { useI18n } from 'vue-i18n'
import type { FormStatus } from '@/types/form-status.type'

const { t } = useI18n()

const { disabled = false, status } = defineProps<{
  disabled?: boolean
  status: FormStatus
}>()
</script>

<style scoped></style>
