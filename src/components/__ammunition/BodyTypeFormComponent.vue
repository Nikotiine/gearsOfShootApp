<template>
  <h2 class="text-center text-2xl">{{ t('bodyType.form.addTitle') }}</h2>
  <form @submit.prevent="submit">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      <InputGroup>
        <input-group-required-icon :is-validate="form.name.length >= 3" />
        <input-group-text
          @value="(value) => (form.name = value)"
          :min-length="3"
          placeholder="global.name"
          label="global.name"
          required
          input-id="name"
          :initial-value="form.name"
        />
      </InputGroup>
      <InputGroup>
        <input-group-required-icon :is-validate="form.reference.length >= 3" />
        <input-group-text
          @value="(value) => (form.reference = value)"
          :min-length="3"
          placeholder="global.ref"
          label="global.ref"
          required
          input-id="reference"
          :initial-value="form.reference"
        />
      </InputGroup>

      <div class="text-red-500 p-4" v-if="store.create.isError">
        <p class="text-xl font-bold">
          {{ t('error.' + store.create.error.response.data.message) }}
        </p>
      </div>
    </div>
    <div class="text-center mt-6">
      <Button type="submit" :label="t('global.save')" :disabled="!isValidForm"></Button>
    </div>
  </form>
</template>

<script setup lang="ts">
import Button from 'primevue/button'
import InputGroup from 'primevue/inputgroup'
import type { CreateAmmunitionBodyTypeDto } from '@/api/Api'
import { computed, ref } from 'vue'
import { useBodyTypeStore } from '@/stores/bodyType'
import { useI18n } from 'vue-i18n'
import InputGroupText from '@/components/__form/InputGroupText.vue'
import InputGroupRequiredIcon from '@/components/__form/InputGroupRequiredIcon.vue'
const store = useBodyTypeStore()
const { t } = useI18n()
const initialFormObject: CreateAmmunitionBodyTypeDto = {
  name: '',
  reference: ''
}
const emit = defineEmits(['onSave'])
const form = ref<CreateAmmunitionBodyTypeDto>({ ...initialFormObject })
const isValidForm = computed(() => {
  return !!form.value.name && !!form.value.reference
})
const submit = async () => {
  store.create.mutate(form.value)
  form.value = { ...initialFormObject }
  emit('onSave', true)
}
</script>

<style scoped></style>
