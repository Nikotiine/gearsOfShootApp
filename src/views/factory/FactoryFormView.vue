<template>
  <div class="card">
    <h2 class="text-center mt-2 text-2xl">Ajouter une marque de {{ form.type }}</h2>
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
            <Select v-model="form.type" :options="types" placeholder="Categorie" id="type" />
            <label for="type">Type</label>
          </IftaLabel>
        </InputGroup>
      </div>
      <div class="px-4">
        <Textarea
          v-model="form.description"
          autoResize
          rows="5"
          cols="30"
          class="w-full"
          placeholder="Description"
        />
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
import { type CreateFactoryDto, CreateFactoryDtoTypeEnum } from '@/api/Api'
import { computed, ref } from 'vue'
import Select from 'primevue/select'
import IftaLabel from 'primevue/iftalabel'
import Textarea from 'primevue/textarea'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import InputGroupAddon from 'primevue/inputgroupaddon'
import InputGroup from 'primevue/inputgroup'
import { useFactoryStore } from '@/stores/factory'
const { createFactory, isError, errorMessage } = useFactoryStore()
const types: CreateFactoryDtoTypeEnum[] = [
  CreateFactoryDtoTypeEnum.Arme,
  CreateFactoryDtoTypeEnum.Munition,
  CreateFactoryDtoTypeEnum.Optique,
  CreateFactoryDtoTypeEnum.ReducteurDeSon
]
const initialFactoryFormObject: CreateFactoryDto = {
  name: '',
  description: '',
  type: CreateFactoryDtoTypeEnum.Arme,
  ref: ''
}
const form = ref<CreateFactoryDto>({ ...initialFactoryFormObject })
const submit = () => {
  console.log(form.value)
  createFactory(form.value)
  form.value = { ...initialFactoryFormObject }
}
const isFormValid = computed(() => {
  return !!form.value.name
})
</script>

<style scoped></style>
