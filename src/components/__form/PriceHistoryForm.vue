<template>
  <h2 class="text-xl text-center text-blue-500 mt-2">{{ t(i18nPrefix + 'title') }}</h2>
  <div class="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 mt-2">
    <template v-for="[key, value] in numericFields" :key="key">
      <input-group-number
        :i18n-prefix="i18nPrefix"
        :placeholder="key"
        :label="key"
        :required="key === 'supplierPrice' || key === 'precentOfDiscount'"
        :input-id="key"
        :min-fraction-digits="2"
        :initial-value="value"
        :disabled="key === 'precentOfDiscount' && !priceHistoryForm.isDiscounted"
        @value="(val) => updateField(key, val)"
        :add-on="key === 'precentOfDiscount' ? 'percent' : 'euro'"
      />
    </template>
    <supplier-select-input-select
      :initial-value="priceHistoryForm.supplier.id"
      required
      @on-select="(value) => updateField('supplier', value)"
    />
  </div>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 mt-2">
    <InputGroup>
      <input-group-check-box
        label="isDiscounted"
        input-id="isDiscounted"
        :i18n-prefix="i18nPrefix"
        :checked="priceHistoryForm.isDiscounted"
        size="medium"
        @checked="onCheck"
      />
      <input-group-number
        :i18n-prefix="i18nPrefix"
        placeholder="precentOfDiscount"
        label="precentOfDiscount"
        required
        input-id="precentOfDiscount"
        :initial-value="priceHistoryForm.precentOfDiscount"
        :disabled="!priceHistoryForm.isDiscounted"
        @value="(val) => onUpdatePercentOfDiscout(val)"
        add-on="percent"
      />
    </InputGroup>
    <InputGroup v-if="priceHistoryForm.isDiscounted">
      <input-group-number
        :i18n-prefix="i18nPrefix"
        placeholder="discountedPrice"
        label="discountedPrice"
        required
        input-id="discountedPrice"
        :min-fraction-digits="2"
        :initial-value="computedDiscountedPrice"
        readonly
        add-on="euro"
      />
    </InputGroup>
  </div>
</template>
<script setup lang="ts">
import type { CreatePriceHistoryDto } from '@/api/Api'
import InputGroupNumber from '@/components/__form/InputGroupNumber.vue'
import { computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import SupplierSelectInputSelect from '@/components/__form/__specific_select/SupplierSelectInputSelect.vue'
import InputGroupCheckBox from '@/components/__form/InputGroupCheckBox.vue'
import InputGroup from 'primevue/inputgroup'

const { t } = useI18n()
const i18nPrefix = 'priceHistory.'
const { priceHistoryForm } = defineProps<{
  priceHistoryForm: CreatePriceHistoryDto
}>()
const notDisplayedInputKeys = ['objectId', 'id', 'discountedPrice', 'precentOfDiscount']
const emit = defineEmits<{
  (e: 'update:priceHistoryForm', value: CreatePriceHistoryDto): void
}>()

// ✅ Extraire les champs numériques dynamiquement
const numericFields = computed(() =>
  Object.entries(priceHistoryForm)
    .filter(([key, value]) => typeof value === 'number' && !notDisplayedInputKeys.includes(key))
    .sort(([keyA], [keyB]) => {
      if (keyA === 'supplierPrice') return -1
      if (keyB === 'supplierPrice') return 1
      return 0
    })
)

function onUpdatePercentOfDiscout(value: number) {
  updateField('precentOfDiscount', value)
}

// ✅ Mise à jour sans muter directement les props
function updateField(key: string, value: number) {
  emit('update:priceHistoryForm', {
    ...priceHistoryForm,
    [key]: value
  })
}
function onCheck(value: boolean) {
  emit('update:priceHistoryForm', {
    ...priceHistoryForm,
    isDiscounted: value,
    precentOfDiscount: value ? priceHistoryForm.precentOfDiscount : 0,
    discountedPrice: value ? computedDiscountedPrice.value : 0
  })
}
const computedDiscountedPrice = computed(() => {
  const { currentSalePrice, precentOfDiscount, isDiscounted } = priceHistoryForm

  if (!isDiscounted || !currentSalePrice) {
    return currentSalePrice
  }

  if (!precentOfDiscount) {
    return currentSalePrice
  }

  return Number((currentSalePrice - (currentSalePrice * precentOfDiscount) / 100).toFixed(2))
})

watch(
  () => computedDiscountedPrice.value,
  (value) => {
    emit('update:priceHistoryForm', {
      ...priceHistoryForm,
      discountedPrice: value
    })
  },
  { immediate: true }
)
</script>

<style scoped></style>
