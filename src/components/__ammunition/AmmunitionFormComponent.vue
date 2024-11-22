<template>
  <div class="card">
    <h2 class="text-center mt-2 text-2xl">
      {{ t('ammunition.form.add') }} {{ selectedCategory?.name }}
    </h2>
    <form @submit.prevent="submit">
      <div
        class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 p-4"
        v-if="store.prerequisitesAmmoList.isSuccess"
      >
        <InputGroup>
          <InputGroupAddon>
            <i class="pi pi-circle"></i>
          </InputGroupAddon>
          <IftaLabel>
            <Select
              v-model="form.categoryId"
              :options="store.prerequisitesAmmoList.data?.data.categories"
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
              :options="store.prerequisitesAmmoList.data.data.calibers"
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
              :options="store.prerequisitesAmmoList.data.data.factories"
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
            <i class="pi pi-warehouse"></i>
          </InputGroupAddon>
          <IftaLabel>
            <InputGroup>
              <Select
                v-model="form.percussionTypeId"
                :options="store.prerequisitesAmmoList.data.data.percussionTypes"
                optionLabel="name"
                :placeholder="t('global.select')"
                id="percussionType"
                optionValue="id"
              />
              <label for="percussionType">Percussion</label>
            </InputGroup>
          </IftaLabel>
        </InputGroup>

        <InputGroup>
          <InputGroupAddon>
            <i class="pi pi-id-card"></i>
          </InputGroupAddon>
          <IftaLabel>
            <InputText id="name" v-model="form.name" :placeholder="t('ammunition.form.name')" />
            <label for="name" v-capitalize="t('global.model')"></label>
          </IftaLabel>
        </InputGroup>

        <InputGroup>
          <InputGroupAddon>
            <i class="pi pi-bolt"></i>
          </InputGroupAddon>
          <IftaLabel>
            <InputNumber
              v-model="form.initialSpeed"
              placeholder="Vitesse initiale"
              id="initialSpeed"
            />
            <label for="initialSpeed" v-capitalize="t('ammunition.form.initialSpeed')"></label>
          </IftaLabel>
          <InputGroupAddon> m/s </InputGroupAddon>
        </InputGroup>
        <InputGroup>
          <InputGroupAddon>
            <i class="pi pi-sort"></i>
          </InputGroupAddon>
          <IftaLabel>
            <Select
              v-model="form.headTypeId"
              :options="store.prerequisitesAmmoList.data.data.headTypes"
              optionLabel="name"
              :placeholder="t('global.select')"
              optionValue="id"
              id="headTypeIdId"
            />
            <label for="headTypeId" v-capitalize="t('ammunition.form.headType')"></label>
          </IftaLabel>
        </InputGroup>
        <InputGroup>
          <InputGroupAddon>
            <i class="pi pi-sort"></i>
          </InputGroupAddon>
          <IftaLabel>
            <Select
              v-model="form.bodyTypeId"
              :options="store.prerequisitesAmmoList.data.data.bodyTypes"
              optionLabel="name"
              :placeholder="t('global.select')"
              optionValue="id"
              id="bodyTypeId"
            />
            <label for="bodyTypeId" v-capitalize="t('ammunition.form.bodyType')"></label>
          </IftaLabel>
        </InputGroup>

        <InputGroup>
          <InputGroupAddon>
            <i class="pi pi-sort"></i>
          </InputGroupAddon>
          <IftaLabel>
            <InputNumber v-model="form.packaging" placeholder="Packaging" id="packaging" />
            <label for="packaging" v-capitalize="t('global.packaging')"></label>
          </IftaLabel>
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
  categoryId: 3,
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
