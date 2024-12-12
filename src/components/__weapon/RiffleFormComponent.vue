<template>
  <form @submit.prevent="submit">
    <div
      class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4"
      id="riffleForm"
      v-if="store.prerequisitesWeaponList.isSuccess"
    >
      <InputGroup>
        <InputGroupAddon>
          <i :class="form.caliberId > 0 ? 'pi pi-check text-green-400' : 'pi pi-circle'"></i>
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
          <i :class="form.factoryId > 0 ? 'pi pi-check text-green-400' : 'pi pi-circle'"></i>
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
          <i :class="form.name.length > 2 ? 'pi pi-check text-green-400' : 'pi pi-circle'"></i>
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
          <i :class="form.percussionTypeId > 0 ? 'pi pi-check text-green-400' : 'pi pi-circle'"></i>
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
          <InputGroupAddon>{{ t('global.quantity') }}</InputGroupAddon>
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
            v-model="form.buttMaterialId"
            :options="materials$"
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
        <IftaLabel>
          <Select
            v-model="form.railSizeId"
            :options="railSizes$"
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
          <Checkbox
            id="isAdjustableBackSight"
            v-model="form.isAdjustableBackSight"
            :binary="true"
          />
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
import { type NewWeapon, useWeaponStore } from '@/stores/weapon'
import Textarea from 'primevue/textarea'
import { storeToRefs } from 'pinia'

import { useRiffleStore } from '@/stores/riffle'
interface MlockOptions {
  name: string
}
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
  buttMaterialId: 0,
  grenadierSlot: 0,
  isAdjustableBackSight: false,
  isAdjustableBusk: false,
  isAdjustableButt: false,
  isAdjustableFrontSight: false,
  isMlockCompatibility: false,
  isOpenAim: true,
  qcSlot: 0,
  railSizeId: 0,
  mLockOptions: '',
  barrelColorId: 0,
  buttColorId: 0
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
    form.value.percussionTypeId > 0
  ) {
    isValid = true
  }
  return isValid
})
const submit = () => {
  form.value.mLockOptions = formatMLockOptions()
  riffleStore.create.mutate(form.value)
}
</script>

<style scoped>
.min-width-6rem {
  min-width: 6rem !important;
}
</style>
