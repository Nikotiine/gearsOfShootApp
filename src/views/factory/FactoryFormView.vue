<template>
  <form-title-component :i18n-prefix="i18nPrefix" custom-status="save" />
  <form @submit.prevent="submit">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      <InputGroup>
        <input-group-required-icon :is-validate="form.name.length >= 3" />
        <input-group-text
          @value="(value) => (form.name = value)"
          :min-length="3"
          placeholder="name"
          label="name"
          required
          input-id="name"
          :initial-value="form.name"
        />
      </InputGroup>

      <factory-type-select
        :initial-value="form.type.id"
        @on-select="(value) => (form.type = value)"
      />
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

    <div class="text-center">
      <save-button :status="formStatus" :disabled="!isFormValid" />
    </div>
  </form>
</template>

<script setup lang="ts">
import Textarea from 'primevue/textarea'

import InputGroup from 'primevue/inputgroup'
import { useFactoryStore } from '@/stores/factory.store'
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import InputGroupText from '@/components/__form/InputGroupText.vue'
import InputGroupRequiredIcon from '@/components/__form/InputGroupRequiredIcon.vue'

import type { FormStatus } from '@/types/form-status.type'
import SaveButton from '@/components/__form/SaveButton.vue'
import { useFormStore } from '@/stores/form.store'
import FormTitleComponent from '@/components/__form/FormTitleComponent.vue'
import FactoryTypeSelect from '@/components/__factory/__input/FactoryTypeSelect.vue'

const store = useFactoryStore()
const i18nPrefix = store.getI18NPrefix

const { locale } = useI18n()
const localeValue = ref(locale.value)

const { id } = defineProps<{
  id?: string
}>()
const { form, submit } = store.formBuilder(id)
const formStore = useFormStore()
const formStatus: FormStatus = formStore.getFormStatus()

//***********************Validateur*************************
const isFormValid = computed(() => {
  let isValid: boolean = false
  if (form.value.name && form.value.type.id > 0) {
    isValid = true
  }
  return isValid
})

/**
 * Surveille la langue pour la traductions des label des type de marques
 */
watch(
  () => locale.value,
  (value) => {
    localeValue.value = value
  }
)
</script>

<style scoped></style>
