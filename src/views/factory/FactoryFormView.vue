<template>
  <div class="card">
    <h2 class="text-center mt-2 text-2xl">
      Ajouter une marque de {{ t('global.' + factoryTypeName) }}
    </h2>
    <div class="text-center mt-2">
      <Button label="Voir la liste des marque disponible" text @click="isVisible = true" />
    </div>
    <Dialog
      v-model:visible="isVisible"
      modal
      header="Liste"
      :style="{ width: '50rem' }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    >
      <factories-table :type="factoryTypeName" />
    </Dialog>
    <form @submit.prevent="submit">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 p-4">
        <InputGroup>
          <InputGroupAddon>
            <i class="pi pi-id-card"></i>
          </InputGroupAddon>
          <InputText v-model="form.name" placeholder="Nom" />
        </InputGroup>
        <InputGroup>
          <InputGroupAddon>
            <i class="pi pi-id-card"></i>
          </InputGroupAddon>
          <InputText v-model="form.ref" placeholder="Ref" />
        </InputGroup>
        <InputGroup>
          <IftaLabel>
            <Select
              v-model="form.typeId"
              optionValue="id"
              optionLabel="name"
              :options="store.getFactoryTypes.data?.data.types"
              placeholder="Categorie"
              id="type"
            >
              <template #option="slotProps">
                <div class="flex items-center">
                  <div>{{ t('global.' + slotProps.option.name) }}</div>
                </div>
              </template>
            </Select>
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
      <div class="text-red-500 p-4" v-if="store.create.isError">
        <p class="text-xl font-bold">
          {{ t('error.' + store.create.error.response.data.message) }}
        </p>
      </div>

      <div class="text-center mt-2">
        <Button type="submit" :label="t('global.save')" :disabled="!isFormValid"></Button>
      </div>
    </form>
  </div>
  <!--  <div class="p-4">
    <factories-table />
  </div>-->
</template>
<script setup lang="ts">
import { type CreateFactoryDto } from '@/api/Api'
import { computed, ref } from 'vue'
import Select from 'primevue/select'
import IftaLabel from 'primevue/iftalabel'
import Textarea from 'primevue/textarea'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import InputGroupAddon from 'primevue/inputgroupaddon'
import InputGroup from 'primevue/inputgroup'
import { useI18n } from 'vue-i18n'
import { useFactoryStore } from '@/stores/factory'
import FactoriesTable from '@/components/__factory/FactoriesTable.vue'

import Dialog from 'primevue/dialog'
const { t } = useI18n()
const store = useFactoryStore()

const initialFactoryFormObject: CreateFactoryDto = {
  name: '',
  description: '',
  typeId: 1,
  ref: ''
}
const form = ref<CreateFactoryDto>({ ...initialFactoryFormObject })
const submit = () => {
  store.create.mutate(form.value)
  form.value.name = ''
  form.value.ref = ''
  form.value.description = ''
}
const isVisible = ref(false)
const isFormValid = computed(() => {
  return !!form.value.name
})
const factoryTypeName = computed(() => {
  let name = 'weapon'
  if (store.getFactoryTypes.data?.data.types) {
    const type = store.getFactoryTypes.data?.data.types.find(
      (type) => type.id === form.value.typeId
    )
    if (type) {
      name = type.name
    }
  }
  return name
})
</script>

<style scoped></style>
