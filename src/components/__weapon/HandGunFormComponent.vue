<template>
  <h3 class="text-center text-xl text-blue-500">{{ t('weapon.form.handgunFormTitle') }}</h3>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
    <InputGroup>
      <IftaLabel>
        <Select
          v-model="form.slideMaterialId"
          :options="materials"
          optionLabel="name"
          :placeholder="t('global.select')"
          optionValue="id"
          id="buttId"
        />
        <label for="buttId" v-capitalize="t('weapon.form.slideMaterial')"></label>
      </IftaLabel>
    </InputGroup>
    <InputGroup>
      <InputGroupAddon>
        <i class="pi pi-warehouse"></i>
      </InputGroupAddon>
      <IftaLabel>
        <Select
          id="slideColorId"
          v-model="form.slideColorId"
          :options="colors"
          filter
          optionLabel="name"
          optionValue="id"
          :placeholder="t('global.select')"
        />
        <label for="slideColorId" v-capitalize="t('weapon.form.slideColor')"></label>
      </IftaLabel>
    </InputGroup>
    <InputGroup>
      <IftaLabel>
        <Select
          v-model="form.buttMaterialId"
          :options="materials"
          optionLabel="name"
          :placeholder="t('global.select')"
          optionValue="id"
          id="buttId"
        />
        <label for="buttId" v-capitalize="t('weapon.form.handGunButtType')"></label>
      </IftaLabel>
    </InputGroup>
    <InputGroup>
      <InputGroupAddon>
        <i class="pi pi-warehouse"></i>
      </InputGroupAddon>
      <IftaLabel>
        <Select
          id="buttColorId"
          v-model="form.buttColorId"
          :options="colors"
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
        <i class="pi pi-warehouse"></i>
      </InputGroupAddon>
      <IftaLabel>
        <Select
          id="triggerTypeId"
          v-model="form.triggerTypeId"
          :options="triggerType"
          filter
          optionLabel="name"
          optionValue="id"
          :placeholder="t('global.select')"
        />
        <label for="triggerTypeId" v-capitalize="t('weapon.form.triggerType')"></label>
      </IftaLabel>
    </InputGroup>
    <InputGroup>
      <InputGroupAddon class="min-width-6rem">
        <Checkbox id="isOpticReady" v-model="form.isOpticReady" :binary="true" />
        <label for="isOpticReady" class="ml-2">
          {{ t('weapon.form.isOpticReady') }}
        </label>
      </InputGroupAddon>
      <IftaLabel>
        <MultiSelect
          id="opticReadyPlate"
          v-model="selectedPlate"
          :options="plates"
          optionLabel="name"
          filter
          placeholder="Select Cities"
          :maxSelectedLabels="3"
          class="w-full md:w-80"
        />
        <label for="opticReadyPlate" v-capitalize="t('weapon.form.opticReadyPlate')"></label>
      </IftaLabel>
      <InputGroupAddon class="min-width-6rem">
        <Checkbox id="isOpticReady" v-model="form.isOpticReady" :binary="true" />
        <label for="isOpticReady" class="ml-2">
          {{ t('weapon.form.isOpticReady') }}
        </label>
      </InputGroupAddon>
      <InputGroupAddon class="min-width-6rem">
        <Checkbox id="isOpticReady" v-model="form.isOpticReady" :binary="true" />
        <label for="isOpticReady" class="ml-2">
          {{ t('weapon.form.isOpticReady') }}
        </label>
      </InputGroupAddon>
    </InputGroup>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type {
  ColorDto,
  CreateWeaponDto,
  MaterialDto,
  OpticReadyPlateDto,
  WeaponTriggerTypeDto
} from '@/api/Api'
import InputGroup from 'primevue/inputgroup'
import Checkbox from 'primevue/checkbox'
import MultiSelect from 'primevue/multiselect'
import IftaLabel from 'primevue/iftalabel'
import Select from 'primevue/select'
import InputGroupAddon from 'primevue/inputgroupaddon'
import { ref } from 'vue'
const { partialForm } = defineProps<{
  partialForm: Partial<CreateWeaponDto>
  materials: MaterialDto[]
  colors: ColorDto[]
  triggerType: WeaponTriggerTypeDto[]
  plates: OpticReadyPlateDto[]
}>()
const { t } = useI18n()
const selectedPlate = ref([])
const form = ref<Partial<CreateWeaponDto>>({ ...partialForm })
</script>

<style scoped></style>
