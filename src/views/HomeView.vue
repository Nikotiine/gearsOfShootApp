<script setup lang="ts">
import { useUserStore } from '@/stores/user'

const store = useUserStore()
</script>

<template>
  <main>
    <div class="">
      <h1 class="text-2xl text-center">Gears of shoot</h1>
      <p v-if="store.getUser">{{ store.getUser.value?.firstName }}</p>
    </div>
  </main>
</template>
