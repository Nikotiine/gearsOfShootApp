<template>
  <Dialog
    v-model:visible="visible"
    modal
    maximizable
    :header="t('priceHistory.priceHistoryModalHeader')"
    :style="{ width: '50rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
  >
    <span class="text-surface-500 dark:text-surface-400 block mb-8">Update your information.</span>
    <div class="flex items-center gap-4 mb-4">
      <label for="username" class="font-semibold w-24">Username</label>
    </div>
    <div class="flex items-center gap-4 mb-8">
      <label for="email" class="font-semibold w-24">Email</label>
    </div>
  </Dialog>
</template>
<script setup lang="ts">
import Dialog from 'primevue/dialog'

import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
export interface PriceHistoryModalExposed {
  show: () => void
  hide: () => void
}
const visible = ref<boolean>(false)
function show() {
  visible.value = true
}

function hide() {
  visible.value = false
}
defineExpose({ show, hide })
</script>

<style scoped></style>
