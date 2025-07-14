<template>
  <h2 class="text-center mt-2 text-2xl">
    {{ t(i18nPrefix + formStatus) }}
  </h2>
  <form @submit.prevent="submit">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      <InputGroup>
        <input-group-required-icon :is-validate="form.name.length >= 3" />
        <input-group-text
          @value="(value) => (form.name = value)"
          :min-length="3"
          placeholder="name"
          label="name"
          :i18n-prefix="i18nPrefix"
          required
          input-id="name"
          :initial-value="form.name"
        />
      </InputGroup>

      <factory-input-select
        :initial-value="form.factory.id"
        can-add-new
        required
        factory-type="accessory"
        @on-select="(event) => (form.factory = event)"
      />

      <threaded-size-input-select
        required
        :initial-value="form.threadedSize?.id ?? 0"
        @on-select="(event) => (form.threadedSize = event)"
        can-add-new
      />

      <caliber-input-select
        :initial-value="form.caliber.id"
        can-add-new
        required
        @on-select="(event) => (form.caliber = event)"
      />

      <InputGroup>
        <input-group-optional-icon :is-completed="form.diameter > 0" />
        <input-group-number
          label="diameter"
          :i18n-prefix="i18nPrefix"
          @value="(value) => (form.diameter = value)"
          input-id="diameter"
          :initial-value="form.diameter"
        />
        <InputGroupAddon> mm </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <input-group-optional-icon :is-completed="form.length > 0" />
        <input-group-number
          label="length"
          :i18n-prefix="i18nPrefix"
          @value="(value) => (form.length = value)"
          input-id="length"
          :initial-value="form.length"
        />
        <InputGroupAddon> mm </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <input-group-optional-icon :is-completed="form.chicane > 0" />
        <input-group-number
          label="chicane"
          :i18n-prefix="i18nPrefix"
          @value="(value) => (form.chicane = value)"
          input-id="chicane"
          :initial-value="form.chicane"
        />
      </InputGroup>
      <InputGroup>
        <input-group-optional-icon />
        <input-group-check-box
          input-id="isCleanable"
          label="isCleanable"
          size="large"
          :i18n-prefix="i18nPrefix"
          @checked="(event) => (form.isCleanable = event)"
          :checked="form.isCleanable"
        />
      </InputGroup>
      <InputGroup>
        <input-group-optional-icon :is-completed="form.estimatedNoiseReduction > 0" />
        <input-group-number
          label="estimatedNoiseReduction"
          :i18n-prefix="i18nPrefix"
          @value="(value) => (form.estimatedNoiseReduction = value)"
          input-id="estimatedNoiseReduction"
          :initial-value="form.estimatedNoiseReduction"
        />
        <InputGroupAddon> db </InputGroupAddon>
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
    <save-button :status="formStatus" :disabled="!isFormValid" />
  </form>
</template>
<script setup lang="ts">
import { useSoundReducerStore } from '@/stores/sound-noise-reducer'
import InputGroupRequiredIcon from '@/components/__form/InputGroupRequiredIcon.vue'
import InputGroup from 'primevue/inputgroup'
import InputGroupText from '@/components/__form/InputGroupText.vue'
import Textarea from 'primevue/textarea'
import InputGroupOptionalIcon from '@/components/__form/InputGroupOptionalIcon.vue'
import InputGroupNumber from '@/components/__form/InputGroupNumber.vue'
import InputGroupAddon from 'primevue/inputgroupaddon'
import SaveButton from '@/components/__form/SaveButton.vue'
import type { FormStatus } from '@/types/form-status.type'
import { useI18n } from 'vue-i18n'
import InputGroupCheckBox from '@/components/__form/InputGroupCheckBox.vue'
import { computed } from 'vue'
import FactoryInputSelect from '@/components/__form/__specific_select/FactoryInputSelect.vue'
import CaliberInputSelect from '@/components/__form/__specific_select/CaliberInputSelect.vue'
import ThreadedSizeInputSelect from '@/components/__form/__specific_select/ThreadedSizeInputSelect.vue'

const { t } = useI18n()
const store = useSoundReducerStore()

const { id } = defineProps<{
  id?: string
  formStatus: FormStatus
}>()
const { form, submit } = store.formBuilder(id)

const i18nPrefix = store.getI18NPrefix()

const isFormValid = computed(() => {
  let isValid: boolean = false
  if (
    form.value.name &&
    form.value.factory.id > 0 &&
    form.value.caliber.id > 0 &&
    form.value.threadedSize.id > 0
  ) {
    isValid = true
  }
  return isValid
})
</script>
<style scoped></style>
