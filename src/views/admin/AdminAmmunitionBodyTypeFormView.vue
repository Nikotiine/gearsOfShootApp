<template>
  <div>
    <h2 class="text-center text-2xl">{{ t('bodyType.form.addTitle') }}</h2>
    <div class="text-center mt-2">
      <Button label="Voir les types disponible" @click="isVisibleDrawer = true" text />
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

        <div class="text-red-500 p-4" v-if="store.create.isError">
          <p class="text-xl font-bold">
            {{ t('error.' + store.create.error.response.data.message) }}
          </p>
        </div>
      </div>
      <div class="text-center mt-6">
        <Button type="submit" :label="t('global.save')" :disabled="!isFormValid"></Button>
      </div>
    </form>
  </div>

  <Drawer v-model:visible="isVisibleDrawer" position="bottom" style="height: auto">
    <div class="p-4"><body-types-table /></div>
  </Drawer>
</template>
<script setup lang="ts">
import type { CreateAmmunitionBodyTypeDto } from '@/api/Api'
import { computed, ref } from 'vue'
import { useBodyTypeStore } from '@/stores/bodyType'
import InputText from 'primevue/inputtext'
import InputGroupAddon from 'primevue/inputgroupaddon'
import Button from 'primevue/button'
import InputGroup from 'primevue/inputgroup'
import Drawer from 'primevue/drawer'
import { useI18n } from 'vue-i18n'
import BodyTypesTable from '@/components/__ammunition/BodyTypesTable.vue'
const store = useBodyTypeStore()
const { t } = useI18n()
const isVisibleDrawer = ref(false)
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
