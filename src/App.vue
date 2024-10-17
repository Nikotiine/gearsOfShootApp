<script setup lang="ts">
import { RouterView } from 'vue-router'
import Toast from 'primevue/toast'
import TopbarComponent from '@/components/__layout/TopbarComponent.vue'
import FooterComponent from '@/components/__layout/FooterComponent.vue'
</script>

<template>
  <Toast position="bottom-right" />
  <TopbarComponent />
  <div class="h-screen"><RouterView /></div>

  <FooterComponent />
</template>

<style scoped></style>
