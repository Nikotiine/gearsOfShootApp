<template>
  <div class="card">
    <h2 class="text-center mt-2 text-2xl">
      {{ t(i18nPrefix + formStatus) }}
    </h2>
    <form @submit.prevent="submit">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 p-4">
        <legalisation-category-input-select
          :initial-value="form.categoryId"
          required
          @on-select="(event) => (form.categoryId = event)"
        />

        <caliber-input-select
          :initial-value="form.caliberId"
          can-add-new
          @on-select="(event) => (form.caliberId = event)"
        />
        <factory-input-select
          :initial-value="form.factoryId"
          can-add-new
          factory-type="ammunition"
          @on-select="(event) => (form.factoryId = event)"
        />

        <percussion-type-input-select
          required
          :initial-value="form.percussionTypeId"
          @on-select="(event) => (form.percussionTypeId = event)"
        />
        <InputGroup>
          <input-group-required-icon :is-validate="form.name.length >= 2" />
          <input-group-text
            @value="(value) => (form.name = value)"
            :min-length="2"
            :i18n-prefix="i18nPrefix"
            placeholder="name"
            label="name"
            required
            input-id="name"
            :initial-value="form.name"
          />
        </InputGroup>

        <InputGroup>
          <input-group-optional-icon :is-completed="form.initialSpeed > 0" />
          <input-group-number
            :i18n-prefix="i18nPrefix"
            label="initialSpeed"
            placeholder="initialSpeed"
            @value="(value) => (form.initialSpeed = value)"
            input-id="initialSpeed"
            :initial-value="form.initialSpeed"
          />
          <InputGroupAddon> m/s </InputGroupAddon>
        </InputGroup>

        <head-type-input-select
          @on-select="(event) => (form.headTypeId = event)"
          :initial-value="form.headTypeId"
          can-add-new
        />
        <body-type-input-select
          :initial-value="form.bodyTypeId"
          can-add-new
          @on-select="(event) => (form.bodyTypeId = event)"
        />
        <InputGroup>
          <input-group-optional-icon :is-completed="form.packaging > 0" />
          <input-group-number
            :i18n-prefix="i18nPrefix"
            placeholder="packaging"
            label="packaging"
            @value="(value) => (form.packaging = value)"
            input-id="packaging"
            :initial-value="form.packaging"
          />
        </InputGroup>
      </div>

      <div class="p-4">
        <Textarea
          v-model="form.description"
          autoResize
          rows="5"
          cols="30"
          class="w-full"
          :placeholder="t('global.description')"
        />
      </div>

      <div class="text-center">
        <save-button :status="formStatus" :disabled="!isFormValid" />
      </div>
    </form>
  </div>
</template>
<script setup lang="ts">
import Textarea from 'primevue/textarea'
import InputGroupAddon from 'primevue/inputgroupaddon'
import InputGroup from 'primevue/inputgroup'
import { useAmmunitionStore } from '@/stores/ammunition'
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'
import InputGroupRequiredIcon from '@/components/__form/InputGroupRequiredIcon.vue'
import InputGroupText from '@/components/__form/InputGroupText.vue'
import InputGroupOptionalIcon from '@/components/__form/InputGroupOptionalIcon.vue'
import InputGroupNumber from '@/components/__form/InputGroupNumber.vue'

import type { FormStatus } from '@/types/form-status.type'
import SaveButton from '@/components/__form/SaveButton.vue'
import CaliberInputSelect from '@/components/__form/__specific_select/CaliberInputSelect.vue'
import FactoryInputSelect from '@/components/__form/__specific_select/FactoryInputSelect.vue'
import LegalisationCategoryInputSelect from '@/components/__form/__specific_select/LegalisationCategoryInputSelect.vue'
import PercussionTypeInputSelect from '@/components/__form/__specific_select/PercussionTypeInputSelect.vue'
import HeadTypeInputSelect from '@/components/__form/__specific_select/HeadTypeInputSelect.vue'
import BodyTypeInputSelect from '@/components/__form/__specific_select/BodyTypeInputSelect.vue'

const { id } = defineProps<{
  id?: string
  formStatus: FormStatus
}>()

const { t } = useI18n()
const store = useAmmunitionStore()
const i18nPrefix = store.getI18NPrefix
const { form, submit } = store.formBuilder(id)

const isFormValid = computed(() => {
  let isValid: boolean = false
  if (
    form.value.name &&
    form.value.factoryId > 0 &&
    form.value.caliberId > 0 &&
    form.value.headTypeId > 0 &&
    form.value.bodyTypeId > 0
  ) {
    isValid = true
  }
  return isValid
})
</script>

<style scoped></style>
