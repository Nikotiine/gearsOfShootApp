<template>
  <div class="card">
    <h2 class="text-center mt-2 text-2xl">Ajouter une optique</h2>
    <form @submit.prevent="submit">
      <div
        class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4"
        v-if="store.prerequisiteOpticQuery.isSuccess"
      >
        <InputGroup>
          <InputGroupAddon>
            <i class="pi pi-circle"></i>
          </InputGroupAddon>
          <IftaLabel>
            <Select
              v-model="form.factoryId"
              :options="store.prerequisiteOpticQuery.data?.data.factories"
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
            <i class="pi pi-warehouse"></i>
          </InputGroupAddon>
          <IftaLabel>
            <Select
              id="factoryId"
              v-model="form.opticTypeId"
              :options="store.prerequisiteOpticQuery.data.data.types"
              optionLabel="name"
              optionValue="id"
              placeholder="Type"
            />
            <label for="factoryId">Type</label>
          </IftaLabel>
        </InputGroup>
        <InputGroup>
          <InputGroupAddon>
            <i class="pi pi-circle"></i>
          </InputGroupAddon>

          <IftaLabel>
            <Select
              id="caliberId"
              v-model="form.focalPlaneId"
              :options="store.prerequisiteOpticQuery.data.data.focalPlanes"
              optionLabel="name"
              optionValue="id"
              placeholder="Selectionnez"
            />
            <label for="caliberId">Plan Focal</label>
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
            <i class="pi pi-sort"></i>
          </InputGroupAddon>
          <IftaLabel>
            <Select
              v-model="form.opticUnitId"
              :options="store.prerequisiteOpticQuery.data.data.units"
              optionLabel="name"
              placeholder="Type d'arme"
              optionValue="id"
              id="typeId"
            />
            <label for="typeId">Graduation</label>
          </IftaLabel>
        </InputGroup>
        <InputGroup>
          <InputGroupAddon>
            <i class="pi pi-circle"></i>
          </InputGroupAddon>
          <IftaLabel>
            <Select
              v-model="form.factoryId"
              :options="clickValueOption"
              optionLabel="name"
              optionValue="id"
              placeholder="Marque"
              id="category"
              :disabled="form.opticUnitId === 0"
            />
            <label for="category">Valeur d 'un clic</label>
          </IftaLabel>
        </InputGroup>
        <InputGroup>
          <InputGroupAddon>
            <i class="pi pi-sort"></i>
          </InputGroupAddon>

          <IftaLabel>
            <InputNumber
              v-model="form.minZoom"
              placeholder="Longueur du canon"
              :minFractionDigits="2"
              id="barrelLength"
            />
            <label for="barrelLength">Zoom mini</label>
          </IftaLabel>
          <IftaLabel>
            <InputNumber
              v-model="form.maxZoom"
              placeholder="Longueur du canon"
              :minFractionDigits="2"
              id="barrelLength"
            />
            <label for="barrelLength">Zoom maxi</label>
          </IftaLabel>

          <InputGroupAddon>cm</InputGroupAddon>
        </InputGroup>
        <InputGroup>
          <InputGroupAddon>
            <i class="pi pi-sort"></i>
          </InputGroupAddon>

          <IftaLabel>
            <InputNumber
              v-model="form.maxDrift"
              placeholder="Longueur du canon"
              :minFractionDigits="2"
              id="barrelLength"
            />
            <label for="barrelLength">Elevation </label>
          </IftaLabel>
          <IftaLabel>
            <InputNumber
              v-model="form.maxElevation"
              placeholder="Longueur du canon"
              :minFractionDigits="2"
              id="barrelLength"
            />
            <label for="barrelLength">Derive</label>
          </IftaLabel>

          <InputGroupAddon>cm</InputGroupAddon>
        </InputGroup>
        <InputGroup>
          <InputGroupAddon>
            <i class="pi pi-sort"></i>
          </InputGroupAddon>

          <IftaLabel>
            <InputNumber
              v-model="form.lensDiameter"
              placeholder="Longueur du canon"
              :minFractionDigits="2"
              id="barrelLength"
            />
            <label for="barrelLength">Dimension Lentille </label>
          </IftaLabel>
          <IftaLabel>
            <InputNumber
              v-model="form.bodyDiameter"
              placeholder="Longueur du canon"
              :minFractionDigits="2"
              id="barrelLength"
            />
            <label for="barrelLength">Dimension du corps</label>
          </IftaLabel>

          <InputGroupAddon>mm</InputGroupAddon>
        </InputGroup>

        <InputGroup>
          <InputGroupAddon>
            <Checkbox id="isAdjustableTrigger" v-model="form.isParallax" :binary="true" />
            <label for="isAdjustableTrigger" class="ml-2"> Parallaxe reglable </label>
          </InputGroupAddon>
          <InputGroupAddon>de</InputGroupAddon>
          <InputNumber
            :minFractionDigits="2"
            v-model="form.minParallax"
            :disabled="!form.isParallax"
          />
          <InputGroupAddon>a</InputGroupAddon>
          <InputNumber
            :minFractionDigits="2"
            v-model="form.maxParallax"
            :disabled="!form.isParallax"
          />
          <InputGroupAddon>yard</InputGroupAddon>
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
import { type CreateOpticDto } from '@/api/Api'
import { computed, ref } from 'vue'
import { useOpticStore } from '@/stores/optic'
import InputGroup from 'primevue/inputgroup'
import Checkbox from 'primevue/checkbox'
import Textarea from 'primevue/textarea'
import InputNumber from 'primevue/inputnumber'
import IftaLabel from 'primevue/iftalabel'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import InputGroupAddon from 'primevue/inputgroupaddon'
import Select from 'primevue/select'
import { useI18n } from 'vue-i18n'
import { storeToRefs } from 'pinia'
const store = useOpticStore()
const { units$ } = storeToRefs(store)
const { t } = useI18n()
const initialCreateOpticFormObject: CreateOpticDto = {
  name: '',
  bodyDiameter: 0,
  description: '',
  factoryId: 0,
  maxDrift: 0,
  maxElevation: 0,
  isParallax: false,
  minZoom: 0,
  maxZoom: 0,
  minParallax: 0,
  maxParallax: 0,
  lensDiameter: 0,
  valueOfOneClick: 0,
  focalPlaneId: 0,
  opticUnitId: 0,
  opticTypeId: 0
}
const form = ref<CreateOpticDto>({
  ...initialCreateOpticFormObject
})
const isFormValid = computed(() => {
  let isValid: boolean = false
  if (
    form.value.name &&
    form.value.factoryId > 0 &&
    form.value.bodyDiameter > 0 &&
    form.value.lensDiameter > 0 &&
    form.value.minZoom > 0 &&
    form.value.maxZoom > 0 &&
    form.value.valueOfOneClick > 0
  ) {
    isValid = true
  }
  return isValid
})
const submit = () => {
  store.create.mutate(form.value)
  form.value = { ...initialCreateOpticFormObject }
}
const clickValueOption = computed(() => {
  const moaOptions = ['1/8', '1/4', '1/2']
  const mradOptions = ['1/10']
  const opticUnit = units$.value.find((u) => u.id === form.value.opticUnitId)
  if (opticUnit && opticUnit.name === 'MOA') {
    return moaOptions
  } else {
    return mradOptions
  }
})
</script>

<style scoped></style>
