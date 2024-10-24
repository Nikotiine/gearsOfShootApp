<template>
  <div class="card grid grid-cols-2">
    <form @submit.prevent="submit">
      <div class="mt-2">
        <h2 class="text-center text-2xl">Ajouter un type de douille</h2>
        <InputGroup class="mt-4 p-2">
          <InputGroupAddon>
            <i class="pi pi-id-card"></i>
          </InputGroupAddon>
          <InputText v-model="form.name" placeholder="Nom" />
        </InputGroup>
        <InputGroup class="mt-2 p-2">
          <InputGroupAddon>
            <i class="pi pi-id-card"></i>
          </InputGroupAddon>
          <InputText v-model="form.ref" placeholder="Reference" />
        </InputGroup>

        <div class="text-red-500 p-4" v-if="isError">
          <p class="text-xl font-bold">
            {{ errorMessage }}
          </p>
        </div>

        <div class="text-center mt-6">
          <Button type="submit" label="submit" :disabled="!isFormValid"></Button>
        </div>
      </div>
    </form>
    <div class="border border-blue-500 mt-2">
      <DataTable :value="test.data">
        <template #header>
          <div class="flex flex-wrap items-center justify-between gap-2">
            <span class="text-xl font-bold">Douille existantes</span>
          </div>
        </template>
        <Column field="name" header="Type de douille"></Column>
        <Column field="ref" header="Reference"></Column>
      </DataTable>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { AmmunitionBodyTypeDto, CreateAmmunitionBodyTypeDto } from '@/api/Api'
import { computed, ref } from 'vue'
import { useBodyTypeStore } from '@/stores/bodyType'
import InputText from 'primevue/inputtext'
import InputGroupAddon from 'primevue/inputgroupaddon'
import Button from 'primevue/button'
import InputGroup from 'primevue/inputgroup'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
const {
  createBodyType,
  isError,
  errorMessage,
  bodyTypeListQueryData,
  bodyTypeListQueryLoading,
  test
} = useBodyTypeStore()
//const { data, isLoading } = bodyTypeListQuery()
const initialFormObject: CreateAmmunitionBodyTypeDto = {
  name: '',
  ref: ''
}
const form = ref<CreateAmmunitionBodyTypeDto>({ ...initialFormObject })
const isFormValid = computed(() => {
  return !!form.value.name
})
const submit = () => {
  createBodyType(form.value)
  form.value = { ...initialFormObject }
}
</script>

<style scoped></style>
