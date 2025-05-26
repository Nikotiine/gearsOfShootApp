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

        <InputGroup>
          <input-group-required-icon :is-validate="form.length > 0" />
          <input-group-number
            :min="0"
            label="length"
            required
            @value="(value) => (form.length = value)"
            input-id="length"
            :initial-value="form.length"
          />
        </InputGroup>
        <InputGroup>
          <input-group-required-icon :is-validate="form.width > 0" />
          <input-group-number
            :min="0"
            label="width"
            required
            @value="(value) => (form.width = value)"
            input-id="width"
            :initial-value="form.width"
          />
        </InputGroup>
        <InputGroup>
          <input-group-required-icon :is-validate="form.height > 0" />
          <input-group-number
            :min="0"
            label="height"
            required
            @value="(value) => (form.height = value)"
            input-id="height"
            :initial-value="form.height"
          />
        </InputGroup>
        <InputGroup>
          <input-group-required-icon :is-validate="form.capacity > 0" />
          <input-group-number
            :min="0"
            label="capacity"
            required
            @value="(value) => (form.capacity = value)"
            input-id="capacity"
            :initial-value="form.capacity"
          />
        </InputGroup>
        <InputGroup>
          <input-group-optional-icon :is-completed="selectedCompatibleWeapon.length > 0" />
          <input-group-multi-select
            input-id="compatibleWeaponOptions"
            label="magazine.compatibleWeaponOptions"
            :options="options"
            :disabled="true"
            @selected-options="(event) => (selectedCompatibleWeapon = event)"
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

      <div class="text-center">
        <save-button :status="formStatus" :disabled="!isFormValid" />
      </div>
    </form>
  </div>
</template>
<script setup lang="ts">
import { useWeaponMagazineStore } from '@/stores/weapon-magazine'
import type { HandGunDto, RiffleDto } from '@/api/Api'
import { computed, ref, watch } from 'vue'
import InputGroup from 'primevue/inputgroup'
import InputGroupRequiredIcon from '@/components/__form/InputGroupRequiredIcon.vue'
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

interface VM {
  name: string
  id: number
  caliberId: number
}
const { id, formStatus } = defineProps<{
  id?: string
  formStatus: FormStatus
}>()
const store = useWeaponMagazineStore()

const { form, submit } = store.builder(id)
const riffles$ = ref<RiffleDto[]>([])
const handguns$ = ref<HandGunDto[]>([])
const { t } = useI18n()

const selectedCompatibleWeapon = ref<number[]>([])
const compatibleWeaponOptions = ref<VM[]>([])
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
  let options = compatibleWeaponOptions.value
  if (form.value.caliber.id > 0) {
    options = options.filter((option) => option.caliberId === form.value.caliber.id)
  }

  return options
})

watch(
  () => riffles$.value,
  (value) => {
    compatibleWeaponOptions.value = value.map((riffle) => {
      return {
        id: riffle.id,
        name: riffle.name,
        caliberId: riffle.caliber.id
      }
    })
  }
)
watch(
  () => handguns$.value,
  (value) => {
    compatibleWeaponOptions.value = value.map((handgun) => {
      return {
        id: handgun.id,
        name: handgun.name,
        caliberId: handgun.caliber.id
      }
    })
  }
)
</script>

<style scoped></style>
