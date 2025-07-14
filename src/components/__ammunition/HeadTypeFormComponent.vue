<template>
  <h2 class="text-center text-2xl">{{ t('headType.form.addTitle') }}</h2>
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
    </div>
    <div class="text-center mt-6">
      <Button type="submit" :label="t('global.save')" :disabled="!isValidForm"></Button>
    </div>
  </form>
</template>
<script setup lang="ts">
import { useHeadTypeStore } from '@/stores/headType'
import Button from 'primevue/button'
import InputGroupText from '@/components/__form/InputGroupText.vue'
import InputGroup from 'primevue/inputgroup'
import InputGroupRequiredIcon from '@/components/__form/InputGroupRequiredIcon.vue'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const store = useHeadTypeStore()

const { form, submit } = store.formBuilder()
const isValidForm = computed(() => {
  return !!form.value.name && !!form.value.reference
})
</script>

<style scoped></style>
