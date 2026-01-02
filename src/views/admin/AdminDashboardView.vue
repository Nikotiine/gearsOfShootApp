<template>
  <h2 class="text-center text-xl lg:text-2xl mt-4 mb-2 font-bold">
    {{ t('admin.dashboard.title') }}
  </h2>
  <div class="space-y-8">
    <StatsWidgetComponent />
    <RouterWidgetComponent />
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import StatsWidgetComponent from '@/components/__admin/StatsWidgetComponent.vue'

import RouterWidgetComponent from '@/components/__admin/RouterWidgetComponent.vue'

const { t } = useI18n()
</script>

<style scoped></style>
