<template>
  <div class="card">
    <h2 class="text-center mt-2 text-2xl">Ajouter un type d'arme {{ form.mode }}</h2>
    <form @submit.prevent="submit">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 p-4">
        <InputGroup>
          <InputGroupAddon>
            <i class="pi pi-id-card"></i>
          </InputGroupAddon>
          <InputText v-model="form.name" placeholder="Nom" />
        </InputGroup>
        <InputGroup>
          <IftaLabel>
            <Select v-model="form.mode" :options="options" placeholder="Categorie" id="type" />
            <label for="type">Type</label>
          </IftaLabel>
        </InputGroup>
      </div>
      <div class="text-red-500 p-4" v-if="isError">
        <p class="text-xl font-bold">
          {{ errorMessage }}
        </p>
      </div>

      <div class="text-center mt-2">
        <Button type="submit" label="submit" :disabled="!isFormValid"></Button>
      </div>
    </form>
  </div>
</template>
<script setup lang="ts">
import InputText from 'primevue/inputtext'
import InputGroupAddon from 'primevue/inputgroupaddon'
import Button from 'primevue/button'
import InputGroup from 'primevue/inputgroup'
import { useWeaponTypeStore } from '@/stores/weaponType'
import { type CreateWeaponTypeDto, CreateWeaponTypeDtoModeEnum } from '@/api/Api'
import { computed, ref } from 'vue'
import Select from 'primevue/select'
import IftaLabel from 'primevue/iftalabel'
const options: CreateWeaponTypeDtoModeEnum[] = [
  CreateWeaponTypeDtoModeEnum.Automatique,
  CreateWeaponTypeDtoModeEnum.SemiAuto,
  CreateWeaponTypeDtoModeEnum.CoupParCoup
]
const { createWeaponType, isError, errorMessage } = useWeaponTypeStore()
const initialFormObject: CreateWeaponTypeDto = {
  name: '',
  ref: ''
}
const form = ref<CreateWeaponTypeDto>({ ...initialFormObject })
const isFormValid = computed(() => {
  return !!form.value.name
})
const submit = () => {
  createWeaponType(form.value)
  form.value = { ...initialFormObject }
}
</script>

<style scoped></style>
