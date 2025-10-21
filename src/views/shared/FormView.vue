<template>
  <FormWrapper v-if="formComponent" :form-component="formComponent" />
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed, ref, watch } from 'vue'
import FormWrapper from '@/views/shared/FormWrapper.vue'
import OpticCollarFormComponent from '@/components/__optic/OpticCollarFormComponent.vue'
import AmmunitionFormComponent from '@/components/__ammunition/AmmunitionFormComponent.vue'
import MagazineFormComponent from '@/components/__weaponMagazine/MagazineFormComponent.vue'
import FactoryFormComponent from '@/components/__factory/FactoryFormComponent.vue'
import OpticFormComponent from '@/components/__optic/OpticFormComponent.vue'
import MaterialFormComponent from '@/components/__color_and_material/MaterialFormComponent.vue'
import HeadTypeFormComponent from '@/components/__ammunition/HeadTypeFormComponent.vue'
import BodyTypeFormComponent from '@/components/__ammunition/BodyTypeFormComponent.vue'
import ThreadedSizeFormComponent from '@/components/__threaded-size/ThreadedSizeFormComponent.vue'
import WeaponTypeFormComponent from '@/components/__weapon/type/WeaponTypeFormComponent.vue'
import CaliberFormComponent from '@/components/__caliber/CaliberFormComponent.vue'
import ColorFormComponent from '@/components/__color_and_material/ColorFormComponent.vue'
import SoundReducerFormComponent from '@/components/__accessory/rds/SoundReducerFormComponent.vue'
import { RouterEnum } from '@/enum/router.enum'
import HandGunFormComponent from '@/components/__weapon/handgun/HandGunFormComponent.vue'
import RiffleFormComponent from '@/components/__weapon/riffle/RiffleFormComponent.vue'
import InvoiceFormComponent from '@/components/__invoice/InvoiceFormComponent.vue'
import { useBreadcrumbStore } from '@/stores/breadcrumb.store'
import { useOpticCollarStore } from '@/stores/optic-collar.store'
import { useWeaponMagazineStore } from '@/stores/weapon-magazine.store'
import { useAmmunitionStore } from '@/stores/ammunition.store'
import { useFactoryStore } from '@/stores/factory.store'
import { useSoundReducerStore } from '@/stores/sound-noise-reducer.store'
import { useOpticStore } from '@/stores/optic.store'
import { useInvoiceStore } from '@/stores/invoice.store'
import { useRiffleStore } from '@/stores/riffle.store'
import { useHandGunStore } from '@/stores/hand-gun.store'
import { useColorStore } from '@/stores/color.store'
import { useMaterialStore } from '@/stores/material.store'
import { useHeadTypeStore } from '@/stores/head-type.store'
import { useBodyTypeStore } from '@/stores/body-type.store'
import { useThreadedSizeStore } from '@/stores/threaded-size.store'
import { useWeaponTypeStore } from '@/stores/weapon-type.store'
import { useI18n } from 'vue-i18n'
import type { FormStatus } from '@/types/form-status.type'
const { t } = useI18n()
const route = useRoute()
const breadcrumbStore = useBreadcrumbStore()
enum RouterFormEnum {
  OPTIC_COLLAR_NEW = RouterEnum.OPTIC_COLLAR_NEW,
  OPTIC_COLLAR_EDIT = RouterEnum.OPTIC_COLLAR_EDIT,
  AMMUNITION_NEW = RouterEnum.AMMUNITION_NEW,
  AMMUNITION_EDIT = RouterEnum.AMMUNITION_EDIT,
  MAGAZINE_EDIT = RouterEnum.MAGAZINE_EDIT,
  MAGAZINE_NEW = RouterEnum.MAGAZINE_NEW,
  FACTORY_NEW = RouterEnum.FACTORY_NEW,
  OPTIC_EDIT = RouterEnum.OPTIC_EDIT,
  OPTIC_NEW = RouterEnum.OPTIC_NEW,
  RDS_EDIT = RouterEnum.RDS_EDIT,
  RDS_NEW = RouterEnum.RDS_NEW,
  COLOR_NEW = RouterEnum.COLOR_NEW,
  MATERIAL_NEW = RouterEnum.MATERIAL_NEW,
  HEAD_TYPE_NEW = RouterEnum.HEAD_TYPE_NEW,
  BODY_TYPE_NEW = RouterEnum.BODY_TYPE_NEW,
  THREADED_SIZE_NEW = RouterEnum.THREADED_SIZE_NEW,
  WEAPON_TYPE_NEW = RouterEnum.WEAPON_TYPE_NEW,
  CALIBER_NEW = RouterEnum.CALIBER_NEW,
  FACTORY_EDIT = RouterEnum.FACTORY_EDIT,
  HANDGUN_NEW = RouterEnum.HANDGUN_NEW,
  HANDGUN_EDIT = RouterEnum.HANDGUN_EDIT,
  RIFFLE_NEW = RouterEnum.RIFFLE_NEW,
  RIFFLE_EDIT = RouterEnum.RIFFLE_EDIT,
  INVOICE_NEW = RouterEnum.INVOICE_NEW
}

// Mapping entre les noms de route et les composants
const componentMap = {
  [RouterFormEnum.OPTIC_COLLAR_EDIT]: OpticCollarFormComponent,
  [RouterFormEnum.OPTIC_COLLAR_NEW]: OpticCollarFormComponent,
  [RouterFormEnum.AMMUNITION_NEW]: AmmunitionFormComponent,
  [RouterFormEnum.AMMUNITION_EDIT]: AmmunitionFormComponent,
  [RouterFormEnum.MAGAZINE_NEW]: MagazineFormComponent,
  [RouterFormEnum.MAGAZINE_EDIT]: MagazineFormComponent,
  [RouterFormEnum.FACTORY_NEW]: FactoryFormComponent,
  [RouterFormEnum.FACTORY_EDIT]: FactoryFormComponent,
  [RouterFormEnum.OPTIC_NEW]: OpticFormComponent,
  [RouterFormEnum.OPTIC_EDIT]: OpticFormComponent,
  [RouterFormEnum.COLOR_NEW]: ColorFormComponent,
  [RouterFormEnum.MATERIAL_NEW]: MaterialFormComponent,
  [RouterFormEnum.HEAD_TYPE_NEW]: HeadTypeFormComponent,
  [RouterFormEnum.BODY_TYPE_NEW]: BodyTypeFormComponent,
  [RouterFormEnum.THREADED_SIZE_NEW]: ThreadedSizeFormComponent,
  [RouterFormEnum.WEAPON_TYPE_NEW]: WeaponTypeFormComponent,
  [RouterFormEnum.CALIBER_NEW]: CaliberFormComponent,
  [RouterFormEnum.RDS_NEW]: SoundReducerFormComponent,
  [RouterFormEnum.RDS_EDIT]: SoundReducerFormComponent,

  [RouterFormEnum.HANDGUN_NEW]: HandGunFormComponent,
  [RouterFormEnum.HANDGUN_EDIT]: HandGunFormComponent,
  [RouterFormEnum.RIFFLE_NEW]: RiffleFormComponent,
  [RouterFormEnum.RIFFLE_EDIT]: RiffleFormComponent,
  [RouterFormEnum.INVOICE_NEW]: InvoiceFormComponent
}

const storeMap = {
  [RouterFormEnum.OPTIC_COLLAR_EDIT]: useOpticCollarStore,
  [RouterFormEnum.OPTIC_COLLAR_NEW]: useOpticCollarStore,
  [RouterFormEnum.MAGAZINE_NEW]: useWeaponMagazineStore,
  [RouterFormEnum.MAGAZINE_EDIT]: useWeaponMagazineStore,
  [RouterFormEnum.AMMUNITION_EDIT]: useAmmunitionStore,
  [RouterFormEnum.AMMUNITION_NEW]: useAmmunitionStore,
  [RouterFormEnum.FACTORY_NEW]: useFactoryStore,
  [RouterFormEnum.FACTORY_EDIT]: useFactoryStore,
  [RouterFormEnum.RDS_NEW]: useSoundReducerStore,
  [RouterFormEnum.RDS_EDIT]: useSoundReducerStore,
  [RouterFormEnum.OPTIC_NEW]: useOpticStore,
  [RouterFormEnum.OPTIC_EDIT]: useOpticStore,
  [RouterFormEnum.INVOICE_NEW]: useInvoiceStore,
  [RouterFormEnum.RIFFLE_NEW]: useRiffleStore,
  [RouterFormEnum.RIFFLE_EDIT]: useRiffleStore,
  [RouterFormEnum.HANDGUN_EDIT]: useHandGunStore,
  [RouterFormEnum.HANDGUN_NEW]: useHandGunStore,
  [RouterFormEnum.COLOR_NEW]: useColorStore,
  [RouterFormEnum.MATERIAL_NEW]: useMaterialStore,
  [RouterFormEnum.HEAD_TYPE_NEW]: useHeadTypeStore,
  [RouterFormEnum.BODY_TYPE_NEW]: useBodyTypeStore,
  [RouterFormEnum.THREADED_SIZE_NEW]: useThreadedSizeStore,
  [RouterFormEnum.WEAPON_TYPE_NEW]: useWeaponTypeStore,
  [RouterFormEnum.CALIBER_NEW]: useColorStore
}

const formComponent = computed(() => componentMap[route.name as RouterFormEnum])

const currentStore = computed(() => {
  const storeFn = storeMap[route.name as RouterFormEnum]
  return storeFn ? storeFn() : null
})
watch(
  () => route.name,
  () => {
    if (currentStore.value) {
      const formStatus = ref<FormStatus>(route.params.id ? 'edit' : 'save')
      const i18nPrefix = currentStore.value.getI18NPrefix
      breadcrumbStore.setStep({
        label: t(i18nPrefix + formStatus.value),
        index: 1,
        path: route.fullPath
      })
    }
  },
  { immediate: true }
)
</script>

<style scoped></style>
