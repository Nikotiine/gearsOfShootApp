<template>
  <h2 class="text-center mt-2 text-2xl">
    {{ t('opticCollar.' + formStatus) }}
  </h2>
  <form @submit.prevent="submit">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      <InputGroup>
        <input-group-required-icon :is-validate="form.name.length >= 3" />
        <input-group-text
          @value="(value) => (form.name = value)"
          :min-length="3"
          placeholder="name"
          label="name"
          required
          input-id="name"
          :initial-value="form.name"
        />
      </InputGroup>

      <factory-input-select
        :initial-value="form.factory.id"
        can-add-new
        required
        factory-type="accessory"
        @on-select="(event) => (form.factory = event)"
      />

      <optic-rail-input-select
        required
        @on-select="(event) => (form.railSize = event)"
        :initial-value="form.railSize?.id"
      />

      <input-group-number
        label="height"
        @value="(value) => (form.height = value)"
        input-id="height"
        :initial-value="form.height"
        add-on="mm"
      />

      <input-group-number
        label="diameter"
        @value="(value) => (form.diameter = value)"
        input-id="diameter"
        :initial-value="form.diameter"
        add-on="mm"
      />
    </div>
    <div class="px-4">
      <Textarea
        v-model="form.description"
        autoResize
        rows="5"
        cols="30"
        class="w-full"
        placeholder="Description"
      />
    </div>
    <price-history-form
      :price-history-form="form.priceHistory"
      @update:price-history-form="(value) => (form.priceHistory = value)"
    />
    <save-button :status="formStatus" :disabled="!isFormValid" />
  </form>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import InputGroupRequiredIcon from '@/components/__form/InputGroupRequiredIcon.vue'
import InputGroup from 'primevue/inputgroup'
import Textarea from 'primevue/textarea'
import InputGroupText from '@/components/__form/InputGroupText.vue'
import InputGroupNumber from '@/components/__form/InputGroupNumber.vue'
import { useOpticCollarStore } from '@/stores/optic-collar.store'
import SaveButton from '@/components/__form/SaveButton.vue'
import type { FormStatus } from '@/types/form-status.type'
import FactoryInputSelect from '@/components/__form/__specific_select/FactoryInputSelect.vue'
import OpticRailInputSelect from '@/components/__form/__specific_select/OpticRailInputSelect.vue'
import PriceHistoryForm from '@/components/__form/PriceHistoryForm.vue'
import { useFormStore } from '@/stores/form.store'
const { id } = defineProps<{
  id?: string
}>()
const { t } = useI18n()
const store = useOpticCollarStore()

const formStore = useFormStore()
const formStatus: FormStatus = formStore.getFormStatus()

const { form, submit } = store.formBuilder(id)

const isFormValid = computed(() => {
  let isValid: boolean = false
  if (
    form.value.name &&
    form.value.factory.id > 0 &&
    form.value.railSize.id > 0 &&
    form.value.height > 0 &&
    form.value.diameter > 0
  ) {
    isValid = true
  }
  return isValid
})
</script>

<style scoped></style>
