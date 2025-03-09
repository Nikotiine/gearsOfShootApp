<template>
  <h2 class="text-center mt-2 text-2xl">
    {{ t('opticCollar.form.addTitle') }}
  </h2>
  <form @submit.prevent="submit" v-if="storeAreLoaded">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      <InputGroup>
        <input-group-required-icon :is-validate="form.name.length >= 3" />
        <input-group-text
          @value="(value) => (form.name = value)"
          :min-length="3"
          placeholder="global.model"
          label="global.model"
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
          label="factory.type"
          @option-id="(event) => (form.factoryId = event)"
          required
          input-id="factoryId"
          :initial-value="form.factoryId"
        /> </InputGroup
      ><InputGroup>
        <input-group-required-icon :is-validate="form.railSizeId > 0" />
        <input-group-select
          :options="railSize$?.data"
          option-label="name"
          label="global.opticRail"
          @option-id="(event) => (form.railSizeId = event)"
          required
          input-id="railSizeId"
          :initial-value="form.railSizeId"
        />
      </InputGroup>
      <InputGroup>
        <input-group-optional-icon :is-completed="form.height > 0" />
        <input-group-number
          label="global.height"
          @value="(value) => (form.height = value)"
          input-id="height"
          :initial-value="form.height"
        />
        <InputGroupAddon> mm </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <input-group-optional-icon :is-completed="form.diameter > 0" />
        <input-group-number
          label="global.diameter"
          @value="(value) => (form.diameter = value)"
          input-id="diameter"
          :initial-value="form.diameter"
        />
        <InputGroupAddon> mm </InputGroupAddon>
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
import type { CreateOpticCollarDto, OpticCollarDto } from '@/api/Api'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import InputGroupRequiredIcon from '@/components/__form/InputGroupRequiredIcon.vue'
import InputGroupSelect from '@/components/__form/InputGroupSelect.vue'
import Button from 'primevue/button'
import InputGroup from 'primevue/inputgroup'
import Textarea from 'primevue/textarea'
import InputGroupText from '@/components/__form/InputGroupText.vue'
import InputGroupNumber from '@/components/__form/InputGroupNumber.vue'
import InputGroupOptionalIcon from '@/components/__form/InputGroupOptionalIcon.vue'
import InputGroupAddon from 'primevue/inputgroupaddon'
import { useFactoryStore } from '@/stores/factory'
import { useRailSizeStore } from '@/stores/rail-size'
import { useOpticCollarStore } from '@/stores/optic-collar'

const { t } = useI18n()
const store = useOpticCollarStore()
const factoryStore = useFactoryStore()
const railSizeStore = useRailSizeStore()
const { data: factories$, isSuccess: factoriesQueryIsSuccess } =
  factoryStore.getFactoriesByType('accessory')
const { data: railSize$, isSuccess: railSizeQueryIsSucess } = railSizeStore.getAll()

const { collar } = defineProps<{
  collar?: OpticCollarDto
}>()
const initialForm: CreateOpticCollarDto = {
  diameter: 0,
  factoryId: 0,
  height: 0,
  name: '',
  railSizeId: 0,
  description: ''
}
const form = ref<CreateOpticCollarDto>({ ...initialForm })
const submit = () => {
  if (collar) {
    update({ ...form.value, id: collar.id })
  } else {
    create(form.value)
  }
}
const create = (collar: CreateOpticCollarDto) => {
  store.create.mutate(collar)
  form.value = { ...initialForm }
}
const update = (collar: any) => {
  console.log(collar)
}
const storeAreLoaded = computed(() => {
  return factoriesQueryIsSuccess && railSizeQueryIsSucess
})
const isFormValid = computed(() => {
  let isValid: boolean = false
  if (
    form.value.name &&
    form.value.factoryId > 0 &&
    form.value.railSizeId > 0 &&
    form.value.height > 0 &&
    form.value.diameter > 0
  ) {
    isValid = true
  }
  return isValid
})
</script>

<style scoped></style>
