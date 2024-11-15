<template>
  <h2 class="text-center text-2xl">
    {{ t('weaponType.form.addTitle') }}
    <span class="text-blue-500 font-bold"> {{ selectedMode?.label }} </span>
  </h2>

  <form @submit.prevent="submit">
    <div class="card grid grid-cols-2 px-4 mt-3 gap-2" v-if="store.prerequisiteList.isSuccess">
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
        <InputText v-model="form.ref" :placeholder="t('global.ref')" />-
      </InputGroup>
      <InputGroup>
        <IftaLabel>
          <Select
            v-model="form.modeId"
            :options="store.prerequisiteList.data?.data.modes"
            optionLabel="label"
            optionValue="id"
            placeholder="Selectionnez"
            id="type"
          />
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
</template>
<script setup lang="ts">
import InputGroup from 'primevue/inputgroup'
import IftaLabel from 'primevue/iftalabel'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import InputGroupAddon from 'primevue/inputgroupaddon'
import Select from 'primevue/select'
import { useI18n } from 'vue-i18n'
import { useWeaponTypeStore } from '@/stores/weaponType'
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'
import type { CreateWeaponTypeDto } from '@/api/Api'

const { t } = useI18n()
const store = useWeaponTypeStore()
const { modes$ } = storeToRefs(store)

const initialFormObject: CreateWeaponTypeDto = {
  name: '',
  ref: '',
  modeId: 0
}
const form = ref<CreateWeaponTypeDto>({ ...initialFormObject })
const isFormValid = computed(() => {
  return form.value.name && form.value.modeId > 0
})
const submit = () => {
  store.create.mutate(form.value)
  form.value = { ...initialFormObject }
}
const selectedMode = computed(() => {
  return modes$.value.find((m) => m.id === form.value.modeId)
})
</script>

<style scoped></style>
