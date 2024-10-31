<template>
  <h2 class="text-center text-2xl">
    {{ t('weaponType.form.addTitle') }}
    <span class="text-blue-500 font-bold"> {{ form.mode }} </span>
  </h2>
  <div class="text-center mt-2">
    <Button label="Voir les type d'arme disponible" @click="isVisibleDrawer = true" text />
  </div>
  <form @submit.prevent="submit">
    <div class="card grid grid-cols-2 px-4 mt-3 gap-2">
      <InputGroup>
        <InputGroupAddon>
          <i class="pi pi-id-card"></i>
        </InputGroupAddon>
        <InputText v-model="form.name" :placeholder="t('global.name')" />
      </InputGroup>
      <InputGroup>
        <InputGroupAddon>
          <i class="pi pi-id-card"></i>
        </InputGroupAddon>
        <InputText v-model="form.ref" :placeholder="t('global.ref')" />
      </InputGroup>
      <InputGroup>
        <IftaLabel>
          <Select v-model="form.mode" :options="options" placeholder="Categorie" id="type" />
          <label for="type">{{ t('weaponType.mode') }}</label>
        </IftaLabel>
      </InputGroup>
    </div>
    <div class="text-red-500 p-4" v-if="store.create.isError">
      <p class="text-xl font-bold">
        {{ t('error.' + store.create.error.response.data.message) }}
      </p>
    </div>

    <div class="text-center mt-2">
      <Button type="submit" label="submit" :disabled="!isFormValid"></Button>
    </div>
  </form>

  <Drawer v-model:visible="isVisibleDrawer" position="bottom" style="height: auto">
    <weapon-types-table />
  </Drawer>
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

import { useI18n } from 'vue-i18n'
import WeaponTypesTable from '@/components/__weapon/WeaponTypesTable.vue'
import Drawer from 'primevue/drawer'
const options: CreateWeaponTypeDtoModeEnum[] = [
  CreateWeaponTypeDtoModeEnum.Automatique,
  CreateWeaponTypeDtoModeEnum.SemiAuto,
  CreateWeaponTypeDtoModeEnum.CoupParCoup
]
const { t } = useI18n()
const store = useWeaponTypeStore()
const isVisibleDrawer = ref(false)
const initialFormObject: CreateWeaponTypeDto = {
  name: '',
  ref: '',
  mode: CreateWeaponTypeDtoModeEnum.CoupParCoup
}
const form = ref<CreateWeaponTypeDto>({ ...initialFormObject })
const isFormValid = computed(() => {
  return !!form.value.name
})
const submit = () => {
  store.create.mutate(form.value)
  form.value = { ...initialFormObject }
}
</script>

<style scoped></style>
