<template>
  <div class="card grid grid-cols-2 px-4">
    <form @submit.prevent="submit">
      <div class="mt-2">
        <h2 class="text-center text-2xl">{{ t('bodyType.form.addTitle') }}</h2>
        <InputGroup class="mt-4 p-2">
          <InputGroupAddon>
            <i class="pi pi-id-card"></i>
          </InputGroupAddon>
          <InputText v-model="form.name" :placeholder="t('global.name')" />
        </InputGroup>
        <InputGroup class="mt-2 p-2">
          <InputGroupAddon>
            <i class="pi pi-id-card"></i>
          </InputGroupAddon>
          <InputText v-model="form.ref" :placeholder="t('global.ref')" />
        </InputGroup>

        <div class="text-red-500 p-4" v-if="store.create.isError">
          <p class="text-xl font-bold">
            {{ store.create.error.response.data.message }}
          </p>
        </div>

        <div class="text-center mt-6">
          <Button type="submit" :label="t('global.save')" :disabled="!isFormValid"></Button>
        </div>
      </div>
    </form>
    <div class="border border-blue-500 mt-2" v-if="store.getALl.isSuccess">
      <DataTable :value="getAllData$" :loading="store.getALl.isLoading">
        <template #header>
          <div class="flex flex-wrap items-center justify-between gap-2">
            <span class="text-xl font-bold">{{ t('bodyType.existingList') }}</span>
          </div>
        </template>
        <Column field="name" :header="t('bodyType.type')"></Column>
        <Column field="ref" :header="t('global.ref')"></Column>
      </DataTable>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { CreateAmmunitionBodyTypeDto } from '@/api/Api'
import { computed, ref } from 'vue'
import { useBodyTypeStore } from '@/stores/bodyType'
import InputText from 'primevue/inputtext'
import InputGroupAddon from 'primevue/inputgroupaddon'
import Button from 'primevue/button'
import InputGroup from 'primevue/inputgroup'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
const store = useBodyTypeStore()
const { t } = useI18n()
const { getAllData$ } = storeToRefs(store)
const initialFormObject: CreateAmmunitionBodyTypeDto = {
  name: '',
  ref: ''
}
const form = ref<CreateAmmunitionBodyTypeDto>({ ...initialFormObject })
const isFormValid = computed(() => {
  return !!form.value.name
})
const submit = async () => {
  store.create.mutate(form.value)
  form.value = { ...initialFormObject }
}
</script>

<style scoped></style>
