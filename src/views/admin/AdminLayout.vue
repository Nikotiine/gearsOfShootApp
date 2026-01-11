<template>
  <div class="card">
    <div class="flex flex-col lg:flex-row">
      <div class="basis-full p-6">
        <AdminNavbar v-if="$route.meta.navbar" />

        <RouterView />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { RouterView } from 'vue-router'
import AdminNavbar from '@/components/__admin/AdminNavbar.vue'
</script>
<style scoped></style>
