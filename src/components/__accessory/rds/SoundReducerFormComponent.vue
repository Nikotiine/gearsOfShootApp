<template>
  <h2 class="text-center mt-2 text-2xl">
    {{ t(i18nPrefix + formStatus) }}
  </h2>
  <form @submit.prevent="submit" v-if="storeAreLoaded">
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

      <InputGroup>
        <input-group-required-icon :is-validate="form.factoryId > 0" />
        <input-group-select
          :options="factories$?.data"
          option-label="name"
          placeholder="factory"
          :i18n-prefix="i18nPrefix"
          label="factory"
          @option-id="(event) => (form.factoryId = event)"
          required
          input-id="factoryId"
          :initial-value="form.factoryId"
        />
      </InputGroup>

      <InputGroup>
        <input-group-required-icon :is-validate="form.threadedSizeId > 0" />
        <input-group-select
          :options="threadSize$?.data"
          option-label="size"
          placeholder="threadedSize"
          :i18n-prefix="i18nPrefix"
          label="threadedSize"
          @option-id="(event) => (form.threadedSizeId = event)"
          required
          input-id="threadedSizeId"
          :initial-value="form.threadedSizeId"
        />
      </InputGroup>
      <InputGroup>
        <input-group-required-icon :is-validate="form.caliberId > 0" />
        <input-group-select
          :options="caliber$?.data"
          :i18n-prefix="i18nPrefix"
          option-label="name"
          placeholder="caliber"
          label="caliber"
          @option-id="(event) => (form.caliberId = event)"
          required
          input-id="caliberId"
          :initial-value="form.caliberId"
        />
      </InputGroup>

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
    <!--    <div class="text-red-500 p-4" v-if="store.create.isError">
      <p class="text-xl font-bold">
        {{ t('error.' + store.create.error.response.data.message) }}
      </p>
    </div>-->
    <save-button :status="formStatus" :disabled="!isFormValid" />
  </form>
</template>
<script setup lang="ts">
import { useSoundReducerStore } from '@/stores/sound-noise-reducer'
import InputGroupRequiredIcon from '@/components/__form/InputGroupRequiredIcon.vue'
import InputGroupSelect from '@/components/__form/InputGroupSelect.vue'
import InputGroup from 'primevue/inputgroup'
import InputGroupText from '@/components/__form/InputGroupText.vue'
import Textarea from 'primevue/textarea'
import InputGroupOptionalIcon from '@/components/__form/InputGroupOptionalIcon.vue'
import InputGroupNumber from '@/components/__form/InputGroupNumber.vue'
import InputGroupAddon from 'primevue/inputgroupaddon'
import SaveButton from '@/components/__form/SaveButton.vue'
import type { FormStatus } from '@/types/form-status.type'
import { useI18n } from 'vue-i18n'
import { useFactoryStore } from '@/stores/factory'
import { useCaliberStore } from '@/stores/caliber'
import { useThreadedSizeStore } from '@/stores/threadedSize'
import InputGroupCheckBox from '@/components/__form/InputGroupCheckBox.vue'
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
const { t } = useI18n()
const store = useSoundReducerStore()
const factoryStore = useFactoryStore()
const { id } = defineProps<{
  id?: string
  formStatus: FormStatus
}>()
const { form, submit } = store.formBuilder(id)
const caliberStore = useCaliberStore()
const threadedSizeStore = useThreadedSizeStore()
const { data: threadSize$, isSuccess: threadedSizeIsIsSuccess } = threadedSizeStore.getAll()
const { data: caliber$, isSuccess: calibersQueryIsSuccess } = caliberStore.getAll()
const { data: factories$, isSuccess: factoriesQueryIsSuccess } =
  factoryStore.getFactoriesByType('accessory')
const { i18nPrefix } = storeToRefs(store)
/**
 * Verification que tout les store sont chager avant d'afficher la page
 */
const storeAreLoaded = computed(() => {
  return threadedSizeIsIsSuccess && calibersQueryIsSuccess && factoriesQueryIsSuccess
})
const isFormValid = computed(() => {
  let isValid: boolean = false
  if (
    form.value.name &&
    form.value.factoryId > 0 &&
    form.value.caliberId > 0 &&
    form.value.threadedSizeId > 0
  ) {
    isValid = true
  }
  return isValid
})
</script>
<style scoped></style>
