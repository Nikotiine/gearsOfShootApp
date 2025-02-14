<template>
  <h2 class="text-center text-2xl">
    {{ t('weaponType.form.addTitle') }}
    <span class="text-blue-500 font-bold"> {{ selectedMode?.name }} </span>
  </h2>

  <form @submit.prevent="submit">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4" v-if="store.prerequisiteList.isSuccess">
      <InputGroup>
        <input-group-required-icon :is-validate="form.name.length >= 3" />
        <input-group-text
          @value="(value) => (form.name = value)"
          :min-length="3"
          placeholder="global.name"
          label="global.name"
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
          placeholder="global.ref"
          label="global.ref"
          required
          input-id="reference"
          :initial-value="form.reference"
        />
      </InputGroup>
      <InputGroup>
        <input-group-required-icon :is-validate="form.modeId > 0" />
        <input-group-select
          :options="store.prerequisiteList.data?.data.modes"
          label="weaponType.mode"
          @option-id="(event) => (form.modeId = event)"
          required
          filter
          input-id="modeId"
          :initial-value="form.modeId"
        />
        <input-group-addon-open-drawer-button type="caliber" />
      </InputGroup>
    </div>
    <div class="text-red-500 p-4" v-if="store.create.isError">
      <p class="text-xl font-bold">
        {{ t('error.' + store.create.error.response.data.message) }}
      </p>
    </div>

    <div class="text-center mt-2">
      <Button type="submit" :label="t('global.save')" :disabled="!isFormValid"></Button>
    </div>
  </form>
</template>
<script setup lang="ts">
import InputGroup from 'primevue/inputgroup'
import Button from 'primevue/button'
import { useI18n } from 'vue-i18n'
import { useWeaponTypeStore } from '@/stores/weaponType'
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'
import type { CreateWeaponTypeDto } from '@/api/Api'
import InputGroupAddonOpenDrawerButton from '@/components/__form/InputGroupAddonOpenDrawerButton.vue'
import InputGroupRequiredIcon from '@/components/__form/InputGroupRequiredIcon.vue'
import InputGroupSelect from '@/components/__form/InputGroupSelect.vue'
import InputGroupText from '@/components/__form/InputGroupText.vue'

const { t } = useI18n()
const store = useWeaponTypeStore()
const { modes$ } = storeToRefs(store)
const emit = defineEmits(['onSave'])

//*******************Init du formulaire*********************
const initialFormObject: CreateWeaponTypeDto = {
  name: '',
  reference: '',
  modeId: 0
}
const form = ref<CreateWeaponTypeDto>({ ...initialFormObject })

//***********************Validateur*************************
const isFormValid = computed(() => {
  return form.value.name && form.value.modeId > 0
})

/**
 * Sousmission du formulaire pour la creation d'un nouveau type d'arme
 * Emet un boolean onSave pour le drawer
 * Reinitialise le formulaire apres l'envoie
 */
const submit = async () => {
  store.create.mutate(form.value)
  form.value = { ...initialFormObject }
  emit('onSave', true)
}

/**
 * Affiche le mode selectionner dans le titre
 */
const selectedMode = computed(() => {
  return modes$.value.find((m) => m.id === form.value.modeId)
})
</script>

<style scoped></style>
