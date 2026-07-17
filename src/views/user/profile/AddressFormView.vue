<template>
  <h2 class="text-center text-xl text-blue-500">{{ t(i18nPrefix + 'addNewAddress') }}</h2>
  <form @submit.prevent="submit">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      <InputGroup>
        <input-group-required-icon :is-validate="form.lastName.length >= 3" />
        <input-group-text
          @value="(value) => (form.lastName = value)"
          :min-length="3"
          placeholder="lastName"
          label="lastName"
          :i18n-prefix="i18nPrefix"
          required
          input-id="lastName"
          :initial-value="form.lastName"
        />
      </InputGroup>
      <InputGroup>
        <input-group-required-icon :is-validate="form.firstName.length >= 3" />
        <input-group-text
          @value="(value) => (form.firstName = value)"
          :min-length="3"
          placeholder="firstName"
          label="firstName"
          :i18n-prefix="i18nPrefix"
          required
          input-id="firstName"
          :initial-value="form.firstName"
        />
      </InputGroup>
      <InputGroup>
        <input-group-required-icon :is-validate="form.streetNumber.length >= 1" />
        <input-group-text
          @value="(value) => (form.streetNumber = value)"
          :min-length="1"
          placeholder="streetNumber"
          label="streetNumber"
          :i18n-prefix="i18nPrefix"
          required
          input-id="streetNumber"
          :initial-value="form.streetNumber"
        />
      </InputGroup>
      <InputGroup>
        <input-group-required-icon :is-validate="form.street.length >= 3" />
        <input-group-text
          @value="(value) => (form.street = value)"
          :min-length="3"
          placeholder="street"
          label="street"
          :i18n-prefix="i18nPrefix"
          required
          input-id="street"
          :initial-value="form.street"
        />
      </InputGroup>
      <InputGroup>
        <input-group-optional-icon :is-validate="form.additionalStreet.length >= 3" />
        <input-group-text
          @value="(value) => (form.additionalStreet = value)"
          :min-length="3"
          placeholder="additionalStreet"
          label="additionalStreet"
          :i18n-prefix="i18nPrefix"
          input-id="additionalStreet"
          :initial-value="form.additionalStreet"
        />
      </InputGroup>
      <InputGroup>
        <input-group-optional-icon :is-validate="form.additionalInformation.length >= 1" />
        <input-group-text
          @value="(value) => (form.additionalInformation = value)"
          :min-length="0"
          placeholder="additionalInformation"
          label="additionalInformation"
          :i18n-prefix="i18nPrefix"
          input-id="additionalInformation"
          :initial-value="form.additionalInformation"
        />
      </InputGroup>
      <InputGroup>
        <input-group-required-icon :is-validate="form.zipCode.length >= 5" />
        <input-group-text
          @value="(value) => (form.zipCode = value)"
          :min-length="5"
          placeholder="zipCode"
          label="zipCode"
          :i18n-prefix="i18nPrefix"
          required
          input-id="zipCode"
          :initial-value="form.zipCode"
        />
      </InputGroup>
      <InputGroup>
        <input-group-required-icon :is-validate="form.city.length >= 2" />
        <input-group-text
          @value="(value) => (form.city = value)"
          :min-length="2"
          placeholder="city"
          label="city"
          :i18n-prefix="i18nPrefix"
          required
          input-id="city"
          :initial-value="form.city"
        />
      </InputGroup>
      <InputGroup>
        <input-group-required-icon :is-validate="form.state.length >= 2" />
        <input-group-text
          @value="(value) => (form.state = value)"
          :min-length="2"
          placeholder="state"
          label="state"
          disabled
          :i18n-prefix="i18nPrefix"
          input-id="state"
          :initial-value="form.state"
        />
      </InputGroup>
    </div>
    <save-button :status="'save'" :disabled="!isFormValid" />
  </form>
</template>
<script setup lang="ts">
import { useAddressStore } from '@/stores/address.store'
import { useI18n } from 'vue-i18n'
import InputGroup from 'primevue/inputgroup'
import InputGroupRequiredIcon from '@/components/__form/InputGroupRequiredIcon.vue'
import InputGroupText from '@/components/__form/InputGroupText.vue'
import InputGroupOptionalIcon from '@/components/__form/InputGroupOptionalIcon.vue'
import SaveButton from '@/components/__form/SaveButton.vue'
import { computed } from 'vue'
const { t } = useI18n()

const store = useAddressStore()
const { form, submit } = store.formBuilder()
const i18nPrefix = store.getI18NPrefix

const isFormValid = computed(() => {
  let isValid: boolean = false
  if (
    form.value.firstName &&
    form.value.lastName &&
    form.value.streetNumber.length > 0 &&
    form.value.street.length > 3 &&
    form.value.zipCode.length > 4 &&
    form.value.city.length > 1
  ) {
    isValid = true
  }
  return isValid
})
</script>

<style scoped></style>
