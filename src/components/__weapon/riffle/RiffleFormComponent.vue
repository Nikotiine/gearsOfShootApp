<template>
  <form @submit.prevent="submit">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      <caliber-input-select
        :initial-value="form.caliberId"
        can-add-new
        @on-select="(event) => (form.caliberId = event)"
      />
      <factory-input-select
        :initial-value="form.factoryId"
        can-add-new
        factory-type="weapon"
        @on-select="(event) => (form.factoryId = event)"
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
        :initial-value="form.percussionTypeId"
        @on-select="(event) => (form.percussionTypeId = event)"
      />

      <barrel-type-input-select
        required
        :initial-value="form.barrelTypeId"
        @on-select="(event) => (form.barrelTypeId = event)"
      />

      <InputGroup>
        <input-group-required-icon :is-validate="form.barrelLength >= 3" />
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
        />
        <InputGroupAddon><span>cm</span></InputGroupAddon>
      </InputGroup>

      <InputGroup>
        <input-group-optional-icon :is-completed="form.barrelSize > 0" />
        <input-group-number
          placeholder="barrelSize"
          label="barrelSize"
          :i18n-prefix="i18Prefix"
          @value="(value) => (form.barrelSize = value)"
          input-id="barrelSize"
          :initial-value="form.barrelSize"
        />
        <InputGroupAddon><span>mm</span></InputGroupAddon>
      </InputGroup>

      <color-input-select
        input-id="barrelColorId"
        label="barrelColor"
        placeholder="barrelColor"
        :initial-value="form.barrelColorId ?? 0"
        can-add-new
        @on-select="(event) => (form.barrelColorId = event)"
      />

      <InputGroup>
        <input-group-optional-icon :is-completed="form.threadedSizeId > 0" />
        <input-group-check-box
          input-id="isThreadedBarrel"
          label="isThreadedBarrel"
          :i18n-prefix="i18Prefix"
          @checked="(event) => (form.isThreadedBarrel = event)"
          :checked="form.isThreadedBarrel"
        />
        <threaded-size-input-select
          :disabled="!form.isThreadedBarrel"
          :initial-value="form.threadedSizeId ?? 0"
          can-add-new
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
        />
        <input-group-number
          :min="0.1"
          :min-fraction-digits="2"
          label="adjustableTriggerMinWeight"
          :i18n-prefix="i18Prefix"
          :disabled="!form.isAdjustableTrigger"
          @value="(value) => (adjustableTriggerMinWeight = value)"
          input-id="adjustableTriggerMinWeight"
          :max-width="33"
          :initial-value="adjustableTriggerMinWeight"
        />
        <input-group-number
          :min="adjustableTriggerMaxWeight + 0.1"
          :min-fraction-digits="2"
          label="adjustableTriggerMaxWeight"
          :i18n-prefix="i18Prefix"
          :disabled="!form.isAdjustableTrigger"
          @value="(value) => (adjustableTriggerMaxWeight = value)"
          input-id="adjustableTriggerMaxWeight"
          :max-width="33"
          :initial-value="adjustableTriggerMaxWeight"
        />
      </InputGroup>

      <material-input-select
        @on-select="(event) => (form.buttMaterialId = event)"
        :initial-value="form.buttMaterialId ?? 0"
        can-add-new
        label="buttMaterial"
        placeholder="buttMaterial"
        input-id="buttMaterialId"
      />
      <!--      <InputGroup>
        <input-group-optional-icon :is-completed="form.buttMaterialId > 0" />
        <input-group-select
          :options="materials$"
          label="weapon.common.buttMaterial"
          @option-id="(event) => (form.buttMaterialId = event)"
          input-id="buttMaterialId"
          :initial-value="form.buttMaterialId ?? 0"
        />
        <input-group-addon-open-drawer-button type="material" />
      </InputGroup>-->

      <InputGroup class="w-full">
        <input-group-optional-icon />
        <input-group-check-box
          input-id="isAdjustableButt"
          :i18n-prefix="i18Prefix"
          label="isAdjustableButt"
          @checked="(event) => (form.isAdjustableButt = event)"
          :checked="form.isAdjustableButt"
          is-width-half-size
        />
        <input-group-check-box
          input-id="isAdjustableBusk"
          :i18n-prefix="i18Prefix"
          label="isAdjustableBusk"
          @checked="(event) => (form.isAdjustableBusk = event)"
          :checked="form.isAdjustableBusk"
          is-width-half-size
        />
      </InputGroup>

      <color-input-select
        input-id="buttColorId"
        label="buttColor"
        placeholder="buttColor"
        :initial-value="form.buttColorId ?? 0"
        can-add-new
        @on-select="(event) => (form.buttColorId = event)"
      />
      <!--      <InputGroup>
        <input-group-optional-icon :is-completed="form.buttColorId > 0" />
        <input-group-select
          :options="colors$"
          label="weapon.common.buttColor"
          @option-id="(event) => (form.buttColorId = event)"
          filter
          input-id="buttColorId"
          :initial-value="form.buttColorId ?? 0"
        />
        <input-group-addon-open-drawer-button type="color" />
      </InputGroup>-->

      <optic-rail-input-select
        :initial-value="form.railSizeId ?? 0"
        @on-select="(event) => (form.railSizeId = event)"
      />
      <!--      <InputGroup>
        <input-group-optional-icon :is-completed="form.railSizeId > 0" />
        <input-group-select
          :options="railSizes$"
          label="global.opticRail"
          @option-id="(event) => (form.railSizeId = event)"
          filter
          input-id="railSizeId"
          :initial-value="form.railSizeId ?? 0"
        />
      </InputGroup>-->

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

      <InputGroup>
        <input-group-optional-icon />
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
      </InputGroup>

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
        <!--        <input-group-multi-select
          input-id="mLockOptions"
          label="weapon.common.mLockOptions"
          :options="mLockOptions$"
          :disabled="!form.isMlockCompatibility"
          :invalid="isInvalidMLockOption"
          @selected-options="(event) => (selectedMLockOptions = event)"
          :clear="resetMultiselect"
          :initial-value="selectedMLockOptions"
        />-->
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
    <div class="text-red-500 p-4" v-if="riffleStore.create.isError">
      <p class="text-xl font-bold">
        {{ t('error.' + riffleStore.create.error.response.data.message) }}
      </p>
    </div>
    <div class="text-center">
      <Button type="submit" :label="t(buttonLabel)" :disabled="!isValidForm"></Button>
    </div>
  </form>
</template>
`
<script setup lang="ts">
import type { CreateRiffleDto, RiffleDto, UpdateRiffleDto } from '@/api/Api'
import InputGroupAddon from 'primevue/inputgroupaddon'
import Button from 'primevue/button'
import { computed, ref, watchEffect } from 'vue'
import InputGroup from 'primevue/inputgroup'
import { useI18n } from 'vue-i18n'
import { type NewWeapon } from '@/stores/weapon'
import Textarea from 'primevue/textarea'
import { useRiffleStore } from '@/stores/riffle'
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

// Store
const riffleStore = useRiffleStore()

const i18Prefix = riffleStore.getI18NPrefix
// Request

const { t } = useI18n()
const buttonLabel = ref('global.save')
const { riffle = null } = defineProps<{
  riffle?: RiffleDto
}>()
const adjustableTriggerMinWeight = ref(0)
const adjustableTriggerMaxWeight = ref(0)
const isProvidedMagazine = ref(false)
const selectedMLockOptions = ref<number[]>([])
const resetMultiselect = ref(false)
//*******************Init du formulaire*********************
const initialForm: CreateRiffleDto = {
  typeId: 0,
  caliberId: 0,
  factoryId: 0,
  name: '',
  variation: '',
  barrelTypeId: 0,
  isThreadedBarrel: false,
  barrelLength: 0,
  threadedSizeId: null,
  isAdjustableTrigger: false,
  adjustableTriggerValue: '',
  description: '',
  categoryId: selectedOptions.category.id,
  percussionTypeId: 0,
  providedMagazineQuantity: 0,
  barrelSize: 0,
  buttMaterialId: null,
  grenadierSlot: 0,
  isAdjustableBackSight: false,
  isAdjustableBusk: false,
  isAdjustableButt: false,
  isAdjustableFrontSight: false,
  isMlockCompatibility: false,
  isOpenAim: true,
  qcSlot: 0,
  railSizeId: null,
  mLockOptions: [],
  barrelColorId: null,
  buttColorId: null
}
const form = ref<CreateRiffleDto>({ ...initialForm })

/**
 * Validators du formulaire
 */
const isValidForm = computed(() => {
  let isValid: boolean = false
  if (
    form.value.name &&
    form.value.caliberId > 0 &&
    form.value.factoryId > 0 &&
    form.value.barrelLength > 0 &&
    form.value.barrelTypeId &&
    form.value.percussionTypeId > 0
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

/**
 * Creer la chaine de caractere des valeur mini et maxi du poid de depart de la detente
 */
const adjustableTriggerValue = () => {
  return `${adjustableTriggerMinWeight.value} kg à ${adjustableTriggerMaxWeight.value} kg`
}

/**
 * Soummission du formulaire
 * Mert a jour les champs mlock et reglage de detente
 */
const submit = () => {
  form.value.adjustableTriggerValue = form.value.isAdjustableTrigger
    ? adjustableTriggerValue()
    : null
  riffle ? edit({ ...form.value, id: riffle.id }) : create(form.value)
}

/**
 * Edition d 'une arme
 * @param riffle
 */
const edit = (riffle: UpdateRiffleDto) => {
  riffleStore.edit.mutate(riffle)
}

/**
 * Creation d'une nouvelle arme
 * @param riffle
 */
const create = (riffle: CreateRiffleDto) => {
  riffleStore.create.mutate(riffle)
  resetForm()
}

/**
 * Remet le formulaire a vide apres envoie de la creation
 */
function resetForm(): void {
  form.value = { ...initialForm }
  resetMultiselect.value = !resetMultiselect.value
  adjustableTriggerMinWeight.value = 0
  adjustableTriggerMaxWeight.value = 0
  selectedMLockOptions.value = []
}

// Surveille si c'est une edition ou une creation
watchEffect(() => {
  if (riffle) {
    setEditForm(riffle)
    buttonLabel.value = 'global.edit'
  }
})

/**
 * Lors de l'edition d une arme longue pre rempli les champs avec les donnee de l'arme a edité
 * @param riffle
 */
function setEditForm(riffle: RiffleDto) {
  form.value = {
    ...riffle,
    threadedSizeId: riffle.threadedSize ? riffle.threadedSize.id : null,
    barrelColorId: riffle.barrelColor ? riffle.barrelColor.id : null,
    buttMaterialId: riffle.buttMaterial ? riffle.buttMaterial.id : null,
    buttColorId: riffle.buttColor ? riffle.buttColor.id : null,
    percussionTypeId: riffle.percussionType.id ?? 0,
    caliberId: riffle.caliber.id,
    factoryId: riffle.factory.id ?? 0,
    barrelTypeId: riffle.barrelType.id ?? 0,
    typeId: riffle.type.id,
    categoryId: riffle.category.id,
    railSizeId: riffle.railSize ? riffle.railSize.id : null
  }
  if (riffle.mLockOptions && riffle.mLockOptions.length > 0) {
    selectedMLockOptions.value = riffle.mLockOptions.map((option) => option.id)
  }
}
</script>

<style scoped></style>
