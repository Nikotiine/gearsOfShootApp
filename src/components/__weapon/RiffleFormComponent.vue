<template>
  <form @submit.prevent="submit">
    <div
      class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4"
      id="riffleForm"
      v-if="store.prerequisitesWeaponList.isSuccess"
    >
      <InputGroup>
        <InputGroupAddon>
          <i
            :class="optionalFilledIcon"
            v-tooltip="'Enter your username'"
            @click="selectDrawerFormType('caliber')"
            class="cursor-pointer"
          ></i>
        </InputGroupAddon>

        <IftaLabel>
          <Select
            id="caliberId"
            v-model="form.caliberId"
            :options="store.prerequisitesWeaponList.data.data.calibers"
            optionLabel="name"
            optionValue="id"
            :placeholder="t('global.select')"
            @focus="onFocus('caliber')"
            :invalid="isInvalidCaliber"
            checkmark
            :highlightOnSelect="true"
          />
          <label for="caliberId" v-capitalize="t('global.caliber') + requiredLabel"></label>
        </IftaLabel>
      </InputGroup>

      <InputGroup>
        <InputGroupAddon>
          <i :class="form.factoryId > 0 ? validIcon : requiredIcon"></i>
        </InputGroupAddon>
        <IftaLabel>
          <Select
            id="factoryId"
            v-model="form.factoryId"
            :options="store.prerequisitesWeaponList.data.data.factories"
            filter
            optionLabel="name"
            optionValue="id"
            :placeholder="t('global.select')"
            checkmark
            :highlightOnSelect="true"
            @focus="onFocus('factory')"
            :invalid="isInvalidFactory"
          />
          <label for="factoryId" v-capitalize="t('global.factory') + requiredLabel"></label>
        </IftaLabel>
      </InputGroup>

      <InputGroup>
        <InputGroupAddon>
          <i :class="form.name.length < 3 ? requiredIcon : validIcon"></i>
        </InputGroupAddon>
        <IftaLabel>
          <InputText
            id="name"
            v-model="form.name"
            :placeholder="t('weapon.form.name')"
            @focus="onFocus('name')"
            :invalid="isInvalidName"
          />
          <label for="name" v-capitalize="t('global.model') + requiredLabel"></label>
        </IftaLabel>
      </InputGroup>

      <InputGroup>
        <InputGroupAddon>
          <i
            :class="form.variation && form.variation.length > 0 ? optionalFilledIcon : optionalIcon"
          ></i>
        </InputGroupAddon>
        <IftaLabel>
          <InputText
            id="variation"
            v-model="form.variation"
            :placeholder="t('weapon.form.variation')"
          />
          <label for="variation">{{ t('weapon.form.variation') }}</label>
        </IftaLabel>
      </InputGroup>

      <InputGroup>
        <InputGroupAddon>
          <i :class="form.percussionTypeId > 0 ? validIcon : requiredIcon"></i>
        </InputGroupAddon>
        <IftaLabel>
          <Select
            v-model="form.percussionTypeId"
            :options="store.prerequisitesWeaponList.data.data.percussionTypes"
            optionLabel="name"
            :placeholder="t('global.select')"
            optionValue="id"
            id="typeId"
            checkmark
            :highlightOnSelect="true"
            @focus="onFocus('percussion')"
            :invalid="isInvalidPercussion"
          />
          <label for="typeId">{{ t('weapon.form.percussionType') + requiredLabel }}</label>
        </IftaLabel>
      </InputGroup>

      <InputGroup>
        <InputGroupAddon>
          <i :class="form.barrelTypeId > 0 ? validIcon : requiredIcon"></i>
        </InputGroupAddon>
        <IftaLabel>
          <Select
            v-model="form.barrelTypeId"
            :options="store.prerequisitesWeaponList.data.data.barreTypes"
            optionLabel="name"
            :placeholder="t('global.select')"
            optionValue="id"
            id="barrelTypeId"
            checkmark
            :highlightOnSelect="true"
            @focus="onFocus('barrel')"
            :invalid="isInvalidBarrelType"
          />
          <label for="barrelTypeId">{{ t('weapon.form.barrelType') + requiredLabel }}</label>
        </IftaLabel>
      </InputGroup>

      <InputGroup>
        <InputGroupAddon>
          <i :class="form.barrelLength > 0 && form.barrelSize > 0 ? validIcon : requiredIcon"></i>
        </InputGroupAddon>
        <IftaLabel>
          <InputNumber
            v-model="form.barrelLength"
            :placeholder="t('weapon.form.length')"
            :minFractionDigits="2"
            id="barrelLength"
            @focus="onFocus('barrelLength')"
            :invalid="isInvalidBarrelLength"
          />
          <label for="barrelLength">{{ t('weapon.form.barrelLength') + requiredLabel }}</label>
        </IftaLabel>
        <InputGroupAddon><span class="text-black">cm</span></InputGroupAddon>
      </InputGroup>

      <InputGroup>
        <InputGroupAddon>
          <i :class="form.barrelSize > 0 ? optionalFilledIcon : optionalIcon"></i>
        </InputGroupAddon>
        <IftaLabel>
          <InputNumber
            v-model="form.barrelSize"
            :placeholder="t('weapon.form.barrelSize')"
            id="barrelSize"
          />
          <label for="barrelSize">{{ t('weapon.form.barrelSize') }}</label>
        </IftaLabel>
        <InputGroupAddon><span class="text-black">mm</span></InputGroupAddon>
      </InputGroup>

      <InputGroup>
        <InputGroupAddon>
          <i :class="form.barrelColorId ? optionalFilledIcon : optionalIcon"></i>
        </InputGroupAddon>
        <IftaLabel>
          <Select
            id="barrelColorId"
            v-model="form.barrelColorId"
            :options="colors$"
            filter
            checkmark
            :highlightOnSelect="true"
            optionLabel="name"
            optionValue="id"
            :placeholder="t('global.select')"
          />
          <label for="barrelColorId" v-capitalize="t('weapon.form.barrelColor')"></label>
        </IftaLabel>
      </InputGroup>

      <InputGroup>
        <InputGroupAddon>
          <i :class="form.threadedSizeId ? optionalFilledIcon : optionalIcon"></i>
        </InputGroupAddon>
        <InputGroupAddon class="min-width-6rem">
          <Checkbox id="isThreadedBarrel" v-model="form.isThreadedBarrel" :binary="true" />
          <label for="isThreadedBarrel" :class="form.isThreadedBarrel ? checkedTextColor : ''">
            {{ t('weapon.form.isThreadedBarrel') }}
          </label>
        </InputGroupAddon>
        <IftaLabel>
          <Select
            v-model="form.threadedSizeId"
            :options="store.prerequisitesWeaponList.data.data.threadedSizes"
            optionLabel="size"
            :placeholder="t('global.select')"
            optionValue="id"
            :disabled="!form.isThreadedBarrel"
            id="threadedSizeId"
            :invalid="isInvalidThreadSize"
          />
          <label for="threadedSizeId" v-capitalize="t('global.threadedSize')"></label>
        </IftaLabel>
      </InputGroup>

      <InputGroup>
        <InputGroupAddon>
          <i :class="optionalIcon"></i>
        </InputGroupAddon>
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
        <InputGroupAddon>
          <i :class="optionalIcon"></i>
        </InputGroupAddon>
        <InputGroupAddon>
          <Checkbox id="isProvidedMagazine" v-model="isProvidedMagazine" :binary="true" />
          <label for="isProvidedMagazine" :class="isProvidedMagazine ? checkedTextColor : ''">
            {{ t('weapon.form.isProvidedMagazine') }}
          </label>
        </InputGroupAddon>
        <IftaLabel class="width-14rem">
          <Select
            v-model="form.providedMagazineId"
            :options="[]"
            optionLabel="size"
            :placeholder="t('global.select')"
            optionValue="id"
            :disabled="!isProvidedMagazine"
            emptyMessage="Aucun chargeur trouvé"
            id="providedMagazineId"
          />
          <label for="providedMagazineId" v-capitalize="t('global.magazine')"></label>
        </IftaLabel>
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
        <InputGroupAddon>
          <i :class="form.buttMaterialId ? optionalFilledIcon : optionalIcon"></i>
        </InputGroupAddon>
        <IftaLabel>
          <Select
            v-model="form.buttMaterialId"
            :options="materials$"
            optionLabel="name"
            :placeholder="t('global.select')"
            optionValue="id"
            id="buttId"
          />
          <label for="buttId" v-capitalize="t('weapon.form.buttType')"></label>
        </IftaLabel>
      </InputGroup>

      <InputGroup class="w-full">
        <InputGroupAddon>
          <i :class="optionalFilledIcon"></i>
        </InputGroupAddon>
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
        <InputGroupAddon>
          <i :class="form.buttColorId ? optionalFilledIcon : optionalIcon"></i>
        </InputGroupAddon>
        <IftaLabel>
          <Select
            id="buttColorId"
            v-model="form.buttColorId"
            :options="colors$"
            filter
            optionLabel="name"
            optionValue="id"
            :placeholder="t('global.select')"
          />
          <label for="buttColorId" v-capitalize="t('weapon.form.buttColor')"></label>
        </IftaLabel>
      </InputGroup>
      <InputGroup>
        <InputGroupAddon>
          <i :class="form.railSizeId ? optionalFilledIcon : optionalIcon"></i>
        </InputGroupAddon>
        <IftaLabel>
          <Select
            v-model="form.railSizeId"
            :options="railSizes$"
            :placeholder="t('global.select')"
            id="railSizeId"
            optionValue="id"
            optionLabel="name"
            checkmark
            :highlightOnSelect="true"
            @focus="onFocus('opticRail')"
            :invalid="isInvalidOpticRail"
          />
          <label for="railSizeId" v-capitalize="t('weapon.form.railSize')"></label>
        </IftaLabel>
      </InputGroup>

      <InputGroup>
        <InputGroupAddon>
          <i :class="optionalFilledIcon"></i>
        </InputGroupAddon>
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
        <InputGroupAddon>
          <i :class="optionalFilledIcon"></i>
        </InputGroupAddon>
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
        <InputGroupAddon>
          <i :class="selectedMLockOptions.length > 0 ? optionalFilledIcon : optionalIcon"></i>
        </InputGroupAddon>
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
import Select from 'primevue/select'
import IftaLabel from 'primevue/iftalabel'
import InputGroup from 'primevue/inputgroup'
import { useI18n } from 'vue-i18n'
import InputNumber from 'primevue/inputnumber'
import MultiSelect from 'primevue/multiselect'
import InputText from 'primevue/inputtext'
import {
  type DrawerWeaponForm,
  type FocusField,
  type NewWeapon,
  useWeaponStore
} from '@/stores/weapon'
import Textarea from 'primevue/textarea'
import { storeToRefs } from 'pinia'
import { useRiffleStore } from '@/stores/riffle'

interface MlockOptions {
  name: string
}

const optionalIcon: string = 'pi pi-info-circle'
const optionalFilledIcon: string = 'pi pi-plus text-blue-700'
const requiredIcon: string = 'pi pi-circle-fill'
const requiredLabel: string = '(*)'
const validIcon: string = 'pi pi-check text-green-400'
const checkedTextColor: string = 'text-slate-500'
const store = useWeaponStore()
const riffleStore = useRiffleStore()
const { railSizes$, materials$, colors$ } = storeToRefs(store)
const { t } = useI18n()
const { selectedOptions } = defineProps<{
  selectedOptions: NewWeapon
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
const openDrawer = defineEmits(['openDrawer'])

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
const isInvalidCaliber = computed(() => {
  return isFocusCaliber.value && form.value.caliberId === 0
})
const isInvalidFactory = computed(() => {
  return isFocusFactory.value && form.value.factoryId === 0
})
const isInvalidName = computed(() => {
  return isFocusName.value && form.value.name.length < 3
})
const isInvalidPercussion = computed(() => {
  return isFocusPercussion.value && form.value.percussionTypeId === 0
})
const isInvalidBarrelType = computed(() => {
  return isFocusBarrelType.value && form.value.barrelTypeId === 0
})
const isInvalidOpticRail = computed(() => {
  return isFocusOpticRail.value && form.value.railSizeId === 0
})
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
  riffleStore.create.mutate(form.value)
}
const selectDrawerFormType = (drawerType: DrawerWeaponForm) => {
  openDrawer('openDrawer', drawerType)
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
