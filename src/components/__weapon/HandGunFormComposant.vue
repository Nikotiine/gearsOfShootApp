<template>
  <h3 class="text-center text-xl text-blue-500">{{ t('weapon.form.handgunFormTitle') }}</h3>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
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
        <label for="buttId" v-capitalize="t('weapon.form.breech')"></label>
      </IftaLabel>
    </InputGroup>
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
        <label for="buttId" v-capitalize="t('weapon.form.handGunButtType')"></label>
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
        <Select
          v-model="form.buttId"
          :options="buttTypes"
          optionLabel="name"
          :placeholder="t('global.select')"
          optionValue="id"
          id="buttId"
        />
        <label for="buttId" v-capitalize="t('weapon.form.handGunButtType')"></label>
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
import type { CreateWeaponDto, WeaponButtTypeDto } from '@/api/Api'
import InputGroup from 'primevue/inputgroup'
import Checkbox from 'primevue/checkbox'
import IftaLabel from 'primevue/iftalabel'
import Select from 'primevue/select'
import InputGroupAddon from 'primevue/inputgroupaddon'
import { ref } from 'vue'
const { partialForm } = defineProps<{
  partialForm: Partial<CreateWeaponDto>

  buttTypes: WeaponButtTypeDto[]
}>()
const { t } = useI18n()
const form = ref<Partial<CreateWeaponDto>>({ ...partialForm })
</script>

<style scoped></style>
