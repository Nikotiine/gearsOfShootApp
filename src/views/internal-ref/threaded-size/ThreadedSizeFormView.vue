<template>
  <h2 class="text-center text-2xl">{{ t('threadedSize.form.addTitle') }}</h2>
  <form @submit.prevent="submit">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      <InputGroup>
        <input-group-required-icon :is-validate="form.size.length >= 3" />
        <input-group-text
          @value="(value) => (form.size = value)"
          :min-length="3"
          placeholder="threadedSize.size"
          label="threadedSize.size"
          required
          input-id="size"
          :initial-value="form.size"
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
    </div>
    <div class="text-center mt-6">
      <Button type="submit" :label="t('global.save')" :disabled="!isFormValid"></Button>
    </div>
  </form>
</template>
<script setup lang="ts">
import Button from 'primevue/button'
import InputGroup from 'primevue/inputgroup'
import { useI18n } from 'vue-i18n'
import { useThreadedSizeStore } from '@/stores/threaded-size.store'
import { computed } from 'vue'
import InputGroupText from '@/components/__form/InputGroupText.vue'
import InputGroupRequiredIcon from '@/components/__form/InputGroupRequiredIcon.vue'

const { t } = useI18n()
const store = useThreadedSizeStore()
const { form, submit } = store.formBuilder()

//***********************Validateur*************************
const isFormValid = computed(() => {
  return !!form.value.size
})
</script>

<style scoped></style>
