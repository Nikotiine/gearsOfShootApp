<template>
  <form @submit.prevent="submit">
    <stock-movement-type-select
      :i18n-prefix="i18nPrefix"
      required
      @on-select="(value) => (form.movementType = value)"
    />

    <input-group-number
      :i18n-prefix="i18nPrefix"
      label="movementQuantity"
      placeholder="quantity"
      @value="(value) => (form.quantity = value)"
      input-id="quantity"
      :initial-value="form.quantity"
      add-on="pcs"
      required
      class="mt-2"
    />

    <Textarea
      v-model="form.reason"
      required
      rows="5"
      cols="39"
      class="mt-2"
      :placeholder="t('stock.reason')"
    />
    <div class="text-center mt-2">
      <Button type="submit" :label="t('global.save')" :disabled="!isFormValid"></Button>
    </div>
  </form>
</template>
<script setup lang="ts">
import { useStockStore } from '@/stores/stock.store'
import InputGroupNumber from '@/components/__form/InputGroupNumber.vue'
import StockMovementTypeSelect from '@/components/__form/__specific_select/StockMovementTypeSelect.vue'
import Textarea from 'primevue/textarea'
import { useI18n } from 'vue-i18n'

import { computed } from 'vue'
import Button from 'primevue/button'

const { t } = useI18n()
const store = useStockStore()
const { form, submit } = store.formBuilder()
const i18nPrefix = store.getI18NPrefix

const isFormValid = computed(() => {
  let isValid: boolean = false
  if (form.value.reason?.length > 3 && form.value.quantity > 0) isValid = true
  return isValid
})
</script>

<style scoped></style>
