<template>
  <div class="card">
    <h2 class="text-center mt-2 text-2xl">
      {{ t('weapon.form.add') }} {{ selectedCategory?.name }}
    </h2>

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
              v-model="form.categoryId"
              :options="store.prerequisitesWeaponList.data?.data.categories"
              :placeholder="t('global.select')"
              id="categoryId"
              optionValue="id"
              optionLabel="name"
            />
            <label for="categoryId" v-capitalize="t('global.category')"></label>
          </IftaLabel>
        </InputGroup>
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
            <i class="pi pi-sort"></i>
          </InputGroupAddon>
          <IftaLabel>
            <Select
              v-model="form.typeId"
              :options="store.prerequisitesWeaponList.data.data.types"
              optionLabel="name"
              :placeholder="t('global.select')"
              optionValue="id"
              id="typeId"
            />
            <label for="typeId" v-capitalize="t('global.weaponType')"></label>
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
      </div>
      <riffle-form-component
        :partial-form="form"
        v-if="form.typeId > 0 && isRiffleWeapon.value"
        :rail-sizes="railSizes$"
        :butt-types="buttTypes$"
      />
      <hand-gun-form-composant
        v-if="form.typeId > 0 && !isRiffleWeapon.value"
        :butt-types="buttTypes$"
        :partial-form="form"
      />

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
      <div class="text-red-500 p-4" v-if="store.create.isError">
        <p class="text-xl font-bold">
          {{ t('error.' + store.create.error.response.data.message) }}
        </p>
      </div>

      <div class="text-center">
        <Button type="submit" :label="t('global.save')" :disabled="!isFormValid"></Button>
      </div>
    </form>
  </div>
</template>
<script setup lang="ts">
import Textarea from 'primevue/textarea'
import InputText from 'primevue/inputtext'
import InputGroupAddon from 'primevue/inputgroupaddon'
import Select from 'primevue/select'
import Button from 'primevue/button'
import Checkbox from 'primevue/checkbox'
import IftaLabel from 'primevue/iftalabel'
import InputGroup from 'primevue/inputgroup'
import InputNumber from 'primevue/inputnumber'
import { useWeaponStore } from '@/stores/weapon'
import { computed, ref } from 'vue'
import type { CreateWeaponDto, WeaponTypeDto } from '@/api/Api'
import { useI18n } from 'vue-i18n'
import { storeToRefs } from 'pinia'
import RiffleFormComponent from '@/components/__weapon/RiffleFormComponent.vue'
import HandGunFormComposant from '@/components/__weapon/HandGunFormComposant.vue'
const { t } = useI18n()
const store = useWeaponStore()
const { categories$, weaponTypes$, railSizes$, buttTypes$ } = storeToRefs(store)
const adjustableTriggerMinWeight = ref(0)
const adjustableTriggerMaxWeight = ref(0)
const isProvidedMagazine = ref(false)
const initialCreateWeaponFormObject: CreateWeaponDto = {
  typeId: 1,
  caliberId: 0,
  factoryId: 0,
  name: '',
  variation: '',
  barrelTypeId: 0,
  isThreadedBarrel: false,
  barrelLength: 0,
  threadedSizeId: null,
  isAdjustableTrigger: false,
  adjustableTriggerValue: triggerValue(),
  description: '',
  categoryId: 3,
  isOpticReady: false,
  percussionTypeId: 0,
  providedMagazineId: null,
  providedMagazineQuantity: 0,
  barrelSize: 0,
  buttId: 0,
  grenadierSlot: 0,
  isAdjustableBackSight: false,
  isAdjustableBusk: false,
  isAdjustableButt: false,
  isAdjustableFrontSight: false,
  isMlockCompatibility: false,
  isOpenAim: true,
  isPicatinyRailSlop: false,
  qcSlot: 0,
  railSizeId: 0
}
const form = ref<CreateWeaponDto>({
  ...initialCreateWeaponFormObject
})
const isFormValid = computed(() => {
  let isValid: boolean = false
  if (
    form.value.name &&
    form.value.typeId > 0 &&
    form.value.caliberId > 0 &&
    form.value.factoryId > 0 &&
    form.value.barrelLength > 0
  ) {
    isValid = true
  }
  return isValid
})
function triggerValue(): string {
  return `${adjustableTriggerMinWeight.value}-${adjustableTriggerMaxWeight.value} kg`
}
const submit = () => {
  store.create.mutate(form.value)
  form.value = { ...initialCreateWeaponFormObject }
}
const selectedCategory = computed(() => {
  return categories$.value.find((category) => category.id === form.value.categoryId)
})

const isRiffleWeapon = computed(() => {
  const isRiffleWeapon = ref<boolean>(true)
  const weaponType: WeaponTypeDto | undefined = weaponTypes$.value.find(
    (type) => type.id === form.value.typeId
  )

  if (weaponType && (weaponType.name === 'Pistolet' || weaponType.name === 'Revolver')) {
    isRiffleWeapon.value = false
  }
  return isRiffleWeapon
})
</script>

<style scoped>
.min-width-6rem {
  min-width: 6rem !important;
}
</style>
