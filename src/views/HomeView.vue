<template>
  <main>
    <div class="">
      <h1 class="text-2xl text-center mt-2">{{ t('app.title') }}</h1>
    </div>
    <new-item-carousel />
    <discount-item-carousel />
  </main>
</template>
<script setup lang="ts">
import NewItemCarousel from '@/components/__dashboard/NewItemCarousel.vue'
import { useI18n } from 'vue-i18n'
import DiscountItemCarousel from '@/components/__dashboard/DiscountItemCarousel.vue'

const { t } = useI18n()
</script>
