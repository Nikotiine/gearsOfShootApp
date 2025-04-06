<template>
  <h2 class="text-center text-2xl">{{ t('caliber.form.addTitle') }}</h2>
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
          :i18n-prefix="i18Prefix"
          input-id="name"
          :initial-value="form.name"
        />
      </InputGroup>
      <InputGroup>
        <input-group-required-icon :is-validate="form.reference.length >= 3" />
        <input-group-text
          @value="(value) => (form.reference = value)"
          :min-length="3"
          placeholder="reference"
          label="reference"
          :i18n-prefix="i18Prefix"
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
import Button from 'primevue/button'
import InputGroup from 'primevue/inputgroup'
import { useCaliberStore } from '@/stores/caliber'
import { useI18n } from 'vue-i18n'
import type { CreateAmmunitionBodyTypeDto } from '@/api/Api'
import { computed, ref, watch, watchEffect } from 'vue'
import InputGroupText from '@/components/__form/InputGroupText.vue'
import InputGroupRequiredIcon from '@/components/__form/InputGroupRequiredIcon.vue'
const store = useCaliberStore()
const { t } = useI18n()
const i18Prefix = store.getI18NPrefix
//*******************Init du formulaire*********************
const { form, submit } = store.formBuilder()

//***********************Validateur*************************
const isValidForm = computed(() => {
  return !!form.value.name && !!form.value.reference
})
</script>

<style scoped></style>
