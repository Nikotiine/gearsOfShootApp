<template>
  <h2 class="text-xl text-center text-blue-500 mt-2">{{ t(i18nPrefix + 'summary') }}</h2>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 p-4" v-if="formStatus === 'save'">
    <input-group-number
      :i18n-prefix="i18nPrefix"
      placeholder="stock"
      label="stock"
      @value="(value) => updateInitialStock(value)"
      input-id="stock"
      :initial-value="inStock"
      add-on="pcs"
    />
  </div>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 p-4" v-else>
    <p>
      {{ t('stock.quantity') }}
      <span :class="textColor(inStock)">{{ NumberFormatter(inStock, 'pcs') }}</span>
    </p>
    <p>
      {{ t('stock.onOrder') }}
      <span>On mettra en commande pour la gestion du stock</span>
    </p>
    <Button
      type="button"
      :label="t('stock.edit')"
      class="mx-auto p-0"
      text
      severity="danger"
    ></Button>
  </div>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { NumberFormatter } from '@/shared/utils/formatter.utils'
import InputGroupNumber from '@/components/__form/InputGroupNumber.vue'
import type { FormStatus } from '@/types/form-status.type'
import Button from 'primevue/button'

const { t } = useI18n()

const emit = defineEmits(['initialStock'])
const i18nPrefix = 'stock.'
const { formStatus, inStock } = defineProps<{
  inStock: number
  formStatus: FormStatus
}>()
function updateInitialStock(value: number) {
  emit('initialStock', value)
}

function textColor(quantity: number): string {
  if (quantity > 20) {
    return 'text-blue-500'
  } else if (quantity > 10 && quantity < 21) {
    return 'text-green-600'
  } else if (quantity > 2 && quantity < 11) {
    return 'text-orange-600'
  } else {
    return 'text-red-500'
  }
}
</script>

<style scoped></style>
