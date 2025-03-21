<template>
  <FormWrapper v-if="formComponent" :form-component="formComponent" />
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'
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

const route = useRoute()
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
  CALIBER_NEW = RouterEnum.CALIBER_NEW
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
  [RouterFormEnum.RDS_EDIT]: SoundReducerFormComponent
}

const formComponent = computed(() => componentMap[route.name as RouterFormEnum])
</script>

<style scoped></style>
