<template>
  <form-title-component :i18n-prefix="i18nPrefix" :customStatus="id ? 'edit' : 'save'" />
  <form @submit.prevent="submit">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      <InputGroup>
        <input-group-required-icon :is-validate="form.name.length >= 3" />
        <input-group-text
          @value="(value) => (form.name = value)"
          :min-length="3"
          placeholder="name"
          label="name"
          :i18n-prefix="i18nPrefix"
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

      <threaded-size-input-select
        required
        :initial-value="form.threadedSize?.id ?? 0"
        @on-select="(event) => (form.threadedSize = event)"
        can-add-new
      />

      <caliber-input-select
        :initial-value="form.caliber.id"
        can-add-new
        required
        @on-select="(event) => (form.caliber = event)"
      />

      <input-group-number
        label="diameter"
        :i18n-prefix="i18nPrefix"
        @value="(value) => (form.diameter = value)"
        input-id="diameter"
        :initial-value="form.diameter"
        add-on="mm"
      />

      <input-group-number
        label="length"
        :i18n-prefix="i18nPrefix"
        @value="(value) => (form.length = value)"
        input-id="length"
        :initial-value="form.length"
        add-on="mm"
      />

      <input-group-number
        label="chicane"
        :i18n-prefix="i18nPrefix"
        @value="(value) => (form.chicane = value)"
        input-id="chicane"
        :initial-value="form.chicane"
      />

      <InputGroup>
        <input-group-optional-icon />
        <input-group-check-box
          input-id="isCleanable"
          label="isCleanable"
          size="large"
          :i18n-prefix="i18nPrefix"
          @checked="(event) => (form.isCleanable = event)"
          :checked="form.isCleanable"
        />
      </InputGroup>

      <input-group-number
        label="estimatedNoiseReduction"
        :i18n-prefix="i18nPrefix"
        @value="(value) => (form.estimatedNoiseReduction = value)"
        input-id="estimatedNoiseReduction"
        :initial-value="form.estimatedNoiseReduction"
        add-on="db"
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
    <edit-stock-component
      v-if="form.inStock > -1"
      :in-stock="form.inStock"
      object="RDS"
      :object-id="id"
      @update:in-stock="(value) => (form.inStock = value)"
    />
    <save-button :status="id ? 'edit' : 'save'" :disabled="!isFormValid" />
  </form>
</template>
<script setup lang="ts">
import { useSoundReducerStore } from '@/stores/sound-noise-reducer.store'
import InputGroupRequiredIcon from '@/components/__form/InputGroupRequiredIcon.vue'
import InputGroup from 'primevue/inputgroup'
import InputGroupText from '@/components/__form/InputGroupText.vue'
import Textarea from 'primevue/textarea'
import InputGroupOptionalIcon from '@/components/__form/InputGroupOptionalIcon.vue'
import InputGroupNumber from '@/components/__form/InputGroupNumber.vue'
import SaveButton from '@/components/__form/SaveButton.vue'
import InputGroupCheckBox from '@/components/__form/InputGroupCheckBox.vue'
import { computed } from 'vue'
import FactoryInputSelect from '@/components/__form/__specific_select/FactoryInputSelect.vue'
import CaliberInputSelect from '@/components/__form/__specific_select/CaliberInputSelect.vue'
import ThreadedSizeInputSelect from '@/components/__form/__specific_select/ThreadedSizeInputSelect.vue'
import PriceHistoryForm from '@/components/__form/PriceHistoryForm.vue'
import EditStockComponent from '@/components/__stock/EditStockComponent.vue'
import FormTitleComponent from '@/components/__form/FormTitleComponent.vue'

const store = useSoundReducerStore()
const { id } = defineProps<{
  id?: string
}>()
const { form, submit } = store.formBuilder(id)

const i18nPrefix = store.getI18NPrefix

const isFormValid = computed(() => {
  let isValid: boolean = false
  if (
    form.value.name &&
    form.value.factory.id > 0 &&
    form.value.caliber.id > 0 &&
    form.value.threadedSize.id > 0 &&
    form.value.priceHistory.supplierPrice > 0
  ) {
    isValid = true
  }
  return isValid
})
</script>
<style scoped></style>
