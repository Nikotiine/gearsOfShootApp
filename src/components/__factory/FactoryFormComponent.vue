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

      <InputGroup>
        <input-group-required-icon :is-validate="form.reference.length >= 3" />
        <input-group-text
          @value="(value) => (form.reference = value)"
          :min-length="3"
          placeholder="ref"
          label="ref"
          required
          input-id="reference"
          :initial-value="form.reference"
        />
      </InputGroup>

      <InputGroup>
        <input-group-required-icon :is-validate="form.typeId > 0" />
        <input-group-select
          :options="factoryTypeViewModel"
          option-label="label"
          label="type"
          :i18n-prefix="i18nPrefix"
          required
          :disabled="disabledSelectFactoryType"
          input-id="typeId"
          :initial-value="form.typeId"
        />
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

    <div class="text-center">
      <save-button :status="formStatus" :disabled="!isFormValid" />
    </div>
  </form>
</template>

<script setup lang="ts">
import Textarea from 'primevue/textarea'

import InputGroup from 'primevue/inputgroup'
import { useFactoryStore } from '@/stores/factory.store'
import { computed, ref, watch, watchEffect } from 'vue'
import { useI18n } from 'vue-i18n'
import InputGroupText from '@/components/__form/InputGroupText.vue'
import InputGroupRequiredIcon from '@/components/__form/InputGroupRequiredIcon.vue'
import InputGroupSelect from '@/components/__form/InputGroupSelect.vue'
import { storeToRefs } from 'pinia'
import type { FormStatus } from '@/types/form-status.type'
import SaveButton from '@/components/__form/SaveButton.vue'
import { useFormStore } from '@/stores/form.store'
import FormTitleComponent from '@/components/__form/FormTitleComponent.vue'

const store = useFactoryStore()
const i18nPrefix = store.getI18NPrefix
const { factoryTypes$ } = storeToRefs(store)

const { t, locale } = useI18n()
const localeValue = ref(locale.value)

const { id } = defineProps<{
  id?: string
}>()
const { form, submit } = store.formBuilder(id)
const formStore = useFormStore()
const formStatus: FormStatus = formStore.getFormStatus()
const factoryType = store.getFactoryType()

//***********************Validateur*************************
const isFormValid = computed(() => {
  return !!form.value.name
})

/**
 * Creer un viewModel des types de marque pour la traduction multilingues
 */
const factoryTypeViewModel = computed(() => {
  return factoryTypes$.value.map((f) => {
    return {
      ...f,
      label: t('global.' + f.name)
    }
  })
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

const disabledSelectFactoryType = ref(false)
watchEffect(() => {
  const type = factoryTypes$.value.find((f) => f.name === factoryType)
  if (type) {
    form.value.typeId = type.id
    disabledSelectFactoryType.value = true
  }
})
</script>

<style scoped></style>
