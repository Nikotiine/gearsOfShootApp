<template>
  <div class="bg-surface-100 p-1" style="border-radius: 30px" v-tooltip.bottom="tooltipText">
    <div
      class="bg-surface-0 flex items-center gap-2 justify-center py-1 px-2"
      style="
        border-radius: 30px;
        box-shadow:
          0px 1px 2px 0px rgba(0, 0, 0, 0.04),
          0px 1px 2px 0px rgba(0, 0, 0, 0.06);
      "
    >
      <i class="pi pi-verified text-blue-500"></i>
      <span class="font-medium text-sm text-red-500"
        >{{ category ? t('global.category') : t('global.noCategory') }}:</span
      >
      <span class="font-medium text-sm text-red-500">{{ category }}</span>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'

const { category = null } = defineProps<{
  category: 'B' | 'C' | 'D' | null
}>()
const { t } = useI18n()
const tooltipText = computed(() => {
  switch (category) {
    case 'B':
      return t('tooltip.isCatBItem')
    case 'D':
      return t('tooltip.isCatDItem')
    case 'C':
      return t('tooltip.isCatCItem')
    default:
      return t('tooltip.isNoCategory')
  }
})
</script>

<style scoped></style>
