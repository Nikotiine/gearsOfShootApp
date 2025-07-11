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
          <input-group-required-icon
            :is-validate="form.minZoom > 0 && form.maxZoom > form.minZoom"
          />
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
          <input-group-required-icon :is-validate="form.maxDrift > 0 && form.maxElevation > 0" />
          <input-group-number
            :min="0"
            label="maxDrift"
            placeholder="maxDrift"
            :i18n-prefix="i18nPrefix"
            required
            @value="(value) => (form.maxDrift = value)"
            input-id="maxDrift"
            :initial-value="form.maxDrift"
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
          />
          <InputGroupAddon>moa</InputGroupAddon>
        </InputGroup>

        <InputGroup>
          <input-group-required-icon
            :is-validate="form.lensDiameter > 0 && form.bodyDiameter > 0"
          />
          <input-group-number
            :min="0"
            label="lensDiameter"
            placeholder="lensDiameter"
            :i18n-prefix="i18nPrefix"
            required
            @value="(value) => (form.lensDiameter = value)"
            input-id="lensDiameter"
            :initial-value="form.lensDiameter"
          />
          <InputGroupAddon>mm</InputGroupAddon>
          <input-group-number
            :min="0"
            label="bodyDiameter"
            placeholder="bodyDiameter"
            :i18n-prefix="i18nPrefix"
            required
            @value="(value) => (form.bodyDiameter = value)"
            input-id="bodyDiameter"
            :initial-value="form.bodyDiameter"
          />
          <InputGroupAddon>mm</InputGroupAddon>
        </InputGroup>

        <InputGroup>
          <input-group-required-icon :is-validate="form.length > 0" />
          <input-group-number
            label="length"
            placeholder="length"
            @value="(value) => (form.length = value)"
            input-id="length"
            :initial-value="form.length"
          />
          <InputGroupAddon><span>cm</span></InputGroupAddon>
        </InputGroup>

        <InputGroup>
          <input-group-required-icon :is-validate="form.eyeRelief > 0" />
          <input-group-number
            label="eyeRelief"
            placeholder="eyeRelief"
            :i18n-prefix="i18nPrefix"
            @value="(value) => (form.eyeRelief = value)"
            input-id="eyeRelief"
            :initial-value="form.eyeRelief"
          />
          <InputGroupAddon><span>cm</span></InputGroupAddon>
        </InputGroup>

        <InputGroup>
          <input-group-optional-icon />
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
          <InputGroupAddon>{{ t('global.from') }}</InputGroupAddon>
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
          <InputGroupAddon>{{ t('global.to') }}</InputGroupAddon>
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
          />
          <InputGroupAddon>yard</InputGroupAddon>
        </InputGroup>

        <InputGroup class="h-14">
          <input-group-optional-icon />
          <input-group-check-box
            input-id="isCollarsProvided"
            :i18n-prefix="i18nPrefix"
            label="isCollarsProvided"
            tool-tip="isCollarsProvided"
            @checked="(event) => (form.isCollarsProvided = event)"
            :checked="form.isCollarsProvided"
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
      <!--      <div class="text-red-500 p-4" v-if="store.create.isError">
        <p class="text-xl font-bold">
          {{ t('error.' + store.create.error.response.data.message) }}
        </p>
      </div>-->

      <div class="text-center">
        <save-button :status="formStatus" :disabled="!isFormValid" />
      </div>
    </form>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { useOpticStore } from '@/stores/optic'
import InputGroup from 'primevue/inputgroup'
import Textarea from 'primevue/textarea'
import InputGroupAddon from 'primevue/inputgroupaddon'
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

const store = useOpticStore()

const i18nPrefix = store.getI18nPrefix()

const { t } = useI18n()

const { id } = defineProps<{
  id?: string
  formStatus: FormStatus
}>()
const { form, submit } = store.formBuilder(id)
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
