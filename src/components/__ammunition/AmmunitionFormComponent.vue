<template>
  <div class="card">
    <h2 class="text-center mt-2 text-2xl">
      {{ t('ammunition.form.add') }} {{ selectedCategory?.name }}
    </h2>
    <form @submit.prevent="submit">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 p-4">
        <InputGroup>
          <input-group-required-icon :is-validate="form.categoryId > 0" />
          <input-group-select
            :options="categories$?.data"
            label="global.legalisationCategory"
            @option-id="(event) => (form.categoryId = event)"
            required
            input-id="categoryId"
            :initial-value="form.categoryId"
          />
        </InputGroup>

        <InputGroup>
          <input-group-required-icon :is-validate="form.caliberId > 0" />
          <input-group-select
            :options="calibers$"
            label="global.caliber"
            @option-id="(event) => (form.caliberId = event)"
            required
            filter
            input-id="caliberId"
            :initial-value="form.caliberId"
          />
          <input-group-addon-open-drawer-button type="caliber" />
        </InputGroup>

        <InputGroup>
          <input-group-required-icon :is-validate="form.factoryId > 0" />
          <input-group-select
            :options="factories$"
            label="global.factory"
            @option-id="(event) => (form.factoryId = event)"
            required
            filter
            input-id="factoryId"
            :initial-value="form.factoryId"
          />
          c
        </InputGroup>

        <InputGroup>
          <input-group-required-icon :is-validate="form.percussionTypeId > 0" />
          <input-group-select
            :options="store.prerequisitesAmmoList.data?.data.percussionTypes"
            label="global.percussionType"
            @option-id="(event) => (form.percussionTypeId = event)"
            required
            input-id="percussionTypeId"
            :initial-value="form.percussionTypeId"
          />
        </InputGroup>

        <InputGroup>
          <input-group-required-icon :is-validate="form.name.length >= 2" />
          <input-group-text
            @value="(value) => (form.name = value)"
            :min-length="2"
            placeholder="global.model"
            label="ammunition.form.ammunitionModel"
            required
            input-id="name"
            :initial-value="form.name"
          />
        </InputGroup>

        <InputGroup>
          <input-group-optional-icon :is-completed="form.initialSpeed > 0" />
          <input-group-number
            label="ammunition.form.initialSpeed"
            @value="(value) => (form.initialSpeed = value)"
            input-id="initialSpeed"
            :initial-value="form.initialSpeed"
          />
          <InputGroupAddon> m/s </InputGroupAddon>
        </InputGroup>

        <InputGroup>
          <input-group-required-icon :is-validate="form.headTypeId > 0" />
          <input-group-select
            :options="headTypes$"
            label="ammunition.form.headType"
            @option-id="(event) => (form.headTypeId = event)"
            required
            input-id="headTypeId"
            :initial-value="form.headTypeId"
          />
          <input-group-addon-open-drawer-button type="headType" />
        </InputGroup>

        <InputGroup>
          <input-group-required-icon :is-validate="form.bodyTypeId > 0" />
          <input-group-select
            :options="bodyTypes$"
            label="ammunition.form.bodyType"
            @option-id="(event) => (form.bodyTypeId = event)"
            required
            input-id="bodyTypeId"
            :initial-value="form.bodyTypeId"
          />
          <input-group-addon-open-drawer-button type="bodyType" />
        </InputGroup>

        <InputGroup>
          <input-group-optional-icon :is-completed="form.packaging > 0" />
          <input-group-number
            placeholder="ammunition.form.packaging"
            label="ammunition.form.packaging"
            @value="(value) => (form.packaging = value)"
            input-id="packaging"
            :initial-value="form.packaging"
          />
        </InputGroup>
      </div>

      <div class="p-4">
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

      <div class="text-center">
        <Button type="submit" :label="t('global.save')" :disabled="!isFormValid"></Button>
      </div>
    </form>
  </div>
</template>
<script setup lang="ts">
import Textarea from 'primevue/textarea'
import InputGroupAddon from 'primevue/inputgroupaddon'
import Button from 'primevue/button'
import InputGroup from 'primevue/inputgroup'

import { useAmmunitionStore } from '@/stores/ammunition'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import { type CreateAmmunitionDto } from '@/api/Api'
import { computed, ref } from 'vue'
import InputGroupSelect from '@/components/__form/InputGroupSelect.vue'
import InputGroupAddonOpenDrawerButton from '@/components/__form/InputGroupAddonOpenDrawerButton.vue'
import InputGroupRequiredIcon from '@/components/__form/InputGroupRequiredIcon.vue'
import InputGroupText from '@/components/__form/InputGroupText.vue'
import InputGroupOptionalIcon from '@/components/__form/InputGroupOptionalIcon.vue'
import InputGroupNumber from '@/components/__form/InputGroupNumber.vue'
import { useFactoryStore } from '@/stores/factory'
import { useCaliberStore } from '@/stores/caliber'
import { useHeadTypeStore } from '@/stores/headType'
import { useBodyTypeStore } from '@/stores/bodyType'
import { useWeaponCategoryStore } from '@/stores/weapon-category'
const { t } = useI18n()
const store = useAmmunitionStore()
const factoryStore = useFactoryStore()
factoryStore.setTypeOfFactories('ammunition')
const caliberStore = useCaliberStore()
const headTypeStore = useHeadTypeStore()
const bodyTypeStore = useBodyTypeStore()
const categorieStore = useWeaponCategoryStore()
const { factories$ } = storeToRefs(factoryStore)
const { calibers$ } = storeToRefs(caliberStore)
const { headTypes$ } = storeToRefs(headTypeStore)
const { bodyTypes$ } = storeToRefs(bodyTypeStore)
const { data: categories$, isLoading: categorieStoreGetallIsLoading } = categorieStore.getAll()
const initialCreateAmmunitionFormObject: CreateAmmunitionDto = {
  bodyTypeId: 0,
  caliberId: 0,
  factoryId: 0,
  name: '',
  categoryId: 0,
  initialSpeed: 0,
  description: '',
  packaging: 50,
  headTypeId: 0,
  percussionTypeId: 0
}
const form = ref<CreateAmmunitionDto>({
  ...initialCreateAmmunitionFormObject
})

const isFormValid = computed(() => {
  let isValid: boolean = false
  if (
    form.value.name &&
    form.value.factoryId > 0 &&
    form.value.caliberId > 0 &&
    form.value.headTypeId > 0 &&
    form.value.bodyTypeId > 0
  ) {
    isValid = true
  }
  return isValid
})
const submit = () => {
  store.create.mutate(form.value)
  form.value = { ...initialCreateAmmunitionFormObject }
}
const selectedCategory = computed(() => {
  return categories$.value?.data.find((category) => category.id === form.value.categoryId)
})
</script>

<style scoped></style>
