<template>
  <h1>ici</h1>
</template>
<script setup lang="ts">
import { useCartStore } from '@/stores/shared/cart.store'

const store = useCartStore()
const i18nPrefix = store.getI18NPrefix
const { id } = defineProps<{
  id?: string
}>()
</script>

<style scoped></style>
