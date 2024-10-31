<template>
  <h2 class="text-center text-2xl">{{ t('headType.form.addTitle') }}</h2>
  <div class="text-center mt-2">
    <Button label="Voir les oviges disponibles" @click="isVisibleDrawer = true" text />
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

  <Drawer v-model:visible="isVisibleDrawer" position="bottom" style="height: auto">
    <head-types-table />
  </Drawer>
</template>
<script setup lang="ts">
import type { CreateAmmunitionHeadTypeDto } from '@/api/Api'
import { computed, ref } from 'vue'
import { useHeadTypeStore } from '@/stores/headType'

import InputText from 'primevue/inputtext'
import InputGroupAddon from 'primevue/inputgroupaddon'

import Button from 'primevue/button'

import InputGroup from 'primevue/inputgroup'

import { useI18n } from 'vue-i18n'
import HeadTypesTable from '@/components/__ammunition/HeadTypesTableComponent.vue'
import Drawer from 'primevue/drawer'
const store = useHeadTypeStore()
const { t } = useI18n()

const initialFormObject: CreateAmmunitionHeadTypeDto = {
  name: '',
  ref: ''
}
const isVisibleDrawer = ref(false)
const form = ref<CreateAmmunitionHeadTypeDto>({ ...initialFormObject })
const isFormValid = computed(() => {
  return !!form.value.name
})
const submit = () => {
  store.create.mutate(form.value)
  form.value = { ...initialFormObject }
}
</script>

<style scoped></style>
