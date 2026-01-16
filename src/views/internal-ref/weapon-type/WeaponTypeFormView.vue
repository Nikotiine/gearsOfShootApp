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
          placeholder="name"
          label="name"
          required
          :i18n-prefix="i18nPrefix"
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
          label="reference"
          required
          input-id="reference"
          :initial-value="form.reference"
          :i18n-prefix="i18nPrefix"
        />
      </InputGroup>
      <weapon-reload-mode-input-select
        required
        :initial-value="form.modeId"
        @on-select="(event) => (form.modeId = event)"
      />
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
import { useWeaponTypeStore } from '@/stores/weapon-type.store'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import InputGroupRequiredIcon from '@/components/__form/InputGroupRequiredIcon.vue'
import InputGroupText from '@/components/__form/InputGroupText.vue'
import WeaponReloadModeInputSelect from '@/components/__form/__specific_select/WeaponReloadModeInputSelect.vue'

const { t } = useI18n()
const store = useWeaponTypeStore()
const { modes$ } = storeToRefs(store)
const i18nPrefix = store.getI18NPrefix
//*******************Init du formulaire*********************
const { form, submit } = store.formBuilder()

//***********************Validateur*************************
const isFormValid = computed(() => {
  return form.value.name && form.value.modeId > 0
})

/**
 * Affiche le mode selectionner dans le titre
 */
const selectedMode = computed(() => {
  return modes$.value.find((m) => m.id === form.value.modeId)
})
</script>

<style scoped></style>
