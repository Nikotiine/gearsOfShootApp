<template>
  <div class="card">
    <h2 class="text-center mt-2 text-2xl">{{ t('optic.save') }}</h2>
    <form @submit.prevent="submit">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4" v-if="storesAreLoaded">
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
          <input-group-addon-open-drawer-button type="factory" factory-type="optic" />
        </InputGroup>

        <InputGroup>
          <input-group-required-icon :is-validate="form.opticTypeId > 0" />
          <input-group-select
            :options="store.prerequisiteOpticQuery.data.data.types"
            label="optic.opticType"
            @option-id="(event) => (form.opticTypeId = event)"
            required
            filter
            input-id="opticTypeId"
            :initial-value="form.opticTypeId"
          />
          <!--          <input-group-addon-open-drawer-button type="factory" :open-drawer="openDrawer" />-->
        </InputGroup>
        <InputGroup>
          <input-group-required-icon :is-validate="form.focalPlaneId > 0" />
          <input-group-select
            :options="store.prerequisiteOpticQuery.data?.data.focalPlanes"
            label="optic.focalPlane"
            @option-id="(event) => (form.focalPlaneId = event)"
            required
            input-id="focalPlaneId"
            :initial-value="form.focalPlaneId"
          />
        </InputGroup>

        <InputGroup>
          <input-group-required-icon :is-validate="form.name.length >= 3" />
          <input-group-text
            @value="(value) => (form.name = value)"
            :min-length="3"
            placeholder="global.model"
            label="optic.opticModel"
            required
            input-id="name"
            :initial-value="form.name"
          />
        </InputGroup>

        <InputGroup>
          <input-group-required-icon :is-validate="form.opticUnitId > 0" />
          <input-group-select
            :options="store.prerequisiteOpticQuery.data?.data.units"
            label="optic.opticUnit"
            @option-id="(event) => (form.opticUnitId = event)"
            required
            input-id="opticUnitId"
            :initial-value="form.opticUnitId"
          />
        </InputGroup>

        <InputGroup>
          <input-group-required-icon :is-validate="form.valueOfOneClick > 0" />
          <input-group-select
            :options="clickValueOption"
            label="optic.clickValue"
            @option-id="(event) => (form.valueOfOneClick = event)"
            required
            input-id="valueOfOneClick"
            :initial-value="form.valueOfOneClick"
            :disabled="form.opticUnitId === 0"
          />
        </InputGroup>
        <InputGroup>
          <input-group-required-icon
            :is-validate="form.minZoom > 0 && form.maxZoom > form.minZoom"
          />
          <input-group-number
            :min="0"
            label="optic.minZoom"
            required
            @value="(value) => (form.minZoom = value)"
            input-id="minZoom"
            :initial-value="form.minZoom"
          />

          <input-group-number
            :min="form.minZoom + 1"
            label="optic.maxZoom"
            required
            @value="(value) => (form.maxZoom = value)"
            input-id="maxZoom"
            :initial-value="form.maxZoom"
          />
        </InputGroup>

        <InputGroup>
          <input-group-required-icon :is-validate="form.maxDrift > 0 && form.maxElevation > 0" />
          <input-group-number
            :min="0"
            label="optic.maxDrift"
            required
            @value="(value) => (form.maxDrift = value)"
            input-id="maxDrift"
            :initial-value="form.maxDrift"
          />

          <input-group-number
            :min="0"
            label="optic.maxElevation"
            required
            @value="(value) => (form.maxElevation = value)"
            input-id="maxElevation"
            :initial-value="form.maxElevation"
          />
          <InputGroupAddon>moa</InputGroupAddon>
        </InputGroup>

        <InputGroup>
          <input-group-required-icon
            :is-validate="form.lensDiameter > 0 && form.bodyDiameter > 0"
          />
          <input-group-number
            :min="0"
            label="optic.lensDiameter"
            required
            @value="(value) => (form.lensDiameter = value)"
            input-id="lensDiameter"
            :initial-value="form.lensDiameter"
          />
          <InputGroupAddon>mm</InputGroupAddon>
          <input-group-number
            :min="0"
            label="optic.bodyDiameter"
            required
            @value="(value) => (form.bodyDiameter = value)"
            input-id="bodyDiameter"
            :initial-value="form.bodyDiameter"
          />
          <InputGroupAddon>mm</InputGroupAddon>
        </InputGroup>

        <InputGroup>
          <input-group-required-icon :is-validate="form.length > 0" />
          <input-group-number
            label="global.length"
            @value="(value) => (form.length = value)"
            input-id="length"
            :initial-value="form.length"
          />
          <InputGroupAddon><span>cm</span></InputGroupAddon>
        </InputGroup>

        <InputGroup>
          <input-group-required-icon :is-validate="form.eyeRelief > 0" />
          <input-group-number
            label="optic.eyeRelief"
            @value="(value) => (form.eyeRelief = value)"
            input-id="eyeRelief"
            :initial-value="form.eyeRelief"
          />
          <InputGroupAddon><span>cm</span></InputGroupAddon>
        </InputGroup>

        <InputGroup>
          <input-group-optional-icon />
          <input-group-check-box
            input-id="isParallax"
            tool-tip="optic.isParallax"
            label="optic.isParallax"
            @checked="(event) => (form.isParallax = event)"
            :checked="form.isParallax"
            is-width-half-size
          />
          <InputGroupAddon>{{ t('global.from') }}</InputGroupAddon>
          <input-group-number
            :min="0"
            label="optic.minParallax"
            required
            @value="(value) => (form.minParallax = value)"
            input-id="minParallax"
            :initial-value="form.minParallax"
            :disabled="!form.isParallax"
          />
          <InputGroupAddon>{{ t('global.to') }}</InputGroupAddon>
          <input-group-number
            :min="0"
            label="optic.maxParallax"
            required
            @value="(value) => (form.maxParallax = value)"
            input-id="maxParallax"
            :disabled="!form.isParallax"
            :initial-value="form.maxParallax"
          />
          <InputGroupAddon>yard</InputGroupAddon>
        </InputGroup>

        <InputGroup class="h-14">
          <input-group-optional-icon />
          <input-group-check-box
            input-id="isCollarsProvided"
            label="optic.isCollarsProvided"
            @checked="(event) => (form.isCollarsProvided = event)"
            :checked="form.isCollarsProvided"
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
      <div class="text-red-500 p-4" v-if="store.create.isError">
        <p class="text-xl font-bold">
          {{ t('error.' + store.create.error.response.data.message) }}
        </p>
      </div>

      <div class="text-center">
        <save-button :status="formStatus" :disabled="!isFormValid" />
      </div>
    </form>
  </div>
</template>
<script setup lang="ts">
import { type CreateOpticDto, type UpdateOpticDto } from '@/api/Api'
import { computed } from 'vue'
import { useOpticStore } from '@/stores/optic'
import InputGroup from 'primevue/inputgroup'
import Textarea from 'primevue/textarea'
import InputGroupAddon from 'primevue/inputgroupaddon'
import { useI18n } from 'vue-i18n'
import { storeToRefs } from 'pinia'
import InputGroupSelect from '@/components/__form/InputGroupSelect.vue'
import InputGroupAddonOpenDrawerButton from '@/components/__form/InputGroupAddonOpenDrawerButton.vue'
import InputGroupRequiredIcon from '@/components/__form/InputGroupRequiredIcon.vue'
import InputGroupText from '@/components/__form/InputGroupText.vue'
import InputGroupNumber from '@/components/__form/InputGroupNumber.vue'
import InputGroupCheckBox from '@/components/__form/InputGroupCheckBox.vue'
import InputGroupOptionalIcon from '@/components/__form/InputGroupOptionalIcon.vue'
import { useFactoryStore } from '@/stores/factory'
import type { FormStatus } from '@/types/form-status.type'
import SaveButton from '@/components/__form/SaveButton.vue'

const store = useOpticStore()
const factoryStore = useFactoryStore()
const { isSuccess: factoriesQueryIsSuccess } = factoryStore.getFactoriesByType('optic')
const { factories$ } = storeToRefs(factoryStore)
const { units$ } = storeToRefs(store)
const { t } = useI18n()

const { id } = defineProps<{
  id?: string
  formStatus: FormStatus
}>()
const { form, resetForm } = store.formBuilder(id)
const isFormValid = computed(() => {
  let isValid: boolean = false
  if (
    form.value.name &&
    form.value.factoryId > 0 &&
    form.value.opticTypeId > 0 &&
    form.value.focalPlaneId > 0 &&
    form.value.bodyDiameter > 0 &&
    form.value.lensDiameter > 0 &&
    form.value.valueOfOneClick > 0
  ) {
    isValid = true
  }
  return isValid
})
const submit = () => {
  if (id) {
    edit({ ...form.value, id: parseInt(id) })
  } else {
    create(form.value)
  }
}

const create = (optic: CreateOpticDto) => {
  store.create.mutate(optic)
  resetForm()
}
const edit = (optic: UpdateOpticDto) => {
  store.edit.mutate(optic)
}
const clickValueOption = computed(() => {
  const moaOptions = [
    { id: 1, name: '1/8' },
    { id: 2, name: '1/4' },
    { id: 3, name: '1/2' }
  ]
  const mradOptions = [{ id: 1, name: '1/10' }]
  const opticUnit = units$.value.find((u) => u.id === form.value.opticUnitId)
  if (opticUnit && opticUnit.name === 'MOA') {
    return moaOptions
  } else {
    return mradOptions
  }
})
const storesAreLoaded = computed(() => {
  return store.prerequisiteOpticQuery.isSuccess && factoriesQueryIsSuccess
})
</script>

<style scoped></style>
