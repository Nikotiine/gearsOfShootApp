<template>
  <div class="card">
    <div class="flex flex-col lg:flex-row">
      <div class="basis-full p-6">
        <RouterView />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>
<style scoped></style>
