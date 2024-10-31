<template>
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
            @change="$emit('changeType', form.typeId)"
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
</template>

<script setup lang="ts">
import Textarea from 'primevue/textarea'
import InputText from 'primevue/inputtext'
import InputGroupAddon from 'primevue/inputgroupaddon'
import Select from 'primevue/select'
import Button from 'primevue/button'
import IftaLabel from 'primevue/iftalabel'
import InputGroup from 'primevue/inputgroup'
import { useFactoryStore } from '@/stores/factory'
import type { CreateFactoryDto } from '@/api/Api'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
const store = useFactoryStore()
const { t } = useI18n()
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

const isFormValid = computed(() => {
  return !!form.value.name
})
</script>

<style scoped></style>
