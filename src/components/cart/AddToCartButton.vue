<template>
  <Button
    icon="pi pi-shopping-cart"
    :label="t(prefix + 'addToCart')"
    :disabled="item.stock === 0"
    @click="onAddToCart(item)"
    class="flex-auto md:flex-initial whitespace-nowrap z-10"
  ></Button>
</template>
<script setup lang="ts">
import Button from 'primevue/button'
import type { RoutableObjectType } from '@/types/routable.type'
import type { DataViewProps } from '@/views/shared/DataViewWrapperView.vue'
import { useI18n } from 'vue-i18n'
import { useCartStore } from '@/stores/shared/cart.store'
const prefix = 'dataView.'
const store = useCartStore()
const { t } = useI18n()
const { item } = defineProps<{ item: DataViewProps }>()
const onAddToCart = (item: DataViewProps) => {
  console.log(item)
  store.addToCart(item)
}
</script>

<style scoped></style>
