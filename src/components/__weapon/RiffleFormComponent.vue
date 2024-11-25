<template>
  <h3 class="text-center text-xl text-blue-500">{{ t('weapon.form.riffleFormTitle') }}</h3>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4" id="riffleForm">
    <InputGroup>
      <IftaLabel>
        <Select
          v-model="form.buttId"
          :options="buttTypes"
          optionLabel="name"
          :placeholder="t('global.select')"
          optionValue="id"
          id="buttId"
        />
        <label for="buttId" v-capitalize="t('weapon.form.buttType')"></label>
      </IftaLabel>
      <InputGroupAddon class="min-width-6rem">
        <Checkbox id="isAdjustableButt" v-model="form.isAdjustableButt" :binary="true" />
        <label for="isAdjustableButt" class="ml-2">
          {{ t('weapon.form.isAdjustableButt') }}
        </label>
      </InputGroupAddon>
      <InputGroupAddon class="min-width-6rem">
        <Checkbox id="isAdjustableBusk" v-model="form.isAdjustableBusk" :binary="true" />
        <label for="isAdjustableBusk" class="ml-2">
          {{ t('weapon.form.isAdjustableBusk') }}
        </label>
      </InputGroupAddon>
    </InputGroup>

    <InputGroup>
      <IftaLabel>
        <Select
          v-model="form.railSizeId"
          :options="railSizes"
          :placeholder="t('global.select')"
          id="railSizeId"
          optionValue="id"
          optionLabel="name"
        />
        <label for="railSizeId" v-capitalize="t('weapon.form.railSize')"></label>
      </IftaLabel>
      <InputGroupAddon class="min-width-6rem">
        <Checkbox id="isOpenAim" v-model="form.isOpenAim" :binary="true" />
        <label for="isOpenAim" class="ml-2">
          {{ t('weapon.form.isOpenAim') }}
        </label>
      </InputGroupAddon>
      <InputGroupAddon class="min-width-6rem">
        <Checkbox id="isAdjustableBackSight" v-model="form.isAdjustableBackSight" :binary="true" />
        <label for="isAdjustableBackSight" class="ml-2">
          {{ t('weapon.form.isAdjustableBackSight') }}
        </label>
      </InputGroupAddon>
      <InputGroupAddon class="min-width-6rem">
        <Checkbox
          id="isAdjustableFrontSight"
          v-model="form.isAdjustableFrontSight"
          :binary="true"
        />
        <label for="isAdjustableFrontSight" class="ml-2">
          {{ t('weapon.form.isAdjustableFrontSight') }}
        </label>
      </InputGroupAddon>
    </InputGroup>
    <InputGroup>
      <InputGroupAddon>
        <i class="pi pi-circle"></i>
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
      <InputGroupAddon class="min-width-6rem">
        <Checkbox id="isMlockCompatibility" v-model="form.isMlockCompatibility" :binary="true" />
        <label for="isMlockCompatibility" class="ml-2">
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
        />
        <label for="mLockOptions" v-capitalize="t('weapon.form.mLockOptions')"></label>
      </IftaLabel>
    </InputGroup>
  </div>
</template>
`
<script setup lang="ts">
import type { CreateWeaponDto, RailSizeDto, WeaponButtTypeDto } from '@/api/Api'
import InputGroupAddon from 'primevue/inputgroupaddon'
import Checkbox from 'primevue/checkbox'

import { ref } from 'vue'
import Select from 'primevue/select'
import IftaLabel from 'primevue/iftalabel'
import InputGroup from 'primevue/inputgroup'
import { useI18n } from 'vue-i18n'
import InputNumber from 'primevue/inputnumber'

import MultiSelect from 'primevue/multiselect'

const { t } = useI18n()
const { partialForm, railSizes } = defineProps<{
  partialForm: Partial<CreateWeaponDto>
  railSizes: RailSizeDto[]
  buttTypes: WeaponButtTypeDto[]
}>()
const form = ref<Partial<CreateWeaponDto>>({ ...partialForm })
const mLockOptions = ref([
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
const selectedMLockOptions = ref('')
</script>

<style scoped>
.min-width-6rem {
  min-width: 6rem !important;
}
</style>
