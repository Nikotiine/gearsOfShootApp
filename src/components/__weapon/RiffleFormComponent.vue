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
          type="caliber"
          @option-id="(event) => (form.caliberId = event)"
          required
          filter
        />
        <input-group-addon-open-drawer-button type="caliber" :open-drawer="openDrawer" />
      </InputGroup>

      <InputGroup>
        <input-group-required-icon :is-validate="form.factoryId > 0" />
        <input-group-select
          :options="store.prerequisitesWeaponList.data.data.factories"
          type="factory"
          @option-id="(event) => (form.factoryId = event)"
          required
          filter
        />
        <input-group-addon-open-drawer-button type="factory" :open-drawer="openDrawer" />
      </InputGroup>

      <InputGroup>
        <input-group-required-icon :is-validate="form.name.length >= 3" />
        <input-group-text
          @value="(value) => (form.name = value)"
          :min-length="3"
          placeholder="weaponModel"
          label="weaponModel"
          required
        />
      </InputGroup>

      <InputGroup>
        <input-group-optional-icon :is-completed="form.variation.length > 0" />
        <input-group-text
          @value="(value) => (form.variation = value)"
          placeholder="weaponVariation"
          label="weaponVariation"
        />
      </InputGroup>

      <InputGroup>
        <input-group-required-icon :is-validate="form.percussionTypeId > 0" />
        <input-group-select
          :options="store.prerequisitesWeaponList.data.data.percussionTypes"
          type="percussion"
          @option-id="(event) => (form.percussionTypeId = event)"
          required
        />
      </InputGroup>

      <InputGroup>
        <input-group-required-icon :is-validate="form.barrelTypeId > 0" />
        <input-group-select
          :options="store.prerequisitesWeaponList.data.data.barreTypes"
          type="barrelType"
          @option-id="(event) => (form.barrelTypeId = event)"
          required
        />
      </InputGroup>

      <InputGroup>
        <input-group-required-icon :is-validate="form.barrelLength >= 3" />
        <input-group-number
          :min="3"
          :min-fraction-digits="2"
          placeholder="barrelLength"
          label="barrelLength"
          required
          @value="(value) => (form.barrelLength = value)"
        />
        <InputGroupAddon><span>cm</span></InputGroupAddon>
      </InputGroup>

      <InputGroup>
        <input-group-optional-icon :is-completed="form.barrelSize > 0" />
        <input-group-number
          placeholder="barrelSize"
          label="barrelSize"
          @value="(value) => (form.barrelSize = value)"
        />
        <InputGroupAddon><span>mm</span></InputGroupAddon>
      </InputGroup>

      <InputGroup>
        <input-group-optional-icon :is-completed="form.barrelColorId > 0" />
        <input-group-select
          :options="colors$"
          type="barrelColor"
          @option-id="(event) => (form.barrelColorId = event)"
          filter
        />
        <input-group-addon-open-drawer-button type="color" :open-drawer="openDrawer" />
      </InputGroup>

      <InputGroup>
        <input-group-optional-icon :is-completed="form.threadedSizeId > 0" />
        <InputGroupAddon class="min-width-6rem">
          <Checkbox id="isThreadedBarrel" v-model="form.isThreadedBarrel" :binary="true" />
          <label for="isThreadedBarrel" :class="form.isThreadedBarrel ? checkedTextColor : ''">
            {{ t('weapon.form.isThreadedBarrel') }}
          </label>
        </InputGroupAddon>
        <input-group-select
          :options="store.prerequisitesWeaponList.data.data.threadedSizes"
          type="threadSize"
          optionLabel="size"
          :disabled="!form.isThreadedBarrel"
          @option-id="(event) => (form.threadedSizeId = event)"
        />
        <input-group-addon-open-drawer-button type="threadSize" :open-drawer="openDrawer" />
      </InputGroup>

      <InputGroup>
        <input-group-optional-icon
          :is-completed="form.isAdjustableTrigger && !isInvalidMaxTriggerValue"
        />
        <InputGroupAddon>
          <Checkbox id="isAdjustableTrigger" v-model="form.isAdjustableTrigger" :binary="true" />
          <label
            for="isAdjustableTrigger"
            :class="form.isAdjustableTrigger ? checkedTextColor : ''"
            >{{ t('weapon.form.isAdjustableTrigger') }}</label
          >
        </InputGroupAddon>
        <InputGroupAddon>{{ t('global.from') }}</InputGroupAddon>
        <InputNumber
          :minFractionDigits="2"
          v-model="adjustableTriggerMinWeight"
          :disabled="!form.isAdjustableTrigger"
          :invalid="isInvalidMinTriggerValue"
        />
        <InputGroupAddon>{{ t('global.to') }}</InputGroupAddon>
        <InputNumber
          :minFractionDigits="2"
          v-model="adjustableTriggerMaxWeight"
          :disabled="!form.isAdjustableTrigger"
          :invalid="isInvalidMaxTriggerValue"
        />
        <InputGroupAddon>kg</InputGroupAddon>
      </InputGroup>

      <InputGroup>
        <input-group-optional-icon />
        <InputGroupAddon>
          <Checkbox id="isProvidedMagazine" v-model="isProvidedMagazine" :binary="true" />
          <label for="isProvidedMagazine" :class="isProvidedMagazine ? checkedTextColor : ''">
            {{ t('weapon.form.isProvidedMagazine') }}
          </label>
        </InputGroupAddon>
        <input-group-select
          :options="[]"
          type="magazine"
          :disabled="!isProvidedMagazine"
          @option-id="(event) => (form.providedMagazineId = event)"
        />
        <InputGroupAddon
          ><span :class="isProvidedMagazine ? checkedTextColor : ''">
            {{ t('global.quantity') }}</span
          ></InputGroupAddon
        >
        <InputNumber
          :minFractionDigits="0"
          v-model="form.providedMagazineQuantity"
          :disabled="!isProvidedMagazine"
        />
      </InputGroup>

      <InputGroup>
        <input-group-optional-icon :is-completed="form.buttMaterialId > 0" />
        <input-group-select
          :options="materials$"
          type="buttType"
          @option-id="(event) => (form.buttMaterialId = event)"
        />
        <input-group-addon-open-drawer-button type="material" :open-drawer="openDrawer" />
      </InputGroup>

      <InputGroup class="w-full">
        <input-group-optional-icon />
        <InputGroupAddon class="min-width-6rem w-6/12">
          <Checkbox id="isAdjustableButt" v-model="form.isAdjustableButt" :binary="true" />
          <label for="isAdjustableButt" :class="form.isAdjustableButt ? checkedTextColor : ''">
            {{ t('weapon.form.isAdjustableButt') }}
          </label>
        </InputGroupAddon>
        <InputGroupAddon class="min-width-6rem w-6/12">
          <Checkbox id="isAdjustableBusk" v-model="form.isAdjustableBusk" :binary="true" />
          <label for="isAdjustableBusk" :class="form.isAdjustableBusk ? checkedTextColor : ''">
            {{ t('weapon.form.isAdjustableBusk') }}
          </label>
        </InputGroupAddon>
      </InputGroup>

      <InputGroup>
        <input-group-optional-icon :is-completed="form.buttColorId > 0" />
        <input-group-select
          :options="colors$"
          type="buttColor"
          @option-id="(event) => (form.buttColorId = event)"
          filter
        />
        <input-group-addon-open-drawer-button type="color" :open-drawer="openDrawer" />
      </InputGroup>

      <InputGroup>
        <input-group-optional-icon :is-completed="form.railSizeId > 0" />
        <input-group-select
          :options="railSizes$"
          type="opticRail"
          @option-id="(event) => (form.railSizeId = event)"
          filter
        />
      </InputGroup>

      <InputGroup>
        <input-group-optional-icon />
        <InputGroupAddon class="min-width-6rem w-1/3">
          <Checkbox id="isOpenAim" v-model="form.isOpenAim" :binary="true" />
          <label for="isOpenAim" :class="form.isOpenAim ? checkedTextColor : ''">
            {{ t('weapon.form.isOpenAim') }}
          </label>
        </InputGroupAddon>
        <InputGroupAddon class="min-width-6rem w-1/3">
          <Checkbox
            id="isAdjustableBackSight"
            v-model="form.isAdjustableBackSight"
            :binary="true"
          />
          <label
            for="isAdjustableBackSight"
            :class="form.isAdjustableBackSight ? checkedTextColor : ''"
          >
            {{ t('weapon.form.isAdjustableBackSight') }}
          </label>
        </InputGroupAddon>
        <InputGroupAddon class="min-width-6rem w-1/3">
          <Checkbox
            id="isAdjustableFrontSight"
            v-model="form.isAdjustableFrontSight"
            :binary="true"
          />
          <label
            for="isAdjustableFrontSight"
            :class="form.isAdjustableFrontSight ? checkedTextColor : ''"
          >
            {{ t('weapon.form.isAdjustableFrontSight') }}
          </label>
        </InputGroupAddon>
      </InputGroup>

      <InputGroup>
        <input-group-optional-icon />
        <IftaLabel>
          <InputNumber :minFractionDigits="0" v-model="form.qcSlot" id="qcSlot" />
          <label for="qcSlot" v-capitalize="t('weapon.form.qcSlot')"></label>
        </IftaLabel>

        <IftaLabel>
          <InputNumber :minFractionDigits="0" v-model="form.grenadierSlot" id="grenadierSlot" />
          <label for="grenadierSlot" v-capitalize="t('weapon.form.grenadierSlot')"></label>
        </IftaLabel>
      </InputGroup>

      <InputGroup>
        <input-group-optional-icon :is-completed="selectedMLockOptions.length > 0" />
        <InputGroupAddon class="min-width-6rem">
          <Checkbox id="isMlockCompatibility" v-model="form.isMlockCompatibility" :binary="true" />
          <label
            for="isMlockCompatibility"
            :class="form.isMlockCompatibility ? checkedTextColor : ''"
          >
            {{ t('weapon.form.isMlockCompatibility') }}
          </label>
        </InputGroupAddon>
        <IftaLabel>
          <MultiSelect
            v-model="selectedMLockOptions"
            :options="mLockOptions"
            optionLabel="name"
            :placeholder="t('global.select')"
            :maxSelectedLabels="3"
            id="mLockOptions"
            :disabled="!form.isMlockCompatibility"
            :invalid="isInvalidMLockOption"
          />
          <label for="mLockOptions" v-capitalize="t('weapon.form.mLockOptions')"></label>
        </IftaLabel>
      </InputGroup>
    </div>
    <div class="p-4">
      <Textarea
        v-model="form.description"
        autoResize
        rows="5"
        cols="30"
        class="w-full"
        :placeholder="t('weapon.form.description')"
      />
    </div>
    <div class="text-red-500 p-4" v-if="riffleStore.create.isError">
      <p class="text-xl font-bold">
        {{ t('error.' + riffleStore.create.error.response.data.message) }}
      </p>
    </div>
    <div class="text-center">
      <Button type="submit" :label="t('global.save')" :disabled="!isFormValid"></Button>
    </div>
  </form>
</template>
`
<script setup lang="ts">
import type { CreateRiffleDto } from '@/api/Api'
import InputGroupAddon from 'primevue/inputgroupaddon'
import Checkbox from 'primevue/checkbox'
import Button from 'primevue/button'
import { computed, ref } from 'vue'
import IftaLabel from 'primevue/iftalabel'
import InputGroup from 'primevue/inputgroup'
import { useI18n } from 'vue-i18n'
import InputNumber from 'primevue/inputnumber'
import MultiSelect from 'primevue/multiselect'

import { type FocusField, type NewWeapon, useWeaponStore } from '@/stores/weapon'
import Textarea from 'primevue/textarea'
import { storeToRefs } from 'pinia'
import { useRiffleStore } from '@/stores/riffle'
import InputGroupAddonOpenDrawerButton from '@/components/__form/InputGroupAddonOpenDrawerButton.vue'
import InputGroupRequiredIcon from '@/components/__form/InputGroupRequiredIcon.vue'
import InputGroupOptionalIcon from '@/components/__form/InputGroupOptionalIcon.vue'
import InputGroupSelect from '@/components/__form/InputGroupSelect.vue'
import InputGroupText from '@/components/__form/InputGroupText.vue'
import InputGroupNumber from '@/components/__form/InputGroupNumber.vue'

interface MlockOptions {
  name: string
}

const requiredLabel: string = '(*)'
const checkedTextColor: string = 'text-slate-500'
const store = useWeaponStore()
const riffleStore = useRiffleStore()
const { railSizes$, materials$, colors$ } = storeToRefs(store)
const { t } = useI18n()
const { selectedOptions, openDrawer } = defineProps<{
  selectedOptions: NewWeapon
  openDrawer: Function
}>()
const adjustableTriggerMinWeight = ref(0)
const adjustableTriggerMaxWeight = ref(0)
const isProvidedMagazine = ref(false)
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
  mLockOptions: '',
  barrelColorId: null,
  buttColorId: null
}

const form = ref<CreateRiffleDto>({ ...initialForm })
const mLockOptions = ref<MlockOptions[]>([
  {
    name: '3 Heures'
  },
  {
    name: '6 Heures'
  },
  {
    name: '9 Heures'
  }
])
const selectedMLockOptions = ref<MlockOptions[]>([])
const formatMLockOptions = () => {
  let concat = ''
  for (const selectedMLockOption of selectedMLockOptions.value) {
    concat += selectedMLockOption.name + ' '
  }
  return concat
}
const isFormValid = computed(() => {
  let isValid: boolean = false
  if (
    form.value.name &&
    form.value.caliberId > 0 &&
    form.value.factoryId > 0 &&
    form.value.barrelLength > 0 &&
    form.value.barrelTypeId &&
    form.value.percussionTypeId > 0 &&
    !isInvalidThreadSize.value &&
    !isInvalidMinTriggerValue.value &&
    !isInvalidMaxTriggerValue.value &&
    !isInvalidMaxTriggerValue.value
  ) {
    isValid = true
  }
  return isValid
})
const isInvalidThreadSize = computed(() => {
  return form.value.isThreadedBarrel && !form.value.threadedSizeId
})
const isFocusCaliber = ref<boolean>(false)
const isFocusFactory = ref<boolean>(false)
const isFocusName = ref<boolean>(false)
const isFocusPercussion = ref<boolean>(false)
const isFocusBarrelType = ref<boolean>(false)
const isFocusBarrelLength = ref<boolean>(false)
const isFocusOpticRail = ref<boolean>(false)

const onFocus = (origin: FocusField) => {
  switch (origin) {
    case 'caliber':
      isFocusCaliber.value = true
      break
    case 'factory':
      isFocusFactory.value = true
      break
    case 'name':
      isFocusName.value = true
      break
    case 'percussion':
      isFocusPercussion.value = true
      break
    case 'barrel':
      isFocusBarrelType.value = true
      break
    case 'barrelLength':
      isFocusBarrelLength.value = true
      break
    case 'opticRail':
      isFocusOpticRail.value = true
  }
}

const isInvalidBarrelLength = computed(() => {
  return isFocusBarrelLength.value && form.value.barrelLength === 0
})
const isInvalidMinTriggerValue = computed(() => {
  return form.value.isAdjustableTrigger && adjustableTriggerMinWeight.value < 0.1
})
const isInvalidMLockOption = computed(() => {
  return form.value.isMlockCompatibility && selectedMLockOptions.value.length === 0
})
const isInvalidMaxTriggerValue = computed(() => {
  return (
    form.value.isAdjustableTrigger &&
    adjustableTriggerMaxWeight.value <= adjustableTriggerMinWeight.value
  )
})
const submit = () => {
  form.value.mLockOptions = formatMLockOptions()
  console.log(form.value.caliberId)
  // riffleStore.create.mutate(form.value)
}
</script>

<style scoped>
.min-width-6rem {
  min-width: 6rem !important;
}
.width-14rem {
  width: 14rem !important;
}
.p-checkbox {
  margin-right: 0.5rem;
}
</style>
