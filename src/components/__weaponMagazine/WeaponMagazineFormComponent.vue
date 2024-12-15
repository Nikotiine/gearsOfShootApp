<template>
  <div class="card">
    <h2 class="text-center mt-2 text-2xl">Ajouter une arme de Categorie</h2>
    <form @submit.prevent="submit">
      <div
        class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4"
        v-if="store.prerequisiteList.isSuccess"
      >
        <InputGroup>
          <InputGroupAddon>
            <i class="pi pi-circle"></i>
          </InputGroupAddon>
          <IftaLabel>
            <Select
              v-model="form.factoryId"
              :options="store.prerequisiteList.data?.data.factories"
              placeholder="Marque"
              id="category"
              optionValue="id"
              optionLabel="name"
            />
            <label for="category">Marque</label>
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
              :options="store.prerequisiteList.data.data.calibers"
              optionLabel="name"
              optionValue="id"
              placeholder="Selectionnez"
            />
            <label for="caliberId">Calibre</label>
          </IftaLabel>
        </InputGroup>

        <InputGroup>
          <InputGroupAddon>
            <i class="pi pi-id-card"></i>
          </InputGroupAddon>
          <IftaLabel>
            <InputText id="name" v-model="form.reference" placeholder="Nom" />
            <label for="name">Ref</label>
          </IftaLabel>
        </InputGroup>
        <InputGroup>
          <InputGroupAddon>
            <i class="pi pi-sort"></i>
          </InputGroupAddon>
          <IftaLabel>
            <Select
              v-model="form.bodyId"
              :options="store.prerequisiteList.data.data.bodies"
              optionLabel="label"
              placeholder="Type d'arme"
              optionValue="id"
              id="typeId"
            />
            <label for="typeId">body</label>
          </IftaLabel>
        </InputGroup>

        <InputGroup>
          <InputGroupAddon>
            <i class="pi pi-sort"></i>
          </InputGroupAddon>
          <IftaLabel>
            <InputNumber
              v-model="form.length"
              placeholder="Longueur du canon"
              :minFractionDigits="2"
              id="barrelLength"
            />
            <label for="barrelLength">Longueur </label>
          </IftaLabel>

          <InputGroupAddon>cm</InputGroupAddon>
        </InputGroup>
        <InputGroup>
          <InputGroupAddon>
            <i class="pi pi-sort"></i>
          </InputGroupAddon>
          <IftaLabel>
            <InputNumber
              v-model="form.height"
              placeholder="Longueur du canon"
              :minFractionDigits="2"
              id="barrelLength"
            />
            <label for="barrelLength">hauteur </label>
          </IftaLabel>

          <InputGroupAddon>cm</InputGroupAddon>
        </InputGroup>
        <InputGroup>
          <InputGroupAddon>
            <i class="pi pi-sort"></i>
          </InputGroupAddon>
          <IftaLabel>
            <InputNumber
              v-model="form.capacity"
              placeholder="Longueur du canon"
              :minFractionDigits="2"
              id="barrelLength"
            />
            <label for="barrelLength">capac </label>
          </IftaLabel>

          <InputGroupAddon>cm</InputGroupAddon>
        </InputGroup>
        <InputGroup>
          <InputGroupAddon>
            <i class="pi pi-sort"></i>
          </InputGroupAddon>
          <IftaLabel>
            <InputNumber
              v-model="form.width"
              placeholder="Longueur du canon"
              :minFractionDigits="2"
              id="barrelLength"
            />
            <label for="barrelLength">largeur </label>
          </IftaLabel>

          <InputGroupAddon>cm</InputGroupAddon>
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
      <div class="text-red-500 p-4" v-if="store.create.isError">
        <p class="text-xl font-bold">
          {{ t('error.' + store.create.error.response.data.message) }}
        </p>
      </div>

      <div class="text-center">
        <Button type="submit" label="submit" :disabled="!isFormValid"></Button>
      </div>
    </form>
  </div>
</template>
<script setup lang="ts">
import { useWeaponMagazineStore } from '@/stores/weapon-magazine'
import type { CreateWeaponMagazineDto } from '@/api/Api'
import { computed, ref } from 'vue'
import Textarea from 'primevue/textarea'
import InputText from 'primevue/inputtext'
import InputGroupAddon from 'primevue/inputgroupaddon'
import Select from 'primevue/select'
import Button from 'primevue/button'
import IftaLabel from 'primevue/iftalabel'
import InputGroup from 'primevue/inputgroup'
import InputNumber from 'primevue/inputnumber'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const store = useWeaponMagazineStore()
const initialObject: CreateWeaponMagazineDto = {
  length: 0,
  height: 0,
  caliberId: 0,
  capacity: 0,
  bodyId: 0,
  factoryId: 0,
  reference: '',
  width: 0,
  description: ''
}
const isFormValid = computed(() => {
  let isValid: boolean = false
  if (
    form.value.capacity > 0 &&
    form.value.caliberId > 0 &&
    form.value.factoryId > 0 &&
    form.value.bodyId > 0
  ) {
    isValid = true
  }
  return isValid
})
const form = ref<CreateWeaponMagazineDto>({ ...initialObject })
const submit = () => {
  store.create.mutate(form.value)
  form.value = { ...initialObject }
}
</script>

<style scoped></style>
