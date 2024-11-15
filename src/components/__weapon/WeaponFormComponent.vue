<template>
  <div class="card">
    <h2 class="text-center mt-2 text-2xl">
      Ajouter une arme de Categorie {{ selectedCategory?.label }}
    </h2>
    <form @submit.prevent="submit">
      <div
        class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4"
        v-if="store.prerequisitesWeaponList.isSuccess"
      >
        <InputGroup>
          <InputGroupAddon>
            <i class="pi pi-circle"></i>
          </InputGroupAddon>
          <IftaLabel>
            <Select
              v-model="form.categoryId"
              :options="store.prerequisitesWeaponList.data?.data.categories"
              placeholder="type de filetage"
              id="category"
              optionValue="id"
              optionLabel="label"
            />
            <label for="category">Categorie</label>
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
              :options="store.prerequisitesWeaponList.data.data.calibers"
              optionLabel="name"
              optionValue="id"
              placeholder="Selectionnez"
            />
            <label for="caliberId">Calibre</label>
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
              :options="store.prerequisitesWeaponList.data.data.factories"
              filter
              optionLabel="name"
              optionValue="id"
              placeholder="Marque"
            />
            <label for="factoryId">Marque</label>
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
            <i class="pi pi-receipt"></i>
          </InputGroupAddon>
          <IftaLabel>
            <InputText id="variation" v-model="form.variation" placeholder="Variante" />
            <label for="variation">Variante</label>
          </IftaLabel>
        </InputGroup>
        <InputGroup>
          <InputGroupAddon>
            <i class="pi pi-sort"></i>
          </InputGroupAddon>
          <IftaLabel>
            <Select
              v-model="form.typeId"
              :options="store.prerequisitesWeaponList.data.data.types"
              optionLabel="name"
              placeholder="Type d'arme"
              optionValue="id"
              id="typeId"
            />
            <label for="typeId">Type d'arme</label>
          </IftaLabel>
        </InputGroup>
        <InputGroup>
          <InputGroupAddon>
            <i class="pi pi-sort"></i>
          </InputGroupAddon>
          <IftaLabel>
            <Select
              v-model="form.percussionTypeId"
              :options="store.prerequisitesWeaponList.data.data.percussionTypes"
              optionLabel="label"
              placeholder="Type de percussion"
              optionValue="id"
              id="typeId"
            />
            <label for="typeId">Type de percussion</label>
          </IftaLabel>
        </InputGroup>
        <InputGroup>
          <InputGroupAddon>
            <i class="pi pi-sort"></i>
          </InputGroupAddon>
          <IftaLabel>
            <Select
              v-model="form.barrelTypeId"
              :options="store.prerequisitesWeaponList.data.data.barreTypes"
              optionLabel="label"
              placeholder="Type de canon"
              optionValue="id"
              id="barrelType"
            />
            <label for="barrelType">Type de canon</label>
          </IftaLabel>
          <IftaLabel>
            <InputNumber
              v-model="form.barrelLength"
              placeholder="Longueur du canon"
              :minFractionDigits="2"
              id="barrelLength"
            />
            <label for="barrelLength">Longueur de canon</label>
          </IftaLabel>

          <InputGroupAddon>cm</InputGroupAddon>
        </InputGroup>
        <InputGroup>
          <InputGroupAddon>
            <Checkbox id="isThreadedBarrel" v-model="form.isThreadedBarrel" :binary="true" />
            <label for="isThreadedBarrel" class="ml-2"> Filetage </label>
          </InputGroupAddon>
          <IftaLabel>
            <Select
              v-model="form.threadedSizeId"
              :options="store.prerequisitesWeaponList.data.data.threadedSizes"
              optionLabel="size"
              placeholder="type de filetage"
              optionValue="id"
              :disabled="!form.isThreadedBarrel"
              id="threadedSizeId"
            />
            <label for="threadedSizeId">type de filetage</label>
          </IftaLabel>
        </InputGroup>
        <InputGroup>
          <InputGroupAddon>
            <Checkbox id="isAdjustableTrigger" v-model="form.isAdjustableTrigger" :binary="true" />
            <label for="isAdjustableTrigger" class="ml-2"> Detente reglable </label>
          </InputGroupAddon>
          <InputGroupAddon>de</InputGroupAddon>
          <InputNumber
            :minFractionDigits="2"
            v-model="adjustableTriggerMinWeight"
            :disabled="!form.isAdjustableTrigger"
          />
          <InputGroupAddon>a</InputGroupAddon>
          <InputNumber
            :minFractionDigits="2"
            v-model="adjustableTriggerMaxWeight"
            :disabled="!form.isAdjustableTrigger"
          />
          <InputGroupAddon>kg</InputGroupAddon>
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
import Textarea from 'primevue/textarea'
import InputText from 'primevue/inputtext'
import InputGroupAddon from 'primevue/inputgroupaddon'
import Select from 'primevue/select'
import Button from 'primevue/button'
import Checkbox from 'primevue/checkbox'
import IftaLabel from 'primevue/iftalabel'
import InputGroup from 'primevue/inputgroup'
import InputNumber from 'primevue/inputnumber'
import { useWeaponStore } from '@/stores/weapon'
import { computed, ref } from 'vue'
import type { CreateWeaponDto } from '@/api/Api'
import { useI18n } from 'vue-i18n'
import { storeToRefs } from 'pinia'
const { t } = useI18n()
const store = useWeaponStore()
const { categories$ } = storeToRefs(store)
const adjustableTriggerMinWeight = ref(0)
const adjustableTriggerMaxWeight = ref(0)
const initialCreateWeaponFormObject: CreateWeaponDto = {
  typeId: 0,
  caliberId: 0,
  factoryId: 0,
  name: '',
  variation: '',
  barrelTypeId: 0,
  isThreadedBarrel: false,
  barrelLength: 0,
  threadedSizeId: null,
  isAdjustableTrigger: false,
  adjustableTriggerValue: triggerValue(),
  description: '',
  categoryId: 3,
  isOpticReady: false,
  percussionTypeId: 0
}
const form = ref<CreateWeaponDto>({
  ...initialCreateWeaponFormObject
})
const isFormValid = computed(() => {
  let isValid: boolean = false
  if (
    form.value.name &&
    form.value.typeId > 0 &&
    form.value.caliberId > 0 &&
    form.value.factoryId > 0 &&
    form.value.barrelLength > 0
  ) {
    isValid = true
  }
  return isValid
})
function triggerValue(): string {
  return `${adjustableTriggerMinWeight.value}-${adjustableTriggerMaxWeight.value} kg`
}
const submit = () => {
  store.create.mutate(form.value)
  form.value = { ...initialCreateWeaponFormObject }
}
const selectedCategory = computed(() => {
  return categories$.value.find((category) => category.id === form.value.categoryId)
})
</script>

<style scoped></style>
