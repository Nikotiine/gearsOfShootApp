<script setup lang="ts">
import { RouterView } from 'vue-router'
import Toast from 'primevue/toast'
import TopbarComponent from '@/components/__layout/TopbarComponent.vue'
import ConfirmDialog from 'primevue/confirmdialog'
import BreadcrumbView from '@/views/shared/BreadcrumbView.vue'
</script>

<template>
  <Toast position="bottom-right" />
  <TopbarComponent />
  <ConfirmDialog></ConfirmDialog>
  <div class="h-screen">
    <BreadcrumbView />
    <RouterView />
  </div>

  <!--  <FooterComponent class="" />-->
</template>

<style scoped></style>
