<template>
  <div class="card">
    <h2 class="text-center mt-2 text-2xl">{{ t('optic.form.addTitle') }}</h2>
    <form @submit.prevent="submit">
      <div
        class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4"
        v-if="store.prerequisiteOpticQuery.isSuccess"
      >
        <InputGroup>
          <input-group-required-icon :is-validate="form.factoryId > 0" />
          <input-group-select
            :options="store.prerequisiteOpticQuery.data.data.factories"
            type="factory"
            @option-id="(event) => (form.factoryId = event)"
            required
            filter
            input-id="factoryId"
            :initial-value="form.factoryId"
          />
          <!--          <input-group-addon-open-drawer-button type="factory" :open-drawer="openDrawer" />-->
        </InputGroup>

        <InputGroup>
          <input-group-required-icon :is-validate="form.opticTypeId > 0" />
          <input-group-select
            :options="store.prerequisiteOpticQuery.data.data.types"
            type="opticType"
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
            :options="store.prerequisiteOpticQuery.data.data.focalPlanes"
            type="focalPlane"
            @option-id="(event) => (form.focalPlaneId = event)"
            required
            input-id="focalPlaneId"
            :initial-value="form.focalPlaneId"
          />
          <!--          <input-group-addon-open-drawer-button type="factory" :open-drawer="openDrawer" />-->
        </InputGroup>

        <InputGroup>
          <input-group-required-icon :is-validate="form.name.length >= 3" />
          <input-group-text
            @value="(value) => (form.name = value)"
            :min-length="3"
            placeholder="opticModel"
            label="opticModel"
            required
            input-id="name"
            :initial-value="form.name"
          />
        </InputGroup>

        <InputGroup>
          <input-group-required-icon :is-validate="form.opticUnitId > 0" />
          <input-group-select
            :options="store.prerequisiteOpticQuery.data.data.units"
            type="opticUnit"
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
            type="clickValue"
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
            placeholder="minZoom"
            label="minZoom"
            required
            @value="(value) => (form.minZoom = value)"
            input-id="minZoom"
            :initial-value="form.minZoom"
          />

          <input-group-number
            :min="form.minZoom + 1"
            placeholder="maxZoom"
            label="maxZoom"
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
            placeholder="max"
            label="maxDrift"
            required
            @value="(value) => (form.maxDrift = value)"
            input-id="maxDrift"
            :initial-value="form.maxDrift"
          />

          <input-group-number
            :min="0"
            placeholder="max"
            label="maxElevation"
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
            placeholder="diameter"
            label="lensDiameter"
            required
            @value="(value) => (form.lensDiameter = value)"
            input-id="lensDiameter"
            :initial-value="form.lensDiameter"
          />
          <InputGroupAddon>mm</InputGroupAddon>
          <input-group-number
            :min="0"
            placeholder="diameter"
            label="bodyDiameter"
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
            placeholder="length"
            label="length"
            @value="(value) => (form.length = value)"
            input-id="length"
            :initial-value="form.length"
          />
          <InputGroupAddon><span>cm</span></InputGroupAddon>
        </InputGroup>

        <InputGroup>
          <input-group-required-icon :is-validate="form.eyeRelief > 0" />
          <input-group-number
            placeholder="eyeRelief"
            label="eyeRelief"
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
            label="isParallax"
            @checked="(event) => (form.isParallax = event)"
            :checked="form.isParallax"
            is-width-half-size
          />
          <InputGroupAddon>de</InputGroupAddon>
          <input-group-number
            :min="0"
            placeholder="min"
            label="minParallax"
            required
            @value="(value) => (form.minParallax = value)"
            input-id="minParallax"
            :initial-value="form.minParallax"
            :disabled="!form.isParallax"
          />
          <InputGroupAddon>a</InputGroupAddon>
          <input-group-number
            :min="0"
            placeholder="max"
            label="maxParallax"
            required
            @value="(value) => (form.maxParallax = value)"
            input-id="maxParallax"
            :disabled="!form.isParallax"
            :initial-value="form.maxParallax"
          />
          <InputGroupAddon>yard</InputGroupAddon>
        </InputGroup>

        <InputGroup>
          <input-group-optional-icon />
          <input-group-check-box
            input-id="isCollarsProvided"
            label="isCollarsProvided"
            @checked="(event) => (form.isCollarsProvided = event)"
            :checked="form.isCollarsProvided"
          />
          <input-group-select
            :options="store.prerequisiteOpticQuery.data.data.opticCollars"
            type="collar"
            @option-id="(event) => (form.providedCollarId = event)"
            input-id="providedCollarId"
            :initial-value="form.providedCollarId ?? 0"
            :disabled="!form.isCollarsProvided"
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
        <Button type="submit" :label="t('global.save')" :disabled="!isFormValid"></Button>
      </div>
    </form>
  </div>
</template>
<script setup lang="ts">
import { type CreateOpticDto } from '@/api/Api'
import { computed, ref } from 'vue'
import { useOpticStore } from '@/stores/optic'
import InputGroup from 'primevue/inputgroup'
import Textarea from 'primevue/textarea'
import Button from 'primevue/button'
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
import InputGroupMultiSelect from '@/components/__form/InputGroupMultiSelect.vue'
const store = useOpticStore()
const { units$ } = storeToRefs(store)
const { t } = useI18n()
const initialCreateOpticFormObject: CreateOpticDto = {
  name: '',
  bodyDiameter: 0,
  description: '',
  factoryId: 0,
  maxDrift: 0,
  maxElevation: 0,
  isParallax: false,
  minZoom: 0,
  maxZoom: 0,
  minParallax: 0,
  maxParallax: 0,
  lensDiameter: 0,
  valueOfOneClick: 0,
  focalPlaneId: 0,
  opticUnitId: 0,
  opticTypeId: 0,
  eyeRelief: 0,
  isCollarsProvided: false,
  length: 0,
  providedCollarId: null
}
const form = ref<CreateOpticDto>({
  ...initialCreateOpticFormObject
})
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
  store.create.mutate(form.value)
  form.value = { ...initialCreateOpticFormObject }
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
</script>

<style scoped></style>
