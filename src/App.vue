<script setup lang="ts">
import { RouterView } from 'vue-router'

import TopbarComponent from '@/components/__layout/TopbarComponent.vue'
import FooterComponent from '@/components/__layout/FooterComponent.vue'
</script>

<template>
  <TopbarComponent />
  <div class="h-screen"><RouterView /></div>

  <FooterComponent />
</template>

<style scoped></style>
