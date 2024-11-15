<template>
  <div class="card">
    <h2 class="text-center mt-2 text-2xl">
      Ajouter une munition de Categorie {{ selectedCategory?.label }}
    </h2>
    <form @submit.prevent="submit">
      <div
        class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 p-4"
        v-if="store.prerequisitesAmmoList.isSuccess"
      >
        <div class="px-4 mt-6 mr-2">
          <IftaLabel>
            <Select
              v-model="form.categoryId"
              :options="store.prerequisitesAmmoList.data.data.categories"
              placeholder="Categorie"
              id="category"
              class="w-3/12 mx-auto"
            />
            <label for="category">Categorie</label>
          </IftaLabel>
        </div>
        <InputGroup>
          <InputGroupAddon>
            <i class="pi pi-circle"></i>
          </InputGroupAddon>
          <Select
            v-model="form.caliberId"
            :options="store.prerequisitesAmmoList.data.data.calibers"
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
            :options="store.prerequisitesAmmoList.data.data.factories"
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
            :options="store.prerequisitesAmmoList.data.data.headTypes"
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
            :options="store.prerequisitesAmmoList.data.data.bodyTypes"
            optionLabel="name"
            placeholder="Type de douille"
            optionValue="id"
          />
        </InputGroup>
        <IftaLabel>
          <InputGroup>
            <Select
              v-model="form.percussionTypeId"
              :options="store.prerequisitesAmmoList.data.data.percussionTypes"
              optionLabel="label"
              placeholder="type de percussion"
              id="percussionType"
              optionValue="id"
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
import Textarea from 'primevue/textarea'
import InputText from 'primevue/inputtext'
import InputGroupAddon from 'primevue/inputgroupaddon'
import Select from 'primevue/select'
import Button from 'primevue/button'
import IftaLabel from 'primevue/iftalabel'
import InputGroup from 'primevue/inputgroup'
import InputNumber from 'primevue/inputnumber'
import { useAmmunitionStore } from '@/stores/ammunition'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import { type CreateAmmunitionDto } from '@/api/Api'
import { computed, ref } from 'vue'
const { t } = useI18n()
const store = useAmmunitionStore()
const { categories$ } = storeToRefs(store)

const initialCreateAmmunitionFormObject: CreateAmmunitionDto = {
  bodyTypeId: 0,
  caliberId: 0,
  factoryId: 0,
  name: '',
  categoryId: 0,
  initialSpeed: 0,
  description: '',
  packaging: 50,
  headTypeId: 0,
  percussionTypeId: 0
}
const form = ref<CreateAmmunitionDto>({
  ...initialCreateAmmunitionFormObject
})

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
  store.create.mutate(form.value)
  form.value = { ...initialCreateAmmunitionFormObject }
}

const selectedCategory = computed(() => {
  return categories$.value.find((category) => category.id === form.value.categoryId)
})
</script>

<style scoped></style>
