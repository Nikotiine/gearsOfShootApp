<template>
  <h2 class="text-center mt-2 text-2xl">
    {{ t('factory.form.addTitle') }}
    <span class="text-blue-500">{{ t('factory.types.' + factoryType?.name) }}</span>
  </h2>
  <form @submit.prevent="submit">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
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
        <input-group-required-icon :is-validate="form.typeId > 0" />
        <input-group-select
          :options="factoryTypeViewModel"
          option-label="label"
          label="factory.type"
          @option-id="(event) => onChangeType(event)"
          required
          :disabled="isComeFormDrawer"
          input-id="typeId"
          :initial-value="form.typeId"
        />
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
import Textarea from 'primevue/textarea'
import Button from 'primevue/button'
import InputGroup from 'primevue/inputgroup'
import { type FactoryType, useFactoryStore } from '@/stores/factory'
import type { CreateFactoryDto } from '@/api/Api'
import { computed, ref, watch, watchEffect } from 'vue'
import { useI18n } from 'vue-i18n'
import InputGroupText from '@/components/__form/InputGroupText.vue'
import InputGroupRequiredIcon from '@/components/__form/InputGroupRequiredIcon.vue'
import InputGroupSelect from '@/components/__form/InputGroupSelect.vue'
import { storeToRefs } from 'pinia'
const store = useFactoryStore()
const { factoryTypes$ } = storeToRefs(store)
const emit = defineEmits(['onSave', 'changeType'])
const { t, locale } = useI18n()
const localeValue = ref(locale.value)
const { factory } = defineProps<{
  factory?: FactoryType
}>()

//*******************Init du formulaire*********************
const initialFactoryFormObject: CreateFactoryDto = {
  name: '',
  description: '',
  typeId: 1,
  reference: ''
}
const form = ref<CreateFactoryDto>({ ...initialFactoryFormObject })

/**
 * Lors du changement de type de marque, met a jour le formulaire et emet le nouveau label pour l'affichage du parent
 * @param id
 */
const onChangeType = (id: number) => {
  form.value.typeId = id
  emit('changeType', factoryType.value?.name)
}
//***********************Validateur*************************
const isFormValid = computed(() => {
  return !!form.value.name
})

/**
 * Sousmission du formulaire pour la creation d'une nouvelle marque
 * Emet un boolean onSave pour le drawer
 * Reinitialise le formulaire apres l'envoie
 */
const submit = () => {
  store.create.mutate(form.value)
  form.value = { ...initialFactoryFormObject }
  emit('onSave', true)
}

// Retourne le type courant selectionner (necessaire pour l'afiichage pre filtre de la liste complete des marque )
const factoryType = computed(() => {
  return factoryTypes$.value.find((f) => f.id === form.value.typeId)
})

/**
 * Creer un viewModel des types de marque pour la traduction multilingues
 */
const factoryTypeViewModel = computed(() => {
  return factoryTypes$.value.map((f) => {
    return {
      ...f,
      label: t('global.' + f.name)
    }
  })
})

/**
 * Surveille la langue pour la traductions des label des type de marques
 */
watch(
  () => locale.value,
  (value) => {
    localeValue.value = value
  }
)

const isComeFormDrawer = ref(false)
watchEffect(() => {
  const type = factoryTypes$.value.find((f) => f.name === factory)
  if (type) {
    form.value.typeId = type.id
    isComeFormDrawer.value = true
  }
})
</script>

<style scoped></style>
