<template>
  <div class="card">
    <h2 class="text-center mt-2 text-2xl">{{ t(i18nPrefix + formStatus) }}</h2>
    <form @submit.prevent="submit">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        <factory-input-select
          :initial-value="form.factory.id"
          can-add-new
          required
          factory-type="optic"
          @on-select="(event) => (form.factory = event)"
        />

        <optic-type-input-select
          required
          :initial-value="form.opticType.id"
          @on-select="(event) => (form.opticType = event)"
        />

        <focal-plane-input-select
          required
          :initial-value="form.focalPlane.id"
          @on-select="(event) => (form.focalPlane = event)"
        />

        <InputGroup>
          <input-group-required-icon :is-validate="form.name.length >= 3" />
          <input-group-text
            @value="(value) => (form.name = value)"
            :min-length="3"
            placeholder="opticModel"
            label="opticModel"
            :i18n-prefix="i18nPrefix"
            required
            input-id="name"
            :initial-value="form.name"
          />
        </InputGroup>

        <optic-unit-input-select
          required
          :initial-value="form.opticUnit.id"
          @on-select="(event) => (form.opticUnit = event)"
        />

        <InputGroup>
          <input-group-required-icon :is-validate="form.valueOfOneClick > 0" />
          <input-group-select
            :options="clickValueOption"
            label="clickValue"
            placeholder="clickValue"
            :i18n-prefix="i18nPrefix"
            @option-id="(event) => (form.valueOfOneClick = event)"
            required
            input-id="valueOfOneClick"
            :initial-value="form.valueOfOneClick"
            :disabled="form.opticUnit.id === 0"
          />
        </InputGroup>

        <InputGroup>
          <input-group-number
            :min="0"
            label="minZoom"
            placeholder="minZoom"
            :i18n-prefix="i18nPrefix"
            required
            @value="(value) => (form.minZoom = value)"
            input-id="minZoom"
            :initial-value="form.minZoom"
          />

          <input-group-number
            :min="form.minZoom + 1"
            label="maxZoom"
            placeholder="maxZoom"
            :i18n-prefix="i18nPrefix"
            required
            @value="(value) => (form.maxZoom = value)"
            input-id="maxZoom"
            :initial-value="form.maxZoom"
          />
        </InputGroup>
        <InputGroup>
          <input-group-number
            :min="0"
            label="maxDrift"
            placeholder="maxDrift"
            :i18n-prefix="i18nPrefix"
            required
            @value="(value) => (form.maxDrift = value)"
            input-id="maxDrift"
            :initial-value="form.maxDrift"
            add-on="moa"
          />

          <input-group-number
            :min="0"
            label="maxElevation"
            placeholder="maxElevation"
            :i18n-prefix="i18nPrefix"
            required
            @value="(value) => (form.maxElevation = value)"
            input-id="maxElevation"
            :initial-value="form.maxElevation"
            add-on="moa"
          />
        </InputGroup>

        <InputGroup>
          <input-group-number
            :min="0"
            label="lensDiameter"
            placeholder="lensDiameter"
            :i18n-prefix="i18nPrefix"
            required
            @value="(value) => (form.lensDiameter = value)"
            input-id="lensDiameter"
            :initial-value="form.lensDiameter"
            add-on="mm"
          />

          <input-group-number
            :min="0"
            label="bodyDiameter"
            placeholder="bodyDiameter"
            :i18n-prefix="i18nPrefix"
            required
            @value="(value) => (form.bodyDiameter = value)"
            input-id="bodyDiameter"
            :initial-value="form.bodyDiameter"
            add-on="mm"
          />
        </InputGroup>

        <InputGroup>
          <input-group-number
            label="length"
            placeholder="length"
            required
            @value="(value) => (form.length = value)"
            input-id="length"
            :initial-value="form.length"
            add-on="cm"
          />
          <input-group-number
            label="eyeRelief"
            placeholder="eyeRelief"
            :i18n-prefix="i18nPrefix"
            @value="(value) => (form.eyeRelief = value)"
            input-id="eyeRelief"
            :initial-value="form.eyeRelief"
            add-on="cm"
          />
        </InputGroup>

        <InputGroup>
          <input-group-optional-icon />
          <input-group-check-box
            input-id="isCollarsProvided"
            :i18n-prefix="i18nPrefix"
            label="isCollarsProvided"
            tool-tip="isCollarsProvided"
            @checked="(event) => (form.isCollarsProvided = event)"
            :checked="form.isCollarsProvided"
          />
          <optic-rail-input-select
            :required="form.isCollarsProvided"
            :disabled="!form.isCollarsProvided"
            @on-select="(event) => (form.providedOpticCollarSize = event)"
            :initial-value="form.providedOpticCollarSize?.id"
          />
        </InputGroup>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-1 gap-4 p-4">
        <InputGroup>
          <input-group-check-box
            input-id="isParallax"
            :i18n-prefix="i18nPrefix"
            tool-tip="isParallax"
            label="isParallax"
            placeholder="isParallax"
            @checked="(event) => (form.isParallax = event)"
            :checked="form.isParallax"
            is-width-half-size
          />

          <input-group-number
            :min="0"
            label="minParallax"
            placeholder="minParallax"
            :i18n-prefix="i18nPrefix"
            required
            @value="(value) => (form.minParallax = value)"
            input-id="minParallax"
            :initial-value="form.minParallax"
            :disabled="!form.isParallax"
          />

          <input-group-number
            :min="0"
            label="maxParallax"
            :i18n-prefix="i18nPrefix"
            placeholder="maxParallax"
            required
            @value="(value) => (form.maxParallax = value)"
            input-id="maxParallax"
            :disabled="!form.isParallax"
            :initial-value="form.maxParallax"
            add-on="yrd"
          />
        </InputGroup>
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
//TODO: Refacto les input specifiques
import { computed } from 'vue'
import { useOpticStore } from '@/stores/optic.store'
import InputGroup from 'primevue/inputgroup'
import Textarea from 'primevue/textarea'
import { useI18n } from 'vue-i18n'
import InputGroupSelect from '@/components/__form/InputGroupSelect.vue'
import InputGroupRequiredIcon from '@/components/__form/InputGroupRequiredIcon.vue'
import InputGroupText from '@/components/__form/InputGroupText.vue'
import InputGroupNumber from '@/components/__form/InputGroupNumber.vue'
import InputGroupCheckBox from '@/components/__form/InputGroupCheckBox.vue'
import InputGroupOptionalIcon from '@/components/__form/InputGroupOptionalIcon.vue'
import type { FormStatus } from '@/types/form-status.type'
import SaveButton from '@/components/__form/SaveButton.vue'
import FactoryInputSelect from '@/components/__form/__specific_select/FactoryInputSelect.vue'
import OpticTypeInputSelect from '@/components/__form/__specific_select/OpticTypeInputSelect.vue'
import FocalPlaneInputSelect from '@/components/__form/__specific_select/FocalPlaneInputSelect.vue'
import OpticUnitInputSelect from '@/components/__form/__specific_select/OpticUnitInputSelect.vue'
import PriceHistoryForm from '@/components/__form/PriceHistoryForm.vue'
import OpticRailInputSelect from '@/components/__form/__specific_select/OpticRailInputSelect.vue'
import { useFormStore } from '@/stores/form.store'

const store = useOpticStore()

const i18nPrefix = store.getI18NPrefix

const { t } = useI18n()

const { id } = defineProps<{
  id?: string
}>()
const { form, submit } = store.formBuilder(id)
const formStore = useFormStore()
const formStatus: FormStatus = formStore.getFormStatus()
const isFormValid = computed(() => {
  let isValid: boolean = false
  if (
    form.value.name &&
    form.value.factory.id > 0 &&
    form.value.opticType.id > 0 &&
    form.value.focalPlane.id > 0 &&
    form.value.bodyDiameter > 0 &&
    form.value.lensDiameter > 0 &&
    form.value.valueOfOneClick > 0
  ) {
    isValid = true
  }
  return isValid
})

const clickValueOption = computed(() => {
  const moaOptions = [
    { id: 1, name: '1/8' },
    { id: 2, name: '1/4' },
    { id: 3, name: '1/2' }
  ]
  const mradOptions = [{ id: 1, name: '1/10' }]

  if (form.value.opticUnit.name === 'MOA') {
    return moaOptions
  } else {
    return mradOptions
  }
})
</script>

<style scoped></style>
