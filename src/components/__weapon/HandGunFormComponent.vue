<template>
  <form @submit.prevent="submit">
    <div
      class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4"
      v-if="store.prerequisitesWeaponList.isSuccess"
    >
      <InputGroup>
        <input-group-required-icon :is-validate="form.caliberId > 0" />
        <input-group-select
          :options="store.prerequisitesWeaponList.data.data.calibers"
          label="global.caliber"
          @option-id="(event) => (form.caliberId = event)"
          required
          filter
          input-id="caliberId"
          :initial-value="form.caliberId"
        />
        <input-group-addon-open-drawer-button type="caliber" :open-drawer="openDrawer" />
      </InputGroup>

      <InputGroup>
        <input-group-required-icon :is-validate="form.factoryId > 0" />
        <input-group-select
          :options="store.prerequisitesWeaponList.data.data.factories"
          label="global.factory"
          @option-id="(event) => (form.factoryId = event)"
          required
          filter
          input-id="factoryId"
          :initial-value="form.factoryId"
        />
        <input-group-addon-open-drawer-button type="factory" :open-drawer="openDrawer" />
      </InputGroup>

      <InputGroup>
        <input-group-required-icon :is-validate="form.name.length >= 3" />
        <input-group-text
          @value="(value) => (form.name = value)"
          :min-length="3"
          placeholder="global.model"
          label="weapon.form.weaponModel"
          required
          input-id="name"
          :initial-value="form.name"
        />
      </InputGroup>

      <InputGroup>
        <input-group-optional-icon :is-completed="form.variation.length > 0" />
        <input-group-text
          @value="(value) => (form.variation = value)"
          placeholder="global.variation"
          label="weapon.form.weaponVariation"
          input-id="variation"
          :initial-value="form.variation ?? undefined"
        />
      </InputGroup>

      <InputGroup>
        <input-group-required-icon :is-validate="form.percussionTypeId > 0" />
        <input-group-select
          :options="store.prerequisitesWeaponList.data.data.percussionTypes"
          label="global.percussionType"
          @option-id="(event) => (form.percussionTypeId = event)"
          required
          input-id="percussionTypeId"
          :initial-value="form.percussionTypeId"
        />
      </InputGroup>

      <InputGroup>
        <input-group-required-icon :is-validate="form.barrelTypeId > 0" />
        <input-group-select
          :options="store.prerequisitesWeaponList.data.data.barreTypes"
          label="weapon.common.barrelType"
          @option-id="(event) => (form.barrelTypeId = event)"
          required
          input-id="barrelTypeId"
          :initial-value="form.barrelTypeId"
        />
      </InputGroup>

      <InputGroup>
        <input-group-required-icon :is-validate="form.barrelLength >= 3" />
        <input-group-number
          :min="3"
          :min-fraction-digits="2"
          placeholder="global.length"
          label="weapon.common.barrelLength"
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
          placeholder="global.size"
          label="weapon.common.barrelSize"
          @value="(value) => (form.barrelSize = value)"
          input-id="barrelSize"
          :initial-value="form.barrelSize"
        />
        <InputGroupAddon><span>mm</span></InputGroupAddon>
      </InputGroup>

      <InputGroup>
        <input-group-optional-icon :is-completed="form.barrelColorId > 0" />
        <input-group-select
          :options="colors$"
          label="weapon.common.barrelColor"
          @option-id="(event) => (form.barrelColorId = event)"
          filter
          input-id="barrelColorId"
          :initial-value="form.barrelColorId ?? 0"
        />
        <input-group-addon-open-drawer-button type="color" :open-drawer="openDrawer" />
      </InputGroup>

      <InputGroup>
        <input-group-optional-icon :is-completed="form.threadedSizeId > 0" />
        <input-group-check-box
          input-id="isThreadedBarrel"
          label="weapon.form.isThreadedBarrel"
          @checked="(event) => (form.isThreadedBarrel = event)"
          :checked="form.isThreadedBarrel"
        />
        <input-group-select
          :options="store.prerequisitesWeaponList.data.data.threadedSizes"
          label="global.threadedSize"
          optionLabel="size"
          :disabled="!form.isThreadedBarrel"
          @option-id="(event) => (form.threadedSizeId = event)"
          input-id="threadedSizeId"
          :initial-value="form.threadedSizeId ?? 0"
        />
        <input-group-addon-open-drawer-button type="threadSize" :open-drawer="openDrawer" />
      </InputGroup>

      <InputGroup>
        <input-group-optional-icon />
        <input-group-check-box
          input-id="isProvidedMagazine"
          label="weapon.form.isProvidedMagazine"
          @checked="(event) => (isProvidedMagazine = event)"
          :checked="isProvidedMagazine"
          :disabled="isRevolver"
        />
        <input-group-select
          :options="[]"
          label="weapon.form.magazine"
          :disabled="!isProvidedMagazine"
          @option-id="(event) => (form.providedMagazineId = event)"
          input-id="providedMagazineId"
          :initial-value="form.providedMagazineId ?? 0"
        />
      </InputGroup>

      <InputGroup>
        <input-group-optional-icon />
        <InputGroupAddon
          ><span v-capitalize="t('global.quantity')" class="mx-4"></span
        ></InputGroupAddon>
        <input-group-number
          placeholder="global.quantity"
          label="weapon.common.providedMagazineQuantity"
          @value="(value) => (form.providedMagazineQuantity = value)"
          input-id="providedMagazineQuantity"
          :disabled="!isProvidedMagazine"
          :initial-value="form.providedMagazineQuantity"
        />
        <input-group-addon-open-drawer-button type="magazine" :open-drawer="openDrawer" />
      </InputGroup>

      <InputGroup>
        <input-group-optional-icon
          :is-completed="form.isAdjustableTrigger && !isInvalidMaxTriggerValue"
        />
        <input-group-check-box
          input-id="isAdjustableTrigger"
          label="weapon.common.isAdjustableTrigger"
          @checked="(event) => (form.isAdjustableTrigger = event)"
          :checked="form.isAdjustableTrigger"
        />
        <input-group-number
          :min="0.1"
          :min-fraction-digits="2"
          label="weapon.common.adjustableTriggerMinWeight"
          :disabled="!form.isAdjustableTrigger"
          @value="(value) => (adjustableTriggerMinWeight = value)"
          input-id="adjustableTriggerMinWeight"
          :max-width="33"
          :initial-value="adjustableTriggerMinWeight"
        />
        <input-group-number
          :min="adjustableTriggerMaxWeight + 0.1"
          :min-fraction-digits="2"
          label="weapon.common.adjustableTriggerMaxWeight"
          :disabled="!form.isAdjustableTrigger"
          @value="(value) => (adjustableTriggerMaxWeight = value)"
          input-id="adjustableTriggerMaxWeight"
          :max-width="33"
          :initial-value="adjustableTriggerMaxWeight"
        />
      </InputGroup>

      <InputGroup>
        <input-group-optional-icon :is-completed="form.triggerTypeId > 0" />
        <input-group-select
          :options="triggerTypes$"
          label="weapon.common.triggerType"
          filter
          @option-id="(event) => (form.triggerTypeId = event)"
          input-id="triggerTypeId"
          :initial-value="form.triggerTypeId ?? 0"
        />
      </InputGroup>

      <InputGroup>
        <input-group-optional-icon :is-completed="form.slideMaterialId > 0" />
        <input-group-select
          :options="materials$"
          label="weapon.common.slideMaterial"
          @option-id="(event) => (form.slideMaterialId = event)"
          input-id="slideMaterialId"
          :disabled="isRevolver"
          :initial-value="form.slideMaterialId ?? 0"
        />
        <input-group-addon-open-drawer-button type="material" :open-drawer="openDrawer" />
      </InputGroup>

      <InputGroup>
        <input-group-optional-icon :is-completed="form.slideColorId > 0" />
        <input-group-select
          :options="colors$"
          label="weapon.common.slideColor"
          @option-id="(event) => (form.slideColorId = event)"
          input-id="slideColorId"
          :disabled="isRevolver"
          :initial-value="form.slideColorId ?? 0"
        />
        <input-group-addon-open-drawer-button type="color" :open-drawer="openDrawer" />
      </InputGroup>

      <InputGroup>
        <input-group-optional-icon :is-completed="form.buttMaterialId > 0" />
        <input-group-select
          :options="materials$"
          label="weapon.common.buttMaterial"
          @option-id="(event) => (form.buttMaterialId = event)"
          input-id="buttMaterialId"
          :initial-value="form.buttMaterialId ?? 0"
        />
        <input-group-addon-open-drawer-button type="material" :open-drawer="openDrawer" />
      </InputGroup>

      <InputGroup>
        <input-group-optional-icon :is-completed="form.buttColorId > 0" />
        <input-group-select
          :options="colors$"
          label="weapon.common.buttColor"
          @option-id="(event) => (form.buttColorId = event)"
          input-id="buttColorId"
          :initial-value="form.buttColorId ?? 0"
        />
        <input-group-addon-open-drawer-button type="color" :open-drawer="openDrawer" />
      </InputGroup>

      <InputGroup>
        <input-group-optional-icon />
        <input-group-check-box
          input-id="isOpticReady"
          label="weapon.form.isOpticReady"
          @checked="(event) => (form.isOpticReady = event)"
          :checked="form.isOpticReady"
        />
        <input-group-multi-select
          input-id="opticReadyPlates"
          :options="opticReadyPlates$"
          :disabled="!form.isOpticReady"
          @selected-options="(event) => (selectedPlates = event)"
          :clear="resetMultiselect"
        />
      </InputGroup>

      <InputGroup class="w-full">
        <input-group-optional-icon />
        <input-group-check-box
          input-id="isExternalHammer"
          label="weapon.common.isExternalHammer"
          @checked="(event) => (form.isExternalHammer = event)"
          :checked="form.isExternalHammer"
          is-width-half-size
        />
        <input-group-check-box
          input-id="isPicatinyRailSlop"
          label="weapon.form.isPicatinyRailSlop"
          @checked="(event) => (form.isPicatinyRailSlop = event)"
          :checked="form.isPicatinyRailSlop"
          is-width-half-size
        />
        <input-group-check-box
          input-id="decocking"
          label="weapon.common.decocking"
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
import { type NewWeapon, useWeaponStore } from '@/stores/weapon'
import { storeToRefs } from 'pinia'
import { useHandGunStore } from '@/stores/hand-gun'
import InputGroupSelect from '@/components/__form/InputGroupSelect.vue'
import InputGroupAddonOpenDrawerButton from '@/components/__form/InputGroupAddonOpenDrawerButton.vue'
import InputGroupRequiredIcon from '@/components/__form/InputGroupRequiredIcon.vue'
import InputGroupText from '@/components/__form/InputGroupText.vue'
import InputGroupOptionalIcon from '@/components/__form/InputGroupOptionalIcon.vue'
import InputGroupNumber from '@/components/__form/InputGroupNumber.vue'
import InputGroupCheckBox from '@/components/__form/InputGroupCheckBox.vue'
import InputGroupMultiSelect from '@/components/__form/InputGroupMultiSelect.vue'

const store = useWeaponStore()
const handGunStore = useHandGunStore()

const { colors$, materials$, triggerTypes$, opticReadyPlates$, weaponTypes$ } = storeToRefs(store)
const {
  selectedOptions,
  openDrawer,
  handGun = null
} = defineProps<{
  selectedOptions: NewWeapon
  openDrawer: Function
  handGun?: HandGunDto
}>()
const { t } = useI18n()
const selectedPlates = ref([])
const buttonLabel = ref('global.save')
const adjustableTriggerMinWeight = ref(0)
const adjustableTriggerMaxWeight = ref(0)
const isProvidedMagazine = ref(false)
const initialForm: CreateHandGunDto = {
  typeId: selectedOptions.type,
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
  categoryId: selectedOptions.category,
  percussionTypeId: 0,
  providedMagazineId: null,
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
const isEditForm = ref<boolean>(false)
const submit = () => {
  form.value.providedOpticReadyPlates = form.value.isOpticReady ? selectedPlates.value : []
  form.value.adjustableTriggerValue = form.value.isAdjustableTrigger
    ? adjustableTriggerValue()
    : null
  //handGunStore.create.mutate(form.value)
  isEditForm.value ? edit({ ...form.value, id: handGun.id }) : create(form.value)
  // resetForm()
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
  let isRevolver: boolean = false
  const type = weaponTypes$.value.find((type) => type.id === selectedOptions.type)
  if (type && type.name === 'Revolver') {
    isRevolver = true
  }
  return isRevolver
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
    providedMagazineId: handgun.providedMagazine ? handgun.providedMagazine.id : null,
    providedOpticReadyPlates: handgun.opticReadyPlates.length > 0 ? handgun.opticReadyPlates : [],
    typeId: handgun.type.id,
    categoryId: handgun.category.id
  }
  buttonLabel.value = 'global.edit'
  isEditForm.value = true
}
</script>

<style scoped></style>
