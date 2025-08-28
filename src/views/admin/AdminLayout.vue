<template>
  <div class="card">
    <div class="flex flex-col lg:flex-row">
      <div class="basis-full ml-6 lg:basis-1/4 mt-20 lg:mt-20">
        <DashboardSidePanel />
      </div>
      <div class="basis-full lg:basis-3/4">
        <BreadcrumbView />
        <RouterView />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { RouterView } from 'vue-router'

import DashboardSidePanel from '@/components/__admin/DashboardSidePanel.vue'

import BreadcrumbView from '@/views/shared/BreadcrumbView.vue'
</script>
<style scoped></style>
