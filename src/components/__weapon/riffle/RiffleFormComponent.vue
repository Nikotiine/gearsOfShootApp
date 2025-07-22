<template>
  <h2 class="text-center mt-16 text-xl lg:text-2xl text-blue-500">{{ t('global.riffle') }}</h2>
  <form @submit.prevent="submit">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 mt-10">
      <weapon-type-input-select
        required
        :prefilter="WeaponEnum.RIFFLE"
        can-add-new
        @on-select="(event) => (form.type = event)"
        :initial-value="form.type.id"
      />
      <legalisation-category-input-select
        required
        @on-select="(event) => (form.category = event)"
        :initial-value="form.category.id"
      />
      <caliber-input-select
        :initial-value="form.caliber.id"
        can-add-new
        @on-select="(event) => (form.caliber = event)"
      />
      <factory-input-select
        :initial-value="form.factory.id"
        can-add-new
        factory-type="weapon"
        @on-select="(event) => (form.factory = event)"
      />

      <InputGroup>
        <input-group-required-icon :is-validate="form.name.length >= 3" />
        <input-group-text
          @value="(value) => (form.name = value)"
          :min-length="3"
          placeholder="model"
          label="model"
          required
          :i18n-prefix="i18Prefix"
          input-id="name"
          :initial-value="form.name"
        />
      </InputGroup>

      <InputGroup>
        <input-group-optional-icon :is-completed="form.variation.length > 0" />
        <input-group-text
          @value="(value) => (form.variation = value)"
          placeholder="variation"
          label="variation"
          :i18n-prefix="i18Prefix"
          input-id="variation"
          :initial-value="form.variation ?? undefined"
        />
      </InputGroup>

      <percussion-type-input-select
        required
        :initial-value="form.percussionType.id"
        @on-select="(event) => (form.percussionType = event)"
      />

      <barrel-type-input-select
        required
        :initial-value="form.barrelType.id"
        @on-select="(event) => (form.barrelType = event)"
      />

      <input-group-number
        :min="3"
        :min-fraction-digits="2"
        placeholder="barrelLength"
        label="barrelLength"
        :i18n-prefix="i18Prefix"
        required
        @value="(value) => (form.barrelLength = value)"
        input-id="barrelLength"
        :initial-value="form.barrelLength"
        add-on="cm"
      />

      <input-group-number
        placeholder="barrelSize"
        label="barrelSize"
        :i18n-prefix="i18Prefix"
        @value="(value) => (form.barrelSize = value)"
        input-id="barrelSize"
        :initial-value="form.barrelSize"
        add-on="mm"
      />

      <color-input-select
        input-id="barrelColorId"
        label="barrelColor"
        placeholder="barrelColor"
        :initial-value="form.barrelColor?.id ?? 0"
        can-add-new
        @on-select="(event) => (form.barrelColor = event)"
      />

      <InputGroup>
        <input-group-optional-icon :is-completed="form.threadedSize?.id > 0" />
        <input-group-check-box
          input-id="isThreadedBarrel"
          label="isThreadedBarrel"
          :i18n-prefix="i18Prefix"
          @checked="(event) => (form.isThreadedBarrel = event)"
          :checked="form.isThreadedBarrel"
        />
        <threaded-size-input-select
          :disabled="!form.isThreadedBarrel"
          :initial-value="form.threadedSize?.id ?? 0"
          can-add-new
          @on-select="(event) => (form.threadedSize = event)"
        />
      </InputGroup>

      <InputGroup>
        <input-group-optional-icon />
        <input-group-check-box
          input-id="isProvidedMagazine"
          label="isProvidedMagazine"
          :i18n-prefix="i18Prefix"
          @checked="(event) => (isProvidedMagazine = event)"
          :checked="isProvidedMagazine"
        />
        <input-group-number
          placeholder="providedMagazineQuantity"
          label="providedMagazineQuantity"
          @value="(value) => (form.providedMagazineQuantity = value)"
          input-id="providedMagazineQuantity"
          :i18n-prefix="i18Prefix"
          :disabled="!isProvidedMagazine"
          :initial-value="form.providedMagazineQuantity"
          hide-icon
        />
      </InputGroup>

      <InputGroup>
        <input-group-optional-icon
          :is-completed="form.isAdjustableTrigger && !isInvalidMaxTriggerValue"
        />
        <input-group-check-box
          input-id="isAdjustableTrigger"
          label="isAdjustableTrigger"
          :i18n-prefix="i18Prefix"
          @checked="(event) => (form.isAdjustableTrigger = event)"
          :checked="form.isAdjustableTrigger"
          class="width-20rem"
        />
        <input-group-number
          :min="0.1"
          :min-fraction-digits="2"
          label="adjustableTriggerMinWeight"
          :i18n-prefix="i18Prefix"
          :disabled="!form.isAdjustableTrigger"
          @value="(value) => (adjustableTriggerMinWeight = value)"
          input-id="adjustableTriggerMinWeight"
          :initial-value="adjustableTriggerMinWeight"
          hide-icon
        />
        <input-group-number
          :min="adjustableTriggerMaxWeight + 0.1"
          :min-fraction-digits="2"
          label="adjustableTriggerMaxWeight"
          :i18n-prefix="i18Prefix"
          :disabled="!form.isAdjustableTrigger"
          @value="(value) => (adjustableTriggerMaxWeight = value)"
          input-id="adjustableTriggerMaxWeight"
          :initial-value="adjustableTriggerMaxWeight"
          hide-icon
        />
      </InputGroup>

      <material-input-select
        @on-select="(event) => (form.buttMaterial = event)"
        :initial-value="form.buttMaterial?.id ?? 0"
        can-add-new
        label="buttMaterial"
        placeholder="buttMaterial"
        input-id="buttMaterialId"
      />

      <InputGroup class="w-full">
        <input-group-optional-icon />
        <input-group-check-box
          input-id="isAdjustableButt"
          :i18n-prefix="i18Prefix"
          label="isAdjustableButt"
          @checked="(event) => (form.isAdjustableButt = event)"
          :checked="form.isAdjustableButt"
          is-width-half-size
          size="medium"
        />
        <input-group-check-box
          input-id="isAdjustableBusk"
          :i18n-prefix="i18Prefix"
          label="isAdjustableBusk"
          @checked="(event) => (form.isAdjustableBusk = event)"
          :checked="form.isAdjustableBusk"
          is-width-half-size
          size="medium"
        />
      </InputGroup>

      <color-input-select
        input-id="buttColorId"
        label="buttColor"
        placeholder="buttColor"
        :initial-value="form.buttColor?.id ?? 0"
        can-add-new
        @on-select="(event) => (form.buttColor = event)"
      />

      <optic-rail-input-select
        :initial-value="form.railSize?.id ?? 0"
        @on-select="(event) => (form.railSize = event)"
      />

      <InputGroup>
        <input-group-optional-icon />

        <input-group-check-box
          input-id="isOpenAim"
          label="isOpenAim"
          @checked="(event) => (form.isOpenAim = event)"
          :checked="form.isOpenAim"
          is-width-half-size
          :i18n-prefix="i18Prefix"
        />
        <input-group-check-box
          input-id="isAdjustableBackSight"
          label="isAdjustableBackSight"
          @checked="(event) => (form.isAdjustableBackSight = event)"
          :checked="form.isAdjustableBackSight"
          is-width-half-size
          :i18n-prefix="i18Prefix"
        />
        <input-group-check-box
          input-id="isAdjustableFrontSight"
          label="isAdjustableFrontSight"
          @checked="(event) => (form.isAdjustableFrontSight = event)"
          :checked="form.isAdjustableFrontSight"
          is-width-half-size
          :i18n-prefix="i18Prefix"
        />
      </InputGroup>

      <input-group-number
        label="qcSlot"
        @value="(value) => (form.qcSlot = value)"
        input-id="qcSlot"
        :initial-value="form.qcSlot"
        :i18n-prefix="i18Prefix"
      />
      <input-group-number
        label="grenadierSlot"
        @value="(value) => (form.grenadierSlot = value)"
        input-id="grenadierSlot"
        :initial-value="form.grenadierSlot"
        :i18n-prefix="i18Prefix"
      />

      <InputGroup>
        <input-group-optional-icon :is-completed="selectedMLockOptions.length > 0" />
        <input-group-check-box
          input-id="isMlockCompatibility"
          label="isMlockCompatibility"
          @checked="(event) => (form.isMlockCompatibility = event)"
          :checked="form.isMlockCompatibility"
          :i18n-prefix="i18Prefix"
        />
        <m-lcok-option-input-multi-select
          :disabled="!form.isMlockCompatibility"
          :initial-value="form.mLockOptions || []"
          :invalid="isInvalidMLockOption"
          @on-select="(event) => (form.mLockOptions = event)"
          :clear="resetMultiselect"
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
      <Button type="submit" :label="t(buttonLabel)" :disabled="!isValidForm"></Button>
    </div>
  </form>
</template>
`
<script setup lang="ts">
import Button from 'primevue/button'
import { computed, ref } from 'vue'
import InputGroup from 'primevue/inputgroup'
import { useI18n } from 'vue-i18n'
import Textarea from 'primevue/textarea'
import { useRiffleStore } from '@/stores/riffle.store'
import InputGroupRequiredIcon from '@/components/__form/InputGroupRequiredIcon.vue'
import InputGroupOptionalIcon from '@/components/__form/InputGroupOptionalIcon.vue'
import InputGroupText from '@/components/__form/InputGroupText.vue'
import InputGroupNumber from '@/components/__form/InputGroupNumber.vue'
import InputGroupCheckBox from '@/components/__form/InputGroupCheckBox.vue'
import CaliberInputSelect from '@/components/__form/__specific_select/CaliberInputSelect.vue'
import FactoryInputSelect from '@/components/__form/__specific_select/FactoryInputSelect.vue'
import PercussionTypeInputSelect from '@/components/__form/__specific_select/PercussionTypeInputSelect.vue'
import BarrelTypeInputSelect from '@/components/__form/__specific_select/BarrelTypeInputSelect.vue'
import ColorInputSelect from '@/components/__form/__specific_select/ColorInputSelect.vue'
import ThreadedSizeInputSelect from '@/components/__form/__specific_select/ThreadedSizeInputSelect.vue'
import MaterialInputSelect from '@/components/__form/__specific_select/MaterialInputSelect.vue'
import MLcokOptionInputMultiSelect from '@/components/__form/__specific_mullti_select/MLcokOptionInputMultiSelect.vue'
import OpticRailInputSelect from '@/components/__form/__specific_select/OpticRailInputSelect.vue'
import { WeaponEnum } from '@/enum/weapon.enum'
import WeaponTypeInputSelect from '@/components/__form/__specific_select/WeaponTypeInputSelect.vue'
import LegalisationCategoryInputSelect from '@/components/__form/__specific_select/LegalisationCategoryInputSelect.vue'
import type { FormStatus } from '@/types/form-status.type'
import PriceHistoryForm from '@/components/__form/PriceHistoryForm.vue'

// Store
const riffleStore = useRiffleStore()

const i18Prefix = riffleStore.getI18NPrefix
// Request

const { t } = useI18n()
const buttonLabel = ref('global.save')
const { id } = defineProps<{
  id?: string
  formStatus: FormStatus
}>()
const { form, submit } = riffleStore.formBuilder(id)
const adjustableTriggerMinWeight = ref(0)
const adjustableTriggerMaxWeight = ref(0)
const isProvidedMagazine = ref(false)
const selectedMLockOptions = ref<number[]>([])
const resetMultiselect = ref(false)
//*******************Init du formulaire*********************

/**
 * Validators du formulaire
 */
const isValidForm = computed(() => {
  let isValid: boolean = false
  if (
    form.value.name &&
    form.value.caliber.id > 0 &&
    form.value.factory.id > 0 &&
    form.value.barrelLength > 0 &&
    form.value.barrelType.id > 0 &&
    form.value.percussionType.id > 0
  ) {
    isValid = true
  }
  return isValid
})

// Validateur pour les options mlock . Si checkbot mlock options selectionner, les valeur mlock doivent etre rempli (mini 1 option)
const isInvalidMLockOption = computed(() => {
  return form.value.isMlockCompatibility && selectedMLockOptions.value.length === 0
})

// Validateur de valeur de point de depart ( le poids maxi ne peux pas etre inferieur au poids mini )
const isInvalidMaxTriggerValue = computed(() => {
  return (
    form.value.isAdjustableTrigger &&
    adjustableTriggerMaxWeight.value <= adjustableTriggerMinWeight.value
  )
})
</script>

<style scoped>
.width-20rem {
  width: 20rem;
}
</style>
