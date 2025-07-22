<template>
  <h2 class="text-xl text-center text-blue-500 mt-2">{{ t(i18nPrefix + 'title') }}</h2>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 mt-2">
    <template v-for="[key, value] in numericFields" :key="key">
      <input-group-number
        :i18n-prefix="i18nPrefix"
        :placeholder="key"
        :label="key"
        :required="key === 'supplierPrice'"
        :input-id="key"
        :min-fraction-digits="2"
        :initial-value="value"
        @value="(val) => updateField(key, val)"
        add-on="euro"
      />
    </template>
  </div>
</template>
<script setup lang="ts">
import type { CreatePriceHistoryDto } from '@/api/Api'
import InputGroupNumber from '@/components/__form/InputGroupNumber.vue'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const i18nPrefix = 'priceHistory.'
const { priceHistoryForm } = defineProps<{
  priceHistoryForm: CreatePriceHistoryDto
}>()

const emit = defineEmits<{
  (e: 'update:priceHistoryForm', value: CreatePriceHistoryDto): void
}>()

// ✅ Extraire les champs numériques dynamiquement
const numericFields = computed(() =>
  Object.entries(priceHistoryForm)
    .filter(([key, value]) => typeof value === 'number' && key !== 'objectId' && key !== 'id')
    .sort(([keyA], [keyB]) => {
      if (keyA === 'supplierPrice') return -1
      if (keyB === 'supplierPrice') return 1
      return 0
    })
)

// ✅ Mise à jour sans muter directement les props
function updateField(key: string, value: number) {
  emit('update:priceHistoryForm', {
    ...priceHistoryForm,
    [key]: value
  })
}
</script>

<style scoped></style>
