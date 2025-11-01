<template>
  <OverlayBadge :value="totalItemInInvoice">
    <Button :disabled="totalItemInInvoice < 1" @click="goToInvoice" icon="pi pi-cart-plus">
    </Button>
  </OverlayBadge>
</template>
<script setup lang="ts">
import Button from 'primevue/button'
import OverlayBadge from 'primevue/overlaybadge'

import { RouterEnum } from '@/enum/router.enum'
import { useInvoiceStore } from '@/stores/invoice.store'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const store = useInvoiceStore()
const { tempInvoice$ } = storeToRefs(store)

const totalItemInInvoice = computed(() => {
  return tempInvoice$.value?.items.length ?? 0
})

const goToInvoice = () => {
  if (totalItemInInvoice.value < 1) return
  router.push({ name: RouterEnum.INVOICE_NEW })
}
</script>

<style scoped></style>
