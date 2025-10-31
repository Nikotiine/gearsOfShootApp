<template>
  <div class="card">
    <div class="flex flex-col lg:flex-row">
      <div class="basis-full p-6">
        <AdminNavbar v-if="$route.meta.navbar" />

        <BreadcrumbView :home="homeBreadcrumb" />
        <RouterView />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { RouterView } from 'vue-router'

import BreadcrumbView from '@/views/shared/BreadcrumbView.vue'
import type { BreadCrumbState } from '@/stores/breadcrumb.store'
import AdminNavbar from '@/components/__admin/AdminNavbar.vue'

const homeBreadcrumb: BreadCrumbState = {
  path: '/admin',
  icon: 'pi pi-home',
  label: 'Dashboard',
  index: 0
}
</script>
<style scoped></style>
