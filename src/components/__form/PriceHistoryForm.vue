<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
    <InputGroup v-for="[key, value] in numericFields" :key="key">
      <input-group-optional-icon :is-completed="value > 0" />
      <input-group-number
        :i18n-prefix="'priceHistory.'"
        :placeholder="key"
        :label="key"
        :input-id="key"
        :initial-value="value"
        @value="(val) => updateField(key, val)"
      />
    </InputGroup>
  </div>
</template>
<script setup lang="ts">
import type { CreatePriceHistoryDto } from '@/api/Api'
import InputGroupOptionalIcon from '@/components/__form/InputGroupOptionalIcon.vue'
import InputGroup from 'primevue/inputgroup'
import InputGroupNumber from '@/components/__form/InputGroupNumber.vue'
import { computed } from 'vue'

const { priceHistoryForm } = defineProps<{
  priceHistoryForm: CreatePriceHistoryDto
}>()

const emit = defineEmits<{
  (e: 'update:priceHistoryForm', value: CreatePriceHistoryDto): void
}>()

// ✅ Extraire les champs numériques dynamiquement
const numericFields = computed(() =>
  Object.entries(priceHistoryForm).filter(
    ([key, value]) => typeof value === 'number' && key !== 'objectId'
  )
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
