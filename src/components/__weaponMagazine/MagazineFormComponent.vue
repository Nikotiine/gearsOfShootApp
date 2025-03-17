<template>
  <div class="card">
    <h2 class="text-center mt-2 text-2xl">{{ t('magazine.' + formStatus) }}</h2>
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
            label="magazine.bodyMaterial"
            @option-id="(event) => (form.bodyId = event)"
            required
            input-id="bodyId"
            :initial-value="form.bodyId"
          />
          <input-group-addon-open-drawer-button type="material" />
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
            label="magazine.capacity"
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
        <save-button :status="formStatus" :disabled="!isFormValid" />
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
  WeaponTypeDto
} from '@/api/Api'
import { computed, ref, watch } from 'vue'
import InputGroup from 'primevue/inputgroup'
import InputGroupRequiredIcon from '@/components/__form/InputGroupRequiredIcon.vue'
import InputGroupSelect from '@/components/__form/InputGroupSelect.vue'
import InputGroupNumber from '@/components/__form/InputGroupNumber.vue'
import Textarea from 'primevue/textarea'
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
import { useWeaponCategoryStore } from '@/stores/weapon-category'
import type { FormStatus } from '@/types/form-status.type'
import SaveButton from '@/components/__form/SaveButton.vue'
import { WeaponEnum } from '@/enum/weapon.enum'

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
const { form, resetForm } = store.builder(id)
const riffles$ = ref<RiffleDto[]>([])
const handguns$ = ref<HandGunDto[]>([])
const { t } = useI18n()

const selectedCompatibleWeapon = ref<number[]>([])
const compatibleWeaponOptions = ref<VM[]>([])
const isFormValid = computed(() => {
  let isValid: boolean = false
  if (
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
    : (form.value.compatibleHandGun = findCompatibleHandgun(ids))
  if (!id) {
    create(form.value)
    resetForm()
  } else {
    edit({ ...form.value, id: parseInt(id) })
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
const findCompatibleHandgun = (ids: number[]): HandGunDto[] => {
  return handguns$.value.filter((handgun) => ids.includes(handgun.id))
}

const isRiffleWeapon = computed(() => {
  const isRiffleWeapon = ref<boolean>(true)
  let weaponType: WeaponTypeDto | undefined = undefined
  if (weaponTypes$.value) {
    weaponType = weaponTypes$.value.data.find((w) => w.id === form.value.weaponTypeId)
  }

  if (
    weaponType &&
    (weaponType.name === WeaponEnum.PISTOLET || weaponType.name === WeaponEnum.REVLOVER)
  ) {
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
</script>

<style scoped></style>
