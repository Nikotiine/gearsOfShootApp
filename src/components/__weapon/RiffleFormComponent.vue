<template>
  <form @submit.prevent="submit">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4" v-if="storesAreLoaded">
      <InputGroup>
        <input-group-required-icon :is-validate="form.caliberId > 0" />
        <input-group-select
          :options="calibers$"
          label="global.caliber"
          @option-id="(event) => (form.caliberId = event)"
          required
          filter
          input-id="caliberId"
          :initial-value="form.caliberId"
        />
        <input-group-addon-open-drawer-button type="caliber" />
      </InputGroup>

      <InputGroup>
        <input-group-required-icon :is-validate="form.factoryId > 0" />
        <input-group-select
          :options="factories$"
          label="global.factory"
          @option-id="(event) => (form.factoryId = event)"
          required
          filter
          input-id="factoryId"
          :initial-value="form.factoryId"
        />
        <input-group-addon-open-drawer-button type="factory" factory-type="weapon" />
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
          placeholder="weapon.common.barrelLength"
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
          placeholder="weapon.common.barrelSize"
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
        <input-group-addon-open-drawer-button type="color" />
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
          :options="threadedSizes$"
          label="global.threadedSize"
          optionLabel="size"
          :disabled="!form.isThreadedBarrel"
          @option-id="(event) => (form.threadedSizeId = event)"
          input-id="threadedSizeId"
          :initial-value="form.threadedSizeId ?? 0"
        />
        <input-group-addon-open-drawer-button type="threadSize" />
      </InputGroup>

      <InputGroup>
        <input-group-optional-icon />
        <input-group-check-box
          input-id="isProvidedMagazine"
          label="weapon.form.isProvidedMagazine"
          @checked="findMagazinesWithFactory"
          :checked="isProvidedMagazine"
          :disabled="form.factoryId === 0"
        />
        <input-group-select
          :options="magazines$"
          label="weapon.form.magazine"
          :disabled="!isProvidedMagazine"
          option-label="reference"
          @option-id="(event) => (form.providedMagazineId = event)"
          input-id="providedMagazineId"
          :initial-value="form.providedMagazineId ?? 0"
        />
        <input-group-addon-open-drawer-button type="magazine" />
      </InputGroup>

      <InputGroup>
        <input-group-optional-icon />
        <InputGroupAddon
          ><span v-capitalize="t('global.quantity')" class="mx-4"></span
        ></InputGroupAddon>
        <input-group-number
          label="weapon.common.providedMagazineQuantity"
          @value="(value) => (form.providedMagazineQuantity = value)"
          input-id="providedMagazineQuantity"
          :disabled="!isProvidedMagazine"
          :initial-value="form.providedMagazineQuantity"
        />
        <input-group-addon-open-drawer-button type="magazine" />
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
          placeholder="weapon.common.adjustableTriggerMinWeight"
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
          placeholder="weapon.common.adjustableTriggerMaxWeight"
          label="weapon.common.adjustableTriggerMaxWeight"
          :disabled="!form.isAdjustableTrigger"
          @value="(value) => (adjustableTriggerMaxWeight = value)"
          input-id="adjustableTriggerMaxWeight"
          :max-width="33"
          :initial-value="adjustableTriggerMaxWeight"
        />
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
        <input-group-addon-open-drawer-button type="material" />
      </InputGroup>

      <InputGroup class="w-full">
        <input-group-optional-icon />
        <input-group-check-box
          input-id="isAdjustableButt"
          label="weapon.common.isAdjustableButt"
          @checked="(event) => (form.isAdjustableButt = event)"
          :checked="form.isAdjustableButt"
          is-width-half-size
        />
        <input-group-check-box
          input-id="isAdjustableBusk"
          label="weapon.common.isAdjustableBusk"
          @checked="(event) => (form.isAdjustableBusk = event)"
          :checked="form.isAdjustableBusk"
          is-width-half-size
        />
      </InputGroup>

      <InputGroup>
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
      </InputGroup>

      <InputGroup>
        <input-group-optional-icon :is-completed="form.railSizeId > 0" />
        <input-group-select
          :options="railSizes$"
          label="weapon.common.opticRail"
          @option-id="(event) => (form.railSizeId = event)"
          filter
          input-id="railSizeId"
          :initial-value="form.railSizeId ?? 0"
        />
      </InputGroup>

      <InputGroup>
        <input-group-optional-icon />

        <input-group-check-box
          input-id="isOpenAim"
          label="weapon.common.isOpenAim"
          @checked="(event) => (form.isOpenAim = event)"
          :checked="form.isOpenAim"
          is-width-half-size
        />
        <input-group-check-box
          input-id="isAdjustableBackSight"
          label="weapon.common.isAdjustableBackSight"
          @checked="(event) => (form.isAdjustableBackSight = event)"
          :checked="form.isAdjustableBackSight"
          is-width-half-size
        />
        <input-group-check-box
          input-id="isAdjustableFrontSight"
          label="weapon.common.isAdjustableFrontSight"
          @checked="(event) => (form.isAdjustableFrontSight = event)"
          :checked="form.isAdjustableFrontSight"
          is-width-half-size
        />
      </InputGroup>

      <InputGroup>
        <input-group-optional-icon />
        <input-group-number
          label="weapon.common.qcSlot"
          @value="(value) => (form.qcSlot = value)"
          input-id="qcSlot"
          :initial-value="form.qcSlot"
        />
        <input-group-number
          label="weapon.common.grenadierSlot"
          @value="(value) => (form.grenadierSlot = value)"
          input-id="grenadierSlot"
          :initial-value="form.grenadierSlot"
        />
      </InputGroup>

      <InputGroup>
        <input-group-optional-icon :is-completed="selectedMLockOptions.length > 0" />
        <input-group-check-box
          input-id="isMlockCompatibility"
          label="weapon.common.isMlockCompatibility"
          @checked="(event) => (form.isMlockCompatibility = event)"
          :checked="form.isMlockCompatibility"
        />
        <input-group-multi-select
          input-id="mLockOptions"
          label="weapon.common.mLockOptions"
          :options="store.prerequisitesWeaponList.data.data.mLockOptions"
          :disabled="!form.isMlockCompatibility"
          :invalid="isInvalidMLockOption"
          @selected-options="(event) => (selectedMLockOptions = event)"
          :clear="resetMultiselect"
          :initial-value="selectedMLockOptions"
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
import type { CreateRiffleDto, MLockOptionDto, RiffleDto, UpdateRiffleDto } from '@/api/Api'
import InputGroupAddon from 'primevue/inputgroupaddon'
import Button from 'primevue/button'
import { computed, ref, watchEffect } from 'vue'
import InputGroup from 'primevue/inputgroup'
import { useI18n } from 'vue-i18n'
import { type NewWeapon, useWeaponStore } from '@/stores/weapon'
import Textarea from 'primevue/textarea'
import { storeToRefs } from 'pinia'
import { useRiffleStore } from '@/stores/riffle'
import InputGroupAddonOpenDrawerButton from '@/components/__form/InputGroupAddonOpenDrawerButton.vue'
import InputGroupRequiredIcon from '@/components/__form/InputGroupRequiredIcon.vue'
import InputGroupOptionalIcon from '@/components/__form/InputGroupOptionalIcon.vue'
import InputGroupSelect from '@/components/__form/InputGroupSelect.vue'
import InputGroupText from '@/components/__form/InputGroupText.vue'
import InputGroupNumber from '@/components/__form/InputGroupNumber.vue'
import InputGroupCheckBox from '@/components/__form/InputGroupCheckBox.vue'
import InputGroupMultiSelect from '@/components/__form/InputGroupMultiSelect.vue'
import { useWeaponMagazineStore } from '@/stores/weapon-magazine'
import { useCaliberStore } from '@/stores/caliber'
import { useFactoryStore } from '@/stores/factory'
import { useThreadedSizeStore } from '@/stores/threadedSize'
import { useColorStore } from '@/stores/color'
import { useMaterialStore } from '@/stores/material'

const store = useWeaponStore()
const riffleStore = useRiffleStore()
const magazineStore = useWeaponMagazineStore()
const caliberStore = useCaliberStore()
const factoryStore = useFactoryStore()
const threadedSizeStore = useThreadedSizeStore()
const colorStore = useColorStore()
const materialStore = useMaterialStore()
const { railSizes$ } = storeToRefs(store)
const { calibers$ } = storeToRefs(caliberStore)
const { factories$ } = storeToRefs(factoryStore)
const { magazines$ } = storeToRefs(magazineStore)
const { threadedSizes$ } = storeToRefs(threadedSizeStore)
const { colors$ } = storeToRefs(colorStore)
const { materials$ } = storeToRefs(materialStore)
const { t } = useI18n()
const buttonLabel = ref('global.save')
const isEditForm = ref<boolean>(false)
const { selectedOptions, riffle = null } = defineProps<{
  selectedOptions: NewWeapon
  riffle?: RiffleDto
}>()
const adjustableTriggerMinWeight = ref(0)
const adjustableTriggerMaxWeight = ref(0)
const isProvidedMagazine = ref(false)
const selectedMLockOptions = ref<MLockOptionDto[]>([])
const resetMultiselect = ref(false)

//*******************Init du formulaire*********************
const initialForm: CreateRiffleDto = {
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
 * Retourne les chageurs en lien avec la marque de l'arme choisi
 * TODO : Voir si on filtre aussi par calibre
 * @param check
 */
const findMagazinesWithFactory = (check: boolean) => {
  const selectedFactoryId = form.value.factoryId
  isProvidedMagazine.value = check
  const factory = factories$.value.find((f) => f.id === selectedFactoryId)
  magazineStore.setFactoryId(factory?.name)
  magazineStore.getByFactoryId.isSuccess
}

/**
 * Soummission du formulaire
 * Mert a jour les champs mlock et reglage de detente
 */
const submit = () => {
  form.value.mLockOptions = selectedMLockOptions.value
  form.value.adjustableTriggerValue = form.value.isAdjustableTrigger
    ? adjustableTriggerValue()
    : null
  isEditForm.value ? edit({ ...form.value, id: riffle.id }) : create(form.value)
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
    providedMagazineId: riffle.providedMagazine ? riffle.providedMagazine.id : null,
    typeId: riffle.type.id,
    categoryId: riffle.category.id,
    railSizeId: riffle.railSize ? riffle.railSize.id : null
  }
  selectedMLockOptions.value = riffle.mLockOptions ?? []
  buttonLabel.value = 'global.edit'
  isEditForm.value = true
}

/**
 * Verification que tout les store sont chager avant d'afficher la page
 */
const storesAreLoaded = computed(() => {
  return (
    caliberStore.getAll.isSuccess &&
    store.prerequisitesWeaponList.isSuccess &&
    factoryStore.getAll.isSuccess &&
    threadedSizeStore.getAll.isSuccess &&
    colorStore.getAll.isSuccess
  )
})
</script>

<style scoped></style>
