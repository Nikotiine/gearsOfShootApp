<template>
  <div class="card">
    <h2 class="text-center mt-2 text-2xl">{{ t('magazine.form.add') }}</h2>
    <form @submit.prevent="submit" v-if="storesAreLoaded">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        <InputGroup>
          <input-group-required-icon :is-validate="form.factoryId > 0" />
          <input-group-select
            :options="factories$?.data"
            label="global.factory"
            @option-id="(event) => (form.factoryId = event)"
            required
            filter
            input-id="factoryId"
            :initial-value="form.factoryId"
          />
          <input-group-addon-open-drawer-button type="factory" factory-type="magazine" />
        </InputGroup>
        <InputGroup>
          <input-group-required-icon :is-validate="form.weaponTypeId > 0" />
          <input-group-select
            :options="weaponTypes$?.data"
            label="global.weaponType"
            @option-id="(event) => selectWeaponType(event)"
            required
            filter
            input-id="typeId"
            :initial-value="form.weaponTypeId"
          />
          <input-group-addon-open-drawer-button type="weaponType" />
        </InputGroup>
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
            :options="calibers$?.data"
            label="global.caliber"
            @option-id="(event) => (form.caliberId = event)"
            required
            filter
            input-id="opticTypeId"
            :initial-value="form.caliberId"
          />
          <input-group-addon-open-drawer-button type="caliber" />
        </InputGroup>
        <InputGroup>
          <input-group-required-icon :is-validate="form.bodyId > 0" />
          <input-group-select
            :options="materials$?.data"
            label="magazine.form.bodyMaterial"
            @option-id="(event) => (form.bodyId = event)"
            required
            input-id="bodyId"
            :initial-value="form.bodyId"
          />
          <input-group-addon-open-drawer-button type="material" />
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
          <input-group-required-icon :is-validate="form.length > 0" />
          <input-group-number
            :min="0"
            label="global.length"
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
            label="global.width"
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
            label="global.height"
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
            label="magazine.form.capacity"
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
            label="magazine.form.compatibleWeaponOptions"
            :options="options"
            :disabled="disabledMultiSelect"
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
      <div class="text-red-500 p-4" v-if="store.create.isError">
        <p class="text-xl font-bold">
          {{ t('error.' + store.create.error.response.data.message) }}
        </p>
      </div>

      <div class="text-center">
        <Button type="submit" :label="t(buttonLabel)" :disabled="!isFormValid"></Button>
      </div>
    </form>
  </div>
</template>
<script setup lang="ts">
import { useWeaponMagazineStore } from '@/stores/weapon-magazine'
import type {
  CreateWeaponMagazineDto,
  HandGunDto,
  RiffleDto,
  UpdateWeaponMagazineDto,
  WeaponMagazineDto,
  WeaponTypeDto
} from '@/api/Api'
import { computed, ref, watch, watchEffect } from 'vue'
import Button from 'primevue/button'
import InputGroup from 'primevue/inputgroup'
import InputGroupRequiredIcon from '@/components/__form/InputGroupRequiredIcon.vue'
import InputGroupSelect from '@/components/__form/InputGroupSelect.vue'
import InputGroupNumber from '@/components/__form/InputGroupNumber.vue'
import Textarea from 'primevue/textarea'
import InputGroupText from '@/components/__form/InputGroupText.vue'
import { useI18n } from 'vue-i18n'
import InputGroupAddonOpenDrawerButton from '@/components/__form/InputGroupAddonOpenDrawerButton.vue'
import { useWeaponTypeStore } from '@/stores/weaponType'
import InputGroupMultiSelect from '@/components/__form/InputGroupMultiSelect.vue'
import InputGroupOptionalIcon from '@/components/__form/InputGroupOptionalIcon.vue'
import { useRiffleStore } from '@/stores/riffle'
import { useHandGunStore } from '@/stores/hand-gun'
import { useFactoryStore } from '@/stores/factory'
import { useCaliberStore } from '@/stores/caliber'
import { useMaterialStore } from '@/stores/material'
import { storeToRefs } from 'pinia'
import { useWeaponCategoryStore } from '@/stores/weapon-category'

interface VM {
  name: string
  id: number
  caliberId: number
}

const store = useWeaponMagazineStore()
const riffleStore = useRiffleStore()
const caliberStore = useCaliberStore()
const handGunStore = useHandGunStore()
const factoryStore = useFactoryStore()
const weaponTypeStore = useWeaponTypeStore()
const materialStore = useMaterialStore()
const categoryStore = useWeaponCategoryStore()
const { data: categories$, isSuccess: categoriesQueryIsSuccess } = categoryStore.getAll()
const { data: calibers$, isSuccess: calibersQueryIsSuccess } = caliberStore.getAll()
const { data: weaponTypes$, isSuccess: weaponTypesQueryIsSuccess } = weaponTypeStore.getAll()
const { data: factories$, isSuccess: factoriesQueryIsSuccess } =
  factoryStore.getFactoriesByType('magazine')
const { data: materials$, isSuccess: materialsQueryIsSuccess } = materialStore.getAll()

const riffles$ = ref<RiffleDto[]>([])
const handguns$ = ref<HandGunDto[]>([])

const buttonLabel = ref('global.save')

const { t } = useI18n()
const initialFormObject: CreateWeaponMagazineDto = {
  description: '',
  width: 0,
  height: 0,
  bodyId: 0,
  factoryId: 0,
  reference: '',
  capacity: 0,
  caliberId: 0,
  length: 0,
  categoryId: 0,
  compatibleHandGun: [],
  compatibleRiffle: [],
  weaponTypeId: 0
}
const form = ref<CreateWeaponMagazineDto>({ ...initialFormObject })
const selectedCompatibleWeapon = ref<number[]>([])
const compatibleWeaponOptions = ref<VM[]>([])
const isFormValid = computed(() => {
  let isValid: boolean = false
  if (
    form.value.reference &&
    form.value.factoryId > 0 &&
    form.value.caliberId > 0 &&
    form.value.bodyId > 0 &&
    form.value.capacity > 0 &&
    form.value.width > 0 &&
    form.value.height > 0 &&
    form.value.length > 0
  ) {
    isValid = true
  }
  return isValid
})

const { magazine = null } = defineProps<{
  magazine?: WeaponMagazineDto
}>()

const options = computed(() => {
  let options = compatibleWeaponOptions.value
  if (form.value.caliberId > 0) {
    options = options.filter((option) => option.caliberId === form.value.caliberId)
  }

  return options
})

const selectWeaponType = (id: number) => {
  form.value.weaponTypeId = id

  if (isRiffleWeapon.value) {
    riffles$.value = riffleStore.getAll()
  } else {
    handguns$.value = handGunStore.getAll()
  }
}

const submit = () => {
  const ids = selectedCompatibleWeapon.value
  isRiffleWeapon.value
    ? (form.value.compatibleRiffle = findCompatibleRiffle(ids))
    : (form.value.compatibleHandGun = findCompatibleHangun(ids))
  if (!magazine) {
    create(form.value)
    form.value = { ...initialFormObject }
  } else {
    edit({ ...form.value, id: magazine.id })
  }
}

const create = (magazine: CreateWeaponMagazineDto) => {
  store.create.mutate(magazine)
}

const edit = (magazine: UpdateWeaponMagazineDto) => {
  store.edit.mutate(magazine)
}

const findCompatibleRiffle = (ids: number[]): RiffleDto[] => {
  return riffles$.value.filter((riffle) => ids.includes(riffle.id))
}
const findCompatibleHangun = (ids: number[]): HandGunDto[] => {
  return handguns$.value.filter((handgun) => ids.includes(handgun.id))
}

const isRiffleWeapon = computed(() => {
  const isRiffleWeapon = ref<boolean>(true)
  let weaponType: WeaponTypeDto | undefined = undefined
  if (weaponTypes$.value) {
    weaponType = weaponTypes$.value.data.find((w) => w.id === form.value.weaponTypeId)
  }

  if (weaponType && (weaponType.name === 'Pistolet' || weaponType.name === 'Revolver')) {
    isRiffleWeapon.value = false
  }

  return isRiffleWeapon.value
})

const disabledMultiSelect = computed(() => {
  return form.value.caliberId === 0 || form.value.weaponTypeId === 0
})

/**
 * Verification que tout les store sont chager avant d'afficher la page
 */
const storesAreLoaded = computed(() => {
  return (
    calibersQueryIsSuccess &&
    factoriesQueryIsSuccess &&
    weaponTypesQueryIsSuccess &&
    materialsQueryIsSuccess &&
    categoriesQueryIsSuccess
  )
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

const setEditForm = (magazine: WeaponMagazineDto) => {
  form.value = {
    description: magazine.description,
    width: magazine.width,
    height: magazine.height,
    bodyId: magazine.body.id,
    factoryId: magazine.factory.id,
    reference: magazine.reference,
    capacity: magazine.capacity,
    caliberId: magazine.caliber.id,
    length: magazine.length,
    categoryId: magazine.category.id,
    compatibleHandGun: magazine.handguns,
    compatibleRiffle: magazine.riffles,
    weaponTypeId: magazine.forWeaponType.id
  }
  if (magazine.riffles.length > 0) {
    riffles$.value = riffleStore.getAll()
    selectedCompatibleWeapon.value = magazine.riffles.map((r) => r.id)
  }
  if (magazine.handguns.length > 0) {
    handguns$.value = handGunStore.getAll()
    selectedCompatibleWeapon.value = magazine.handguns.map((h) => h.id)
  }
  selectWeaponType(magazine.forWeaponType.id)
}
watchEffect(() => {
  if (magazine) {
    setEditForm(magazine)
    buttonLabel.value = 'global.edit'
  }
})
</script>

<style scoped></style>
