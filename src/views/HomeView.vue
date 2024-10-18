<script setup lang="ts">
import { useUserStore } from '@/stores/user'

const { user } = useUserStore()
</script>

<template>
  <main>
    <div class="">
      <h1 class="text-2xl text-center">Gears of shoot</h1>
      <p v-if="user">{{ user.firstName }}</p>
    </div>
  </main>
</template>
