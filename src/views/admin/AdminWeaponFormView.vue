<template>
  <div class="">
    <h2 class="text-center mt-2 text-2xl">Ajouter une arme de Categorie {{ category }}</h2>
    <form @submit.prevent="submit">
      <div
        class="card grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 p-4"
        v-if="prerequisitesWeaponList.isSuccess"
      >
        <InputGroup>
          <InputGroupAddon>
            <i class="pi pi-circle"></i>
          </InputGroupAddon>

          <IftaLabel>
            <Select
              id="caliberId"
              v-model="form.caliberId"
              :options="prerequisitesWeaponList.data.data.calibers"
              optionLabel="name"
              optionValue="id"
              placeholder="Selectionnez"
            />
            <label for="caliberId">Calibre</label>
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
              :options="prerequisitesWeaponList.data.data.factories"
              filter
              optionLabel="name"
              optionValue="id"
              placeholder="Marque"
            />
            <label for="factoryId">Marque</label>
          </IftaLabel>
        </InputGroup>

        <InputGroup>
          <InputGroupAddon>
            <i class="pi pi-id-card"></i>
          </InputGroupAddon>
          <IftaLabel>
            <InputText id="name" v-model="form.name" placeholder="Nom" />
            <label for="name">Model</label>
          </IftaLabel>
        </InputGroup>
        <InputGroup>
          <InputGroupAddon>
            <i class="pi pi-receipt"></i>
          </InputGroupAddon>
          <IftaLabel>
            <InputText id="variation" v-model="form.variation" placeholder="Variante" />
            <label for="variation">Variante</label>
          </IftaLabel>
        </InputGroup>
        <InputGroup>
          <InputGroupAddon>
            <i class="pi pi-sort"></i>
          </InputGroupAddon>
          <IftaLabel>
            <Select
              v-model="form.typeId"
              :options="prerequisitesWeaponList.data.data.types"
              optionLabel="name"
              placeholder="Type d'arme"
              optionValue="id"
              id="typeId"
            />
            <label for="typeId">Type d'arme</label>
          </IftaLabel>
        </InputGroup>
        <InputGroup>
          <InputGroupAddon>
            <i class="pi pi-sort"></i>
          </InputGroupAddon>
          <IftaLabel>
            <Select
              v-model="form.barrelType"
              :options="barrelTypes"
              optionLabel="name"
              placeholder="Type de canon"
              optionValue="id"
              id="barrelType"
            />
            <label for="barrelType">Type de canon</label>
          </IftaLabel>
          <IftaLabel>
            <InputNumber
              v-model="form.barrelLength"
              placeholder="Longueur du canon"
              :minFractionDigits="2"
              id="barrelLength"
            />
            <label for="barrelLength">Longueur de canon</label>
          </IftaLabel>

          <InputGroupAddon>cm</InputGroupAddon>
        </InputGroup>
        <InputGroup>
          <InputGroupAddon>
            <Checkbox id="isThreadedBarrel" v-model="form.isThreadedBarrel" :binary="true" />
            <label for="isThreadedBarrel" class="ml-2"> Filetage </label>
          </InputGroupAddon>
          <IftaLabel>
            <Select
              v-model="form.threadedSizeId"
              :options="prerequisitesWeaponList.data.data.threadedSizes"
              optionLabel="size"
              placeholder="type de filetage"
              optionValue="id"
              :disabled="!form.isThreadedBarrel"
              id="threadedSizeId"
            />
            <label for="threadedSizeId">type de filetage</label>
          </IftaLabel>
        </InputGroup>
        <InputGroup>
          <InputGroupAddon>
            <Checkbox id="isAdjustableTrigger" v-model="form.isAdjustableTrigger" :binary="true" />
            <label for="isAdjustableTrigger" class="ml-2"> Detente reglable </label>
          </InputGroupAddon>
          <InputGroupAddon>de</InputGroupAddon>
          <InputNumber
            :minFractionDigits="2"
            v-model="adjustableTriggerMinWeight"
            :disabled="!form.isAdjustableTrigger"
          />
          <InputGroupAddon>a</InputGroupAddon>
          <InputNumber
            :minFractionDigits="2"
            v-model="adjustableTriggerMaxWeight"
            :disabled="!form.isAdjustableTrigger"
          />
          <InputGroupAddon>kg</InputGroupAddon>
        </InputGroup>
      </div>

      <div class="p-4">
        <Textarea
          v-model="form.description"
          autoResize
          rows="5"
          cols="30"
          class="w-full"
          placeholder="Description"
        />
      </div>
      <div class="text-red-500 p-4" v-if="createWeaponIsOnError">
        <p class="text-xl font-bold">
          {{ createWeaponIsOnErrorMessage }}
        </p>
      </div>

      <div class="text-center">
        <Button type="submit" label="submit" :disabled="!isFormValid"></Button>
      </div>
    </form>
  </div>
</template>
<script setup lang="ts">
import Select from 'primevue/select'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import IftaLabel from 'primevue/iftalabel'
import InputText from 'primevue/inputtext'
import Checkbox from 'primevue/checkbox'
import InputNumber from 'primevue/inputnumber'
import Textarea from 'primevue/textarea'
import Button from 'primevue/button'
import { computed, ref } from 'vue'
import { useWeaponStore } from '@/stores/weapon'
import {
  type CreateWeaponDto,
  CreateWeaponDtoBarrelTypeEnum,
  CreateWeaponDtoCategoryEnum
} from '@/api/Api'
const {
  prerequisitesWeaponList,
  createWeapon,
  createWeaponIsOnError,
  createWeaponIsOnErrorMessage
} = useWeaponStore()
const { category } = defineProps<{
  category: CreateWeaponDtoCategoryEnum
}>()
const adjustableTriggerMinWeight = ref(0)
const adjustableTriggerMaxWeight = ref(0)
const barrelTypes = ref([
  { name: CreateWeaponDtoBarrelTypeEnum.Normal },
  { name: CreateWeaponDtoBarrelTypeEnum.SemiLourd },
  { name: CreateWeaponDtoBarrelTypeEnum.Lourd }
])
const initialCreateWeaponFormObject = {
  typeId: 0,
  caliberId: 0,
  factoryId: 0,
  name: '',
  variation: '',
  barrelType: CreateWeaponDtoBarrelTypeEnum.Normal,
  isThreadedBarrel: false,
  barrelLength: 0,
  threadedSizeId: null,
  isAdjustableTrigger: false,
  adjustableTriggerValue: triggerValue(),
  description: '',
  category: category,
  isOpticReady: false
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
  createWeapon(form.value)
  form.value = { ...initialCreateWeaponFormObject }
}
</script>

<style scoped></style>
