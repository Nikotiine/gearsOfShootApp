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
        :initial-value="form.barrelColorId ?? 0"
        placeholder="barrelColor"
        label="barrelColor"
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
          :disabled="isRevolver"
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

      <trigger-type-input-select
        :initial-value="form.triggerTypeId ?? 0"
        @on-select="(event) => (form.triggerTypeId = event)"
      />
      <material-input-select
        @on-select="(event) => (form.slideMaterialId = event)"
        :initial-value="form.slideMaterialId ?? 0"
        can-add-new
        label="slideMaterial"
        placeholder="slideMaterial"
        :disabled="isRevolver"
        input-id="slideMaterialId"
      />
      <color-input-select
        input-id="slideColorId"
        :initial-value="form.slideColorId ?? 0"
        can-add-new
        label="slideColor"
        placeholder="slideColor"
        @on-select="(event) => (form.slideColorId = event)"
        :disabled="isRevolver"
      />
      <material-input-select
        @on-select="(event) => (form.buttMaterialId = event)"
        :initial-value="form.buttMaterialId ?? 0"
        can-add-new
        label="buttMaterial"
        placeholder="buttMaterial"
        input-id="buttMaterialId"
      />

      <color-input-select
        input-id="buttColorId"
        label="buttColor"
        placeholder="buttColor"
        :initial-value="form.buttColorId ?? 0"
        can-add-new
        @on-select="(event) => (form.buttColorId = event)"
      />
      <InputGroup>
        <input-group-optional-icon />
        <input-group-check-box
          input-id="isOpticReady"
          label="isOpticReady"
          :i18n-prefix="i18Prefix"
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
        <input-group-optional-icon />
        <input-group-check-box
          input-id="isExternalHammer"
          label="isExternalHammer"
          :i18n-prefix="i18Prefix"
          @checked="(event) => (form.isExternalHammer = event)"
          :checked="form.isExternalHammer"
          is-width-half-size
        />
        <input-group-check-box
          input-id="isPicatinyRailSlop"
          label="isPicatinyRailSlop"
          @checked="(event) => (form.isPicatinyRailSlop = event)"
          :checked="form.isPicatinyRailSlop"
          :i18n-prefix="i18Prefix"
          is-width-half-size
        />
        <input-group-check-box
          input-id="decocking"
          label="decocking"
          :i18n-prefix="i18Prefix"
          @checked="(event) => (form.decocking = event)"
          :checked="isRevolver ? false : form.decocking"
          is-width-half-size
          :disabled="isRevolver"
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
    <div class="text-red-500 p-4" v-if="handGunStore.create.isError">
      <p class="text-xl font-bold">
        {{ t('error.' + handGunStore.create.error.response.data.message) }}
      </p>
    </div>
    <div class="text-center">
      <Button type="submit" :label="t(buttonLabel)"></Button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { CreateHandGunDto, HandGunDto, UpdateHandGunDto } from '@/api/Api'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import { computed, ref, watchEffect } from 'vue'
import Button from 'primevue/button'
import Textarea from 'primevue/textarea'
import { type NewWeapon } from '@/stores/weapon'
import { useHandGunStore } from '@/stores/hand-gun'
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

const handGunStore = useHandGunStore()
const i18Prefix = handGunStore.getI18NPrefix

const { selectedOptions, handGun = null } = defineProps<{
  selectedOptions: NewWeapon
  handGun?: HandGunDto
}>()
const { t } = useI18n()
const selectedPlates = ref<number[]>([])
const buttonLabel = ref('global.save')
const adjustableTriggerMinWeight = ref(0)
const adjustableTriggerMaxWeight = ref(0)
const isProvidedMagazine = ref(false)
const initialForm: CreateHandGunDto = {
  typeId: selectedOptions.type.id,
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
  barrelColorId: null,
  buttColorId: null,
  decocking: true,
  isPicatinyRailSlop: false,
  isAdjustableBackSight: true,
  isAdjustableFrontSight: true,
  providedOpticReadyPlates: [],
  isOpticReady: false,
  isExternalHammer: false,
  slideMaterialId: null,
  slideColorId: null,
  triggerTypeId: null
}
const form = ref<CreateHandGunDto>({ ...initialForm })
const resetMultiselect = ref(false)
const submit = () => {
  form.value.adjustableTriggerValue = form.value.isAdjustableTrigger
    ? adjustableTriggerValue()
    : null

  handGun ? edit({ ...form.value, id: handGun.id }) : create(form.value)
}

const adjustableTriggerValue = () => {
  return `de ${adjustableTriggerMinWeight.value} kg à ${adjustableTriggerMaxWeight.value} kg`
}
const isInvalidMaxTriggerValue = computed(() => {
  return (
    form.value.isAdjustableTrigger &&
    adjustableTriggerMaxWeight.value <= adjustableTriggerMinWeight.value
  )
})
const isRevolver = computed(() => {
  return selectedOptions.type.name === WeaponEnum.REVLOVER
})

function create(handgun: CreateHandGunDto): void {
  handGunStore.create.mutate(handgun)
  resetForm()
}
function edit(handgun: UpdateHandGunDto): void {
  handGunStore.edit.mutate(handgun)
}
function resetForm(): void {
  form.value = { ...initialForm }
  selectedPlates.value = []
  resetMultiselect.value = !resetMultiselect.value
  adjustableTriggerMinWeight.value = 0
  adjustableTriggerMaxWeight.value = 0
}
watchEffect(() => {
  if (handGun) {
    setEditForm(handGun)
    buttonLabel.value = 'global.edit'
  }
})
function setEditForm(handgun: HandGunDto) {
  form.value = {
    ...handgun,
    caliberId: handgun.caliber.id,
    barrelColorId: handgun.barrelColor ? handgun.barrelColor.id : null,
    buttColorId: handgun.buttColor ? handgun.buttColor.id : null,
    barrelTypeId: handgun.barrelType.id ?? 0,
    factoryId: handgun.factory.id ?? 0,
    buttMaterialId: handgun.buttMaterial ? handgun.buttMaterial.id : null,
    percussionTypeId: handgun.percussionType.id ?? 0,
    slideColorId: handgun.slideColor ? handgun.slideColor.id : null,
    triggerTypeId: handgun.triggerType ? handgun.triggerType.id : null,
    threadedSizeId: handgun.threadedSize ? handgun.threadedSize.id : null,
    slideMaterialId: handgun.slideMaterial ? handgun.slideMaterial.id : null,
    providedOpticReadyPlates: handgun.opticReadyPlates.length > 0 ? handgun.opticReadyPlates : [],
    typeId: handgun.type.id,
    categoryId: handgun.category.id
  }
  if (handgun.opticReadyPlates.length > 0) {
    selectedPlates.value = handgun.opticReadyPlates.map((or) => or.id)
  } else {
    selectedPlates.value = []
  }
}
</script>

<style scoped></style>
