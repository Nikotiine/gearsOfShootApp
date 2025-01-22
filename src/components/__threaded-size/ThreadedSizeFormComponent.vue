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
      <div class="text-red-500 p-4" v-if="store.create.isError">
        <p class="text-xl font-bold">
          {{ t('error.' + store.create.error.response.data.message) }}
        </p>
      </div>
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
import { useThreadedSizeStore } from '@/stores/threadedSize'
import { computed, ref } from 'vue'
import type { CreateThreadedSizeDto } from '@/api/Api'
import InputGroupText from '@/components/__form/InputGroupText.vue'
import InputGroupRequiredIcon from '@/components/__form/InputGroupRequiredIcon.vue'
const { t } = useI18n()
const store = useThreadedSizeStore()
const emit = defineEmits(['onSave'])
//*******************Init du formulaire*********************
const initialFormObject: CreateThreadedSizeDto = {
  size: '',
  reference: ''
}
const form = ref<CreateThreadedSizeDto>({ ...initialFormObject })

//***********************Validateur*************************
const isFormValid = computed(() => {
  return !!form.value.size
})

/**
 * Sousmission du formulaire pour la creation d'un nouveau filetage
 * Emet un boolean onSave pour le drawer
 * Reinitialise le formulaire apres l'envoie
 */
const submit = async () => {
  store.create.mutate(form.value)
  form.value = { ...initialFormObject }
  emit('onSave', true)
}
</script>

<style scoped></style>
