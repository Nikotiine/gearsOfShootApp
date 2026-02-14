<template>
  <OverlayBadge :value="totalItemInOrder">
    <Button :disabled="totalItemInOrder < 1" @click="goToCart" icon="pi pi-cart-plus"> </Button>
  </OverlayBadge>
</template>

<script setup lang="ts">
import Button from 'primevue/button'
import OverlayBadge from 'primevue/overlaybadge'
import { useCartStore } from '@/stores/shared/cart.store'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { PublicRouterEnum } from '@/enum/router/public-router.enum'

const store = useCartStore()
const router = useRouter()
const { cart$ } = storeToRefs(store)
const totalItemInOrder = computed(() => {
  return cart$.value?.items.length ?? 0
})
const goToCart = () => {
  if (totalItemInOrder.value < 1) return
  router.push({ name: PublicRouterEnum.CART })
}
</script>

<style scoped></style>
