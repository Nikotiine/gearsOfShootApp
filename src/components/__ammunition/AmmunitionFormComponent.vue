<template>
  <div class="card">
    <h2 class="text-center mt-2 text-2xl text-blue-500">
      {{ t(i18nPrefix + formStatus) }}
    </h2>
    <form @submit.prevent="submit">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 p-4">
        <legalisation-category-input-select
          :initial-value="form.category.id"
          required
          @on-select="(event) => (form.category = event)"
        />

        <caliber-input-select
          :initial-value="form.caliber.id"
          can-add-new
          required
          @on-select="(event) => (form.caliber = event)"
        />

        <factory-input-select
          :initial-value="form.factory.id"
          can-add-new
          required
          factory-type="ammunition"
          @on-select="(event) => (form.factory = event)"
        />

        <percussion-type-input-select
          required
          :initial-value="form.percussionType.id"
          @on-select="(event) => (form.percussionType = event)"
        />
        <InputGroup>
          <input-group-required-icon :is-validate="form.name.length >= 2" />
          <input-group-text
            @value="(value) => (form.name = value)"
            :min-length="2"
            :i18n-prefix="i18nPrefix"
            placeholder="name"
            label="name"
            required
            input-id="name"
            :initial-value="form.name"
          />
        </InputGroup>

        <input-group-number
          :i18n-prefix="i18nPrefix"
          label="initialSpeed"
          placeholder="initialSpeed"
          @value="(value) => (form.initialSpeed = value)"
          input-id="initialSpeed"
          :initial-value="form.initialSpeed"
          add-on="m/s"
        />

        <head-type-input-select
          @on-select="(event) => (form.headType = event)"
          :initial-value="form.headType.id"
          can-add-new
          required
        />
        <body-type-input-select
          :initial-value="form.bodyType.id"
          can-add-new
          required
          @on-select="(event) => (form.bodyType = event)"
        />

        <input-group-number
          :i18n-prefix="i18nPrefix"
          placeholder="packaging"
          label="packaging"
          @value="(value) => (form.packaging = value)"
          input-id="packaging"
          :initial-value="form.packaging"
          add-on="pcs"
        />
      </div>

      <div class="p-4">
        <Textarea
          v-model="form.description"
          autoResize
          rows="5"
          cols="30"
          class="w-full"
          :placeholder="t('global.description')"
        />
      </div>

      <price-history-form
        :price-history-form="form.priceHistory"
        @update:price-history-form="(value) => (form.priceHistory = value)"
      />

      <div class="text-center">
        <save-button :status="formStatus" :disabled="!isFormValid" />
      </div>
    </form>
  </div>
</template>
<script setup lang="ts">
import Textarea from 'primevue/textarea'
import InputGroup from 'primevue/inputgroup'
import { useAmmunitionStore } from '@/stores/ammunition.store'
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'

import InputGroupText from '@/components/__form/InputGroupText.vue'

import InputGroupNumber from '@/components/__form/InputGroupNumber.vue'

import type { FormStatus } from '@/types/form-status.type'
import SaveButton from '@/components/__form/SaveButton.vue'
import CaliberInputSelect from '@/components/__form/__specific_select/CaliberInputSelect.vue'
import FactoryInputSelect from '@/components/__form/__specific_select/FactoryInputSelect.vue'
import LegalisationCategoryInputSelect from '@/components/__form/__specific_select/LegalisationCategoryInputSelect.vue'
import PercussionTypeInputSelect from '@/components/__form/__specific_select/PercussionTypeInputSelect.vue'
import HeadTypeInputSelect from '@/components/__form/__specific_select/HeadTypeInputSelect.vue'
import BodyTypeInputSelect from '@/components/__form/__specific_select/BodyTypeInputSelect.vue'
import InputGroupRequiredIcon from '@/components/__form/InputGroupRequiredIcon.vue'
import PriceHistoryForm from '@/components/__form/PriceHistoryForm.vue'

const { id } = defineProps<{
  id?: string
  formStatus: FormStatus
}>()

const { t } = useI18n()
const store = useAmmunitionStore()
const i18nPrefix = store.getI18NPrefix
const { form, submit } = store.formBuilder(id)

const isFormValid = computed(() => {
  let isValid: boolean = false
  if (
    form.value.name &&
    form.value.factory.id > 0 &&
    form.value.caliber.id > 0 &&
    form.value.headType.id > 0 &&
    form.value.bodyType.id > 0 &&
    form.value.priceHistory.supplierPrice > 0
  ) {
    isValid = true
  }
  return isValid
})
</script>

<style scoped></style>
