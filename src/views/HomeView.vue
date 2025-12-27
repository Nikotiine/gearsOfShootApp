<template>
  <main>
    <div class="">
      <h1 class="text-2xl text-center">Gears of shoot</h1>
      <p v-if="store.getUser">{{ store.getUser.value?.firstName }}</p>
    </div>
    <new-item-carousel />
  </main>
</template>
<script setup lang="ts">
import { useUserStore } from '@/stores/user.store'
import NewItemCarousel from '@/components/__dashboard/new-item-carousel.vue'

const store = useUserStore()
</script>
