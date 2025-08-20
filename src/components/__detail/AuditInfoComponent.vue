<template>
  <div class="border border-orange-500 ml-3">
    <p class="p-2">
      <span class="underline font-semibold">{{ t('auditInfo.createdAt') }}</span>
      {{ DateFormatter(createdAt, 'medium') }} {{ t('auditInfo.from') }}
      {{ createdBy ? createdBy.lastName : t('global.missingData') }} -
      {{ createdBy ? createdBy.firstName : t('global.missingData') }}
    </p>
    <p class="mt-2 p-2">
      <span class="underline font-semibold">{{ t('auditInfo.updatedAt') }}</span>
      {{ DateFormatter(updateAt, 'medium') }} {{ t('auditInfo.from') }}
      {{ updatedBy ? updatedBy.lastName : t('global.missingData') }} -
      {{ updatedBy ? updatedBy.firstName : t('global.missingData') }}
    </p>
  </div>
</template>

<script setup lang="ts">
import type { UserDto } from '@/api/Api'
import { DateFormatter } from '@/shared/utils/formatter.utils'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const { createdBy, updatedBy, createdAt, updateAt } = defineProps<{
  createdBy?: UserDto
  updatedBy?: UserDto
  createdAt: string
  updateAt: string
}>()
</script>

<style scoped></style>
