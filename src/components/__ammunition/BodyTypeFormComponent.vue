<template>
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
</template>

<script setup lang="ts">
import InputText from 'primevue/inputtext'
import InputGroupAddon from 'primevue/inputgroupaddon'
import Button from 'primevue/button'
import InputGroup from 'primevue/inputgroup'
import type { CreateAmmunitionBodyTypeDto } from '@/api/Api'
import { computed, ref } from 'vue'
import { useBodyTypeStore } from '@/stores/bodyType'
import { useI18n } from 'vue-i18n'
const store = useBodyTypeStore()
const { t } = useI18n()
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
