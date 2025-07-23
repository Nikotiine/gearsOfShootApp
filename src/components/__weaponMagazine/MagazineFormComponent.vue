<template>
  <div class="card">
    <h2 class="text-center mt-2 text-2xl">{{ t('magazine.' + formStatus) }}</h2>
    <form @submit.prevent="submit">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        <factory-input-select
          :initial-value="form.factory.id"
          can-add-new
          factory-type="magazine"
          @on-select="(event) => (form.factory = event)"
        />
        <weapon-type-input-select
          can-add-new
          required
          @on-select="(event) => (form.weaponType = event)"
          :initial-value="form.weaponType.id"
        />

        <legalisation-category-input-select
          required
          @on-select="(event) => (form.category = event)"
          :initial-value="form.category.id"
        />

        <caliber-input-select
          :initial-value="form.caliber.id"
          can-add-new
          @on-select="(event) => (form.caliber = event)"
        />

        <material-input-select
          @on-select="(event) => (form.body = event)"
          :initial-value="form.body.id"
          can-add-new
          label="bodyMaterial"
          placeholder="bodyMaterial"
          input-id="bodyMaterial"
        />

        <input-group-number
          :min="0"
          label="length"
          required
          @value="(value) => (form.length = value)"
          input-id="length"
          :initial-value="form.length"
          add-on="cm"
        />

        <input-group-number
          :min="0"
          label="width"
          required
          @value="(value) => (form.width = value)"
          input-id="width"
          :initial-value="form.width"
          add-on="cm"
        />

        <input-group-number
          :min="0"
          label="height"
          required
          @value="(value) => (form.height = value)"
          input-id="height"
          :initial-value="form.height"
          add-on="cm"
        />

        <input-group-number
          :min="0"
          label="capacity"
          required
          @value="(value) => (form.capacity = value)"
          input-id="capacity"
          :initial-value="form.capacity"
          add-on="cps"
        />

        <InputGroup>
          <input-group-optional-icon :is-completed="selectedCompatibleWeapon.length > 0" />
          <input-group-multi-select
            input-id="compatibleWeaponOptions"
            label="compatibleWeaponOptions"
            i18n-prefix="magazine."
            :options="options"
            :disabled="options.length < 1"
            @selected-options="(event) => onSelectCompatibleWeapons(event)"
            :initial-value="selectedCompatibleWeapon"
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
          :placeholder="t('global.description')"
        />
      </div>
      <price-history-form
        :price-history-form="form.priceHistory"
        @update:price-history-form="(value) => (form.priceHistory = value)"
      />
      <div class="text-center">
        <save-button :status="formStatus" :disabled="!isFormValid" />
      </div>
    </form>
  </div>
</template>
<script setup lang="ts">
import { useWeaponMagazineStore } from '@/stores/weapon-magazine'

import { computed, ref, watch } from 'vue'
import InputGroup from 'primevue/inputgroup'
import InputGroupNumber from '@/components/__form/InputGroupNumber.vue'
import Textarea from 'primevue/textarea'
import { useI18n } from 'vue-i18n'
import InputGroupMultiSelect from '@/components/__form/InputGroupMultiSelect.vue'
import InputGroupOptionalIcon from '@/components/__form/InputGroupOptionalIcon.vue'
import type { FormStatus } from '@/types/form-status.type'
import SaveButton from '@/components/__form/SaveButton.vue'
import FactoryInputSelect from '@/components/__form/__specific_select/FactoryInputSelect.vue'
import WeaponTypeInputSelect from '@/components/__form/__specific_select/WeaponTypeInputSelect.vue'
import LegalisationCategoryInputSelect from '@/components/__form/__specific_select/LegalisationCategoryInputSelect.vue'
import CaliberInputSelect from '@/components/__form/__specific_select/CaliberInputSelect.vue'
import MaterialInputSelect from '@/components/__form/__specific_select/MaterialInputSelect.vue'
import { storeToRefs } from 'pinia'
import PriceHistoryForm from '@/components/__form/PriceHistoryForm.vue'

const { id, formStatus } = defineProps<{
  id?: string
  formStatus: FormStatus
}>()
const store = useWeaponMagazineStore()

const { form, submit } = store.builder(id)

const { t } = useI18n()
const { compatibleWeapons$ } = storeToRefs(store)
const selectedCompatibleWeapon = ref<any>([])

const isFormValid = computed(() => {
  let isValid: boolean = false
  if (
    form.value.factory.id > 0 &&
    form.value.caliber.id > 0 &&
    form.value.body.id > 0 &&
    form.value.capacity > 0 &&
    form.value.width > 0 &&
    form.value.height > 0 &&
    form.value.length > 0
  ) {
    isValid = true
  }
  return isValid
})

const options = computed(() => {
  let options = compatibleWeapons$.value
  if (form.value.caliber.id > 0) {
    options = options.filter((option: any) => option.caliber.id === form.value.caliber.id)
  }
  return options
})

const onSelectCompatibleWeapons = (weapons: any) => {
  if (form.value.weaponType.type === 'handgun') {
    form.value.compatibleHandGun = weapons
  }
  if (form.value.weaponType.type === 'riffle') {
    form.value.compatibleRiffle = weapons
  }
}

watch(
  () => [form.value.weaponType.type, form.value.category.name],
  (value) => {
    const type = value[0]
    const category = value[1]
    if (type && category) {
      store.fetchCompatibleWeapons(category, type)
    }
  }
)
</script>

<style scoped></style>
