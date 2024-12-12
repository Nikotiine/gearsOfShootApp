<template>
  <form @submit.prevent="submit">
    <div
      class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4"
      v-if="store.prerequisitesWeaponList.isSuccess"
    >
      <InputGroup>
        <InputGroupAddon>
          <i class="pi pi-circle"></i>
        </InputGroupAddon>

        <IftaLabel>
          <Select
            id="caliberId"
            v-model="form.caliberId"
            :options="store.prerequisitesWeaponList.data.data.calibers"
            optionLabel="name"
            optionValue="id"
            :placeholder="t('global.select')"
          />
          <label for="caliberId" v-capitalize="t('global.caliber')"></label>
        </IftaLabel>
      </InputGroup>

      <InputGroup>
        <InputGroupAddon>
          <i class="pi pi-warehouse"></i>
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
          />
          <label for="factoryId" v-capitalize="t('global.factory')"></label>
        </IftaLabel>
      </InputGroup>

      <InputGroup>
        <InputGroupAddon>
          <i class="pi pi-id-card"></i>
        </InputGroupAddon>
        <IftaLabel>
          <InputText id="name" v-model="form.name" :placeholder="t('weapon.form.name')" />
          <label for="name" v-capitalize="t('global.model')"></label>
        </IftaLabel>
      </InputGroup>

      <InputGroup>
        <InputGroupAddon>
          <i class="pi pi-receipt"></i>
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
          <i class="pi pi-sort"></i>
        </InputGroupAddon>
        <IftaLabel>
          <Select
            v-model="form.percussionTypeId"
            :options="store.prerequisitesWeaponList.data.data.percussionTypes"
            optionLabel="name"
            :placeholder="t('global.select')"
            optionValue="id"
            id="typeId"
          />
          <label for="typeId">{{ t('weapon.form.percussionType') }}</label>
        </IftaLabel>
      </InputGroup>

      <InputGroup>
        <InputGroupAddon>
          <i class="pi pi-sort"></i>
        </InputGroupAddon>
        <IftaLabel>
          <Select
            v-model="form.barrelTypeId"
            :options="store.prerequisitesWeaponList.data.data.barreTypes"
            optionLabel="name"
            :placeholder="t('global.select')"
            optionValue="id"
            id="barrelTypeId"
          />
          <label for="barrelTypeId">{{ t('weapon.form.barrelType') }}</label>
        </IftaLabel>
        <IftaLabel>
          <InputNumber
            v-model="form.barrelLength"
            :placeholder="t('weapon.form.length')"
            :minFractionDigits="2"
            id="barrelLength"
          />
          <label for="barrelLength">{{ t('weapon.form.barrelLength') }}</label>
        </IftaLabel>
        <InputGroupAddon>cm</InputGroupAddon>
        <IftaLabel>
          <InputNumber
            v-model="form.barrelSize"
            :placeholder="t('weapon.form.barrelSize')"
            id="barrelSize"
          />
          <label for="barrelSize">{{ t('weapon.form.barrelSize') }}</label>
        </IftaLabel>
        <InputGroupAddon>mm</InputGroupAddon>
      </InputGroup>

      <InputGroup>
        <InputGroupAddon class="min-width-6rem">
          <Checkbox id="isThreadedBarrel" v-model="form.isThreadedBarrel" :binary="true" />
          <label for="isThreadedBarrel" class="ml-2">
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
          />
          <label for="threadedSizeId" v-capitalize="t('global.threadedSize')"></label>
        </IftaLabel>
      </InputGroup>
      <InputGroup>
        <InputGroupAddon>
          <i class="pi pi-warehouse"></i>
        </InputGroupAddon>
        <IftaLabel>
          <Select
            id="barrelColorId"
            v-model="form.barrelColorId"
            :options="colors$"
            filter
            optionLabel="name"
            optionValue="id"
            :placeholder="t('global.select')"
          />
          <label for="barrelColorId" v-capitalize="t('weapon.form.barrelColor')"></label>
        </IftaLabel>
      </InputGroup>
      <InputGroup>
        <InputGroupAddon>
          <Checkbox id="isAdjustableTrigger" v-model="form.isAdjustableTrigger" :binary="true" />
          <label for="isAdjustableTrigger" class="ml-2">{{
            t('weapon.form.isAdjustableTrigger')
          }}</label>
        </InputGroupAddon>
        <InputGroupAddon>{{ t('global.from') }}</InputGroupAddon>
        <InputNumber
          :minFractionDigits="2"
          v-model="adjustableTriggerMinWeight"
          :disabled="!form.isAdjustableTrigger"
        />
        <InputGroupAddon>{{ t('global.to') }}</InputGroupAddon>
        <InputNumber
          :minFractionDigits="2"
          v-model="adjustableTriggerMaxWeight"
          :disabled="!form.isAdjustableTrigger"
        />
        <InputGroupAddon>kg</InputGroupAddon>
      </InputGroup>

      <InputGroup>
        <InputGroupAddon>
          <Checkbox id="isThreadedBarrel" v-model="isProvidedMagazine" :binary="true" />
          <label for="isThreadedBarrel" class="ml-2">
            {{ t('weapon.form.isProvidedMagazine') }}
          </label>
        </InputGroupAddon>
        <IftaLabel>
          <Select
            v-model="form.providedMagazineId"
            :options="store.prerequisitesWeaponList.data.data.threadedSizes"
            optionLabel="size"
            :placeholder="t('global.select')"
            optionValue="id"
            :disabled="!isProvidedMagazine"
            id="providedMagazineId"
          />
          <InputGroupAddon>quantite</InputGroupAddon>
          <InputNumber
            :minFractionDigits="0"
            v-model="form.providedMagazineQuantity"
            :disabled="!isProvidedMagazine"
          />
          <label for="providedMagazineId" v-capitalize="t('global.magazine')"></label>
        </IftaLabel>
      </InputGroup>
      <InputGroup>
        <IftaLabel>
          <Select
            v-model="form.slideMaterialId"
            :options="materials$"
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
            :options="colors$"
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
            :options="materials$"
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
          <i class="pi pi-warehouse"></i>
        </InputGroupAddon>
        <IftaLabel>
          <Select
            id="triggerTypeId"
            v-model="form.triggerTypeId"
            :options="triggerTypes$"
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
            :options="opticReadyPlates$"
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
    <div class="text-red-500 p-4" v-if="handGunStore.create.isError">
      <p class="text-xl font-bold">
        {{ t('error.' + handGunStore.create.error.response.data.message) }}
      </p>
    </div>
    <div class="text-center">
      <Button type="submit" :label="t('global.save')"></Button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { CreateHandGunDto } from '@/api/Api'
import InputGroup from 'primevue/inputgroup'
import Checkbox from 'primevue/checkbox'
import MultiSelect from 'primevue/multiselect'
import IftaLabel from 'primevue/iftalabel'
import Select from 'primevue/select'
import InputGroupAddon from 'primevue/inputgroupaddon'
import { ref } from 'vue'
import Button from 'primevue/button'
import Textarea from 'primevue/textarea'
import InputNumber from 'primevue/inputnumber'
import InputText from 'primevue/inputtext'

import { type NewWeapon, useWeaponStore } from '@/stores/weapon'
import { storeToRefs } from 'pinia'
import { useHandGunStore } from '@/stores/hand-gun'
const store = useWeaponStore()
const handGunStore = useHandGunStore()
const { colors$, materials$, triggerTypes$, opticReadyPlates$ } = storeToRefs(store)
const { selectedOptions } = defineProps<{
  selectedOptions: NewWeapon
}>()
const { t } = useI18n()
const selectedPlate = ref([])
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
  buttMaterialId: 0,
  barrelColorId: 0,
  buttColorId: 0,
  decocking: true,
  isPicatinyRailSlop: false,
  isAdjustableBackSight: true,
  isAdjustableFrontSight: true,
  providedOpticReadyPlates: [],
  isOpticReady: false,
  isExternalHammer: false,
  slideMaterialId: 0,
  slideColorId: 0,
  triggerTypeId: 0
}
const form = ref<CreateHandGunDto>({ ...initialForm })
const submit = () => {
  console.log(form.value)
  handGunStore.create.mutate(form.value)
}
</script>

<style scoped></style>
