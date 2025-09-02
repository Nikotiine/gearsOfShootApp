<template>
  <form-title-component :i18n-prefix="i18nPrefix" />
  <form @submit.prevent="submit">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 mt-10">
      <weapon-type-input-select
        required
        :prefilter="WeaponEnum.HAND_GUN"
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
        required
        @on-select="(event) => (form.caliber = event)"
      />

      <factory-input-select
        :initial-value="form.factory.id"
        can-add-new
        required
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
          :i18n-prefix="i18nPrefix"
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
          :i18n-prefix="i18nPrefix"
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
        :i18n-prefix="i18nPrefix"
        required
        @value="(value) => (form.barrelLength = value)"
        input-id="barrelLength"
        :initial-value="form.barrelLength"
        add-on="cm"
      />

      <input-group-number
        placeholder="barrelSize"
        label="barrelSize"
        :i18n-prefix="i18nPrefix"
        @value="(value) => (form.barrelSize = value)"
        input-id="barrelSize"
        :initial-value="form.barrelSize"
        add-on="mm"
      />

      <color-input-select
        input-id="barrelColorId"
        :initial-value="form.barrelColor?.id ?? 0"
        placeholder="barrelColor"
        can-add-new
        label="barrelColor"
        @on-select="(event) => (form.barrelColor = event)"
      />
      <InputGroup>
        <input-group-optional-icon :is-completed="!!form.threadedSize" />
        <input-group-check-box
          input-id="isThreadedBarrel"
          label="isThreadedBarrel"
          :i18n-prefix="i18nPrefix"
          @checked="(event) => (form.isThreadedBarrel = event)"
          :checked="form.isThreadedBarrel"
        />
        <threaded-size-input-select
          :disabled="!form.isThreadedBarrel"
          :required="form.isThreadedBarrel"
          :initial-value="form.threadedSize?.id ?? 0"
          @on-select="(event) => (form.threadedSize = event)"
          can-add-new
        />
      </InputGroup>

      <InputGroup>
        <input-group-optional-icon
          :is-completed="isProvidedMagazine && form.providedMagazineQuantity > 0"
        />
        <input-group-check-box
          input-id="isProvidedMagazine"
          label="isProvidedMagazine"
          :i18n-prefix="i18nPrefix"
          @checked="(event) => (isProvidedMagazine = event)"
          :checked="isProvidedMagazine"
          :disabled="isRevolver"
        />
        <input-group-number
          placeholder="providedMagazineQuantity"
          label="providedMagazineQuantity"
          @value="(value) => (form.providedMagazineQuantity = value)"
          input-id="providedMagazineQuantity"
          :i18n-prefix="i18nPrefix"
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
          :i18n-prefix="i18nPrefix"
          @checked="(event) => (form.isAdjustableTrigger = event)"
          :checked="form.isAdjustableTrigger"
          class="width-20rem"
        />
        <input-group-number
          :min="0.1"
          :min-fraction-digits="2"
          label="adjustableTriggerMinWeight"
          :i18n-prefix="i18nPrefix"
          :disabled="!form.isAdjustableTrigger"
          @value="(value) => (form.adjustableTriggerMinWeight = value)"
          input-id="adjustableTriggerMinWeight"
          :initial-value="form.adjustableTriggerMinWeight ?? 0"
          hide-icon
        />
        <input-group-number
          :min="form.adjustableTriggerMaxWeight + 0.1"
          :min-fraction-digits="2"
          label="adjustableTriggerMaxWeight"
          :i18n-prefix="i18nPrefix"
          :disabled="!form.isAdjustableTrigger"
          @value="(value) => (form.adjustableTriggerMaxWeight = value)"
          input-id="adjustableTriggerMaxWeight"
          :initial-value="form.adjustableTriggerMaxWeight ?? 0"
          hide-icon
        />
      </InputGroup>

      <trigger-type-input-select
        required
        :initial-value="form.triggerType?.id ?? 0"
        @on-select="(event) => (form.triggerType = event)"
      />
      <material-input-select
        @on-select="(event) => (form.slideMaterial = event)"
        :initial-value="form.slideMaterial?.id ?? 0"
        can-add-new
        label="slideMaterial"
        placeholder="slideMaterial"
        :disabled="isRevolver"
        input-id="slideMaterialId"
      />
      <color-input-select
        input-id="slideColorId"
        :initial-value="form.slideColor?.id ?? 0"
        can-add-new
        label="slideColor"
        placeholder="slideColor"
        @on-select="(event) => (form.slideColor = event)"
        :disabled="isRevolver"
      />
      <material-input-select
        @on-select="(event) => (form.buttMaterial = event)"
        :initial-value="form.buttMaterial?.id ?? 0"
        can-add-new
        label="buttMaterial"
        placeholder="buttMaterial"
        input-id="buttMaterialId"
      />

      <color-input-select
        input-id="buttColorId"
        label="buttColor"
        placeholder="buttColor"
        :initial-value="form.buttColor?.id ?? 0"
        can-add-new
        @on-select="(event) => (form.buttColor = event)"
      />
      <InputGroup>
        <input-group-optional-icon :is-completed="form.isOpticReady" />
        <input-group-check-box
          input-id="isOpticReady"
          label="isOpticReady"
          :i18n-prefix="i18nPrefix"
          @checked="(event) => (form.isOpticReady = event)"
          :checked="form.isOpticReady"
        />
        <optic-ready-plate-input-mulit-select
          :initial-value="form.providedOpticReadyPlates || []"
          :clear="resetMultiselect"
          :disabled="!form.isOpticReady"
          @on-select="(event) => (form.providedOpticReadyPlates = event)"
        />
      </InputGroup>

      <InputGroup class="w-full">
        <input-group-optional-icon is-completed />
        <input-group-check-box
          input-id="isExternalHammer"
          label="isExternalHammer"
          :i18n-prefix="i18nPrefix"
          @checked="(event) => (form.isExternalHammer = event)"
          :checked="form.isExternalHammer"
          is-width-half-size
        />
        <input-group-check-box
          input-id="isPicatinyRailSlop"
          label="isPicatinyRailSlop"
          @checked="(event) => (form.isPicatinyRailSlop = event)"
          :checked="form.isPicatinyRailSlop"
          :i18n-prefix="i18nPrefix"
          is-width-half-size
        />
        <input-group-check-box
          input-id="decocking"
          label="decocking"
          :i18n-prefix="i18nPrefix"
          @checked="(event) => (form.decocking = event)"
          :checked="isRevolver ? false : form.decocking"
          is-width-half-size
          :disabled="isRevolver"
        />
      </InputGroup>
      <InputGroup class="w-full">
        <input-group-optional-icon is-completed />
        <input-group-check-box
          input-id="isAdjustableBackSight"
          label="isAdjustableBackSight"
          :i18n-prefix="i18nPrefix"
          @checked="(event) => (form.isAdjustableBackSight = event)"
          :checked="form.isAdjustableBackSight"
          size="medium"
        />
        <input-group-check-box
          input-id="isAdjustableFrontSight"
          label="isAdjustableFrontSight"
          @checked="(event) => (form.isAdjustableFrontSight = event)"
          :checked="form.isAdjustableFrontSight"
          :i18n-prefix="i18nPrefix"
          size="medium"
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
    <edit-stock-component
      v-if="form.inStock > -1"
      :in-stock="form.inStock"
      object="HANDGUN"
      :object-id="id"
      @update:in-stock="(value) => (form.inStock = value)"
    />
    <div class="text-center">
      <Button type="submit" :label="t(buttonLabel)" :disabled="!isValidForm"></Button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import InputGroup from 'primevue/inputgroup'
import { computed, ref } from 'vue'
import Button from 'primevue/button'
import Textarea from 'primevue/textarea'
import { useHandGunStore } from '@/stores/hand-gun.store'
import InputGroupRequiredIcon from '@/components/__form/InputGroupRequiredIcon.vue'
import InputGroupText from '@/components/__form/InputGroupText.vue'
import InputGroupOptionalIcon from '@/components/__form/InputGroupOptionalIcon.vue'
import InputGroupNumber from '@/components/__form/InputGroupNumber.vue'
import InputGroupCheckBox from '@/components/__form/InputGroupCheckBox.vue'
import CaliberInputSelect from '@/components/__form/__specific_select/CaliberInputSelect.vue'
import FactoryInputSelect from '@/components/__form/__specific_select/FactoryInputSelect.vue'
import PercussionTypeInputSelect from '@/components/__form/__specific_select/PercussionTypeInputSelect.vue'
import BarrelTypeInputSelect from '@/components/__form/__specific_select/BarrelTypeInputSelect.vue'
import ColorInputSelect from '@/components/__form/__specific_select/ColorInputSelect.vue'
import MaterialInputSelect from '@/components/__form/__specific_select/MaterialInputSelect.vue'
import OpticReadyPlateInputMulitSelect from '@/components/__form/__specific_mullti_select/OpticReadyPlateInputMulitSelect.vue'
import ThreadedSizeInputSelect from '@/components/__form/__specific_select/ThreadedSizeInputSelect.vue'
import TriggerTypeInputSelect from '@/components/__form/__specific_select/TriggerTypeInputSelect.vue'
import { WeaponEnum } from '@/enum/weapon.enum'
import WeaponTypeInputSelect from '@/components/__form/__specific_select/WeaponTypeInputSelect.vue'
import LegalisationCategoryInputSelect from '@/components/__form/__specific_select/LegalisationCategoryInputSelect.vue'
import PriceHistoryForm from '@/components/__form/PriceHistoryForm.vue'
import { useFormStore } from '@/stores/form.store'
import EditStockComponent from '@/components/__stock/EditStockComponent.vue'
import FormTitleComponent from '@/components/__form/FormTitleComponent.vue'

const handGunStore = useHandGunStore()
const i18nPrefix = handGunStore.getI18NPrefix

const { t } = useI18n()
const buttonLabel = ref('global.save')
const formStore = useFormStore()
const id = formStore.getFormId()
const isProvidedMagazine = ref(false)

const resetMultiselect = ref(false)

const { form, submit } = handGunStore.formBuilder(id)

const isInvalidMaxTriggerValue = computed(() => {
  return (
    form.value.isAdjustableTrigger &&
    form.value?.adjustableTriggerMaxWeight <= form.value?.adjustableTriggerMinWeight
  )
})

const isRevolver = computed(() => {
  return form.value.type.name === WeaponEnum.REVLOVER
})
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
    form.value.percussionType.id > 0 &&
    form.value.triggerType.id > 0
  ) {
    isValid = true
  }
  return isValid
})
</script>

<style scoped>
.width-20rem {
  width: 20rem;
}
</style>
