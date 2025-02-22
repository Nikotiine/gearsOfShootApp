<script setup lang="ts">
import { RouterView } from 'vue-router'
import Toast from 'primevue/toast'
import TopbarComponent from '@/components/__layout/TopbarComponent.vue'
import ConfirmDialog from 'primevue/confirmdialog'
import FooterComponent from '@/components/__layout/FooterComponent.vue'
</script>

<template>
  <Toast position="bottom-right" />
  <TopbarComponent />
  <ConfirmDialog></ConfirmDialog>
  <div class="h-screen"><RouterView /></div>

  <!--  <FooterComponent class="" />-->
</template>

<style scoped></style>
