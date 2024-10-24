<template>
  <div class="card">
    <h2 class="text-center mt-2 text-2xl">Ajouter une munition de Categorie {{ form.category }}</h2>
    <form @submit.prevent="submit">
      <div class="px-4 mt-6 mr-2">
        <IftaLabel>
          <Select
            v-model="form.category"
            :options="categories"
            placeholder="Categorie"
            id="category"
            class="w-3/12 mx-auto"
          />
          <label for="category">Categorie</label>
        </IftaLabel>
      </div>
      <div
        class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 p-4"
        v-if="prerequisitesAmmoList.isSuccess"
      >
        <InputGroup>
          <InputGroupAddon>
            <i class="pi pi-circle"></i>
          </InputGroupAddon>
          <Select
            v-model="form.caliberId"
            :options="prerequisitesAmmoList.data.data.calibers"
            optionLabel="name"
            optionValue="id"
            placeholder="Calibre"
          />
        </InputGroup>

        <InputGroup>
          <InputGroupAddon>
            <i class="pi pi-warehouse"></i>
          </InputGroupAddon>
          <Select
            v-model="form.factoryId"
            :options="prerequisitesAmmoList.data.data.factories"
            filter
            optionLabel="name"
            optionValue="id"
            placeholder="Marque"
          />
        </InputGroup>

        <InputGroup>
          <InputGroupAddon>
            <i class="pi pi-id-card"></i>
          </InputGroupAddon>
          <InputText v-model="form.name" placeholder="Nom" />
        </InputGroup>

        <InputGroup>
          <InputGroupAddon>
            <i class="pi pi-bolt"></i>
          </InputGroupAddon>
          <InputNumber v-model="form.initialSpeed" placeholder="Vitesse initiale" />
          <InputGroupAddon> m/s </InputGroupAddon>
        </InputGroup>
        <InputGroup>
          <InputGroupAddon>
            <i class="pi pi-sort"></i>
          </InputGroupAddon>
          <Select
            v-model="form.headTypeId"
            :options="prerequisitesAmmoList.data.data.headTypes"
            optionLabel="name"
            placeholder="Type d'ovige"
            optionValue="id"
          />
        </InputGroup>
        <InputGroup>
          <InputGroupAddon>
            <i class="pi pi-sort"></i>
          </InputGroupAddon>
          <Select
            v-model="form.bodyTypeId"
            :options="prerequisitesAmmoList.data.data.bodyTypes"
            optionLabel="name"
            placeholder="Type de douille"
            optionValue="id"
          />
        </InputGroup>
        <IftaLabel>
          <InputGroup>
            <Select
              v-model="form.percussionType"
              :options="precussionTypes"
              placeholder="type de percussion"
              id="percussionType"
            />
            <label for="percussionType">Percussion</label>
          </InputGroup>
        </IftaLabel>
        <IftaLabel>
          <InputGroup>
            <InputNumber v-model="form.packaging" placeholder="Packaging" id="packaging" />
          </InputGroup>
          <label for="packaging">Packaging</label>
        </IftaLabel>
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
      <div class="text-red-500 p-4" v-if="createAmmunitionIsOnError">
        <p class="text-xl font-bold">
          {{ createAmmunitionIsOnErrorMessage }}
        </p>
      </div>

      <div class="text-center">
        <Button type="submit" label="submit" :disabled="!isFormValid"></Button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import {
  type CreateAmmunitionDto,
  CreateAmmunitionDtoCategoryEnum,
  CreateAmmunitionDtoPercussionTypeEnum
} from '@/api/Api'
import { useAmmunitionStore } from '@/stores/ammunition'
import { computed, ref } from 'vue'
import Button from 'primevue/button'
import Select from 'primevue/select'
import InputGroupAddon from 'primevue/inputgroupaddon'
import Textarea from 'primevue/textarea'
import InputNumber from 'primevue/inputnumber'
import InputText from 'primevue/inputtext'
import InputGroup from 'primevue/inputgroup'

import IftaLabel from 'primevue/iftalabel'
const {
  prerequisitesAmmoList,
  createAmmunition,
  createAmmunitionIsOnError,
  createAmmunitionIsOnErrorMessage
} = useAmmunitionStore()

const categories: CreateAmmunitionDtoCategoryEnum[] = [
  CreateAmmunitionDtoCategoryEnum.D,
  CreateAmmunitionDtoCategoryEnum.C,
  CreateAmmunitionDtoCategoryEnum.B
]
const initialCreateAmmunitionFormObject: CreateAmmunitionDto = {
  bodyTypeId: 0,
  caliberId: 0,
  factoryId: 0,
  name: '',
  category: CreateAmmunitionDtoCategoryEnum.D,
  initialSpeed: 0,
  description: '',
  packaging: 50,
  headTypeId: 0,
  percussionType: CreateAmmunitionDtoPercussionTypeEnum.Centrale
}
const form = ref<CreateAmmunitionDto>({
  ...initialCreateAmmunitionFormObject
})
const precussionTypes: CreateAmmunitionDtoPercussionTypeEnum[] = [
  CreateAmmunitionDtoPercussionTypeEnum.Centrale,
  CreateAmmunitionDtoPercussionTypeEnum.Annulaire
]
const isFormValid = computed(() => {
  let isValid: boolean = false
  if (
    form.value.name &&
    form.value.factoryId > 0 &&
    form.value.caliberId > 0 &&
    form.value.headTypeId > 0 &&
    form.value.bodyTypeId > 0
  ) {
    isValid = true
  }
  return isValid
})
const submit = () => {
  console.log(form.value)
  createAmmunition(form.value)
  form.value = { ...initialCreateAmmunitionFormObject }
}
</script>

<style scoped></style>
