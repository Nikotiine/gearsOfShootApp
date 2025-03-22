<template>
  <component :is="formComponent" />
</template>
<script setup lang="ts">
import { RouterEnum } from '@/enum/router.enum'
import OpticCollarTableComponent from '@/components/__optic/OpticCollarTableComponent.vue'
import MagazineTableComponent from '@/components/__weaponMagazine/MagazineTableComponent.vue'
import AmmunitionTableComponent from '@/components/__ammunition/AmmunitionTableComponent.vue'
import FactoriesTableComponent from '@/components/__factory/FactoriesTableComponent.vue'
import OpticTableComponent from '@/components/__optic/OpticTableComponent.vue'
import SoundReducerTableComponent from '@/components/__accessory/rds/SoundReducerTableComponent.vue'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
const route = useRoute()
enum TableRoute {
  OPTIC_LIST = RouterEnum.OPTIC_LIST,
  RDS_LIST = RouterEnum.RDS_LIST,
  FACTORY_LIST = RouterEnum.FACTORY_LIST,
  AMMUNITION_LIST = RouterEnum.AMMUNITION_LIST,
  MAGAZINE_LIST = RouterEnum.MAGAZINE_LIST,
  OPTIC_COLLAR_LIST = RouterEnum.OPTIC_COLLAR_LIST
}
const componentMap = {
  [TableRoute.OPTIC_COLLAR_LIST]: OpticCollarTableComponent,
  [TableRoute.MAGAZINE_LIST]: MagazineTableComponent,
  [TableRoute.AMMUNITION_LIST]: AmmunitionTableComponent,
  [TableRoute.FACTORY_LIST]: FactoriesTableComponent,
  [TableRoute.RDS_LIST]: SoundReducerTableComponent,
  [TableRoute.OPTIC_LIST]: OpticTableComponent
}

const formComponent = computed(() => componentMap[route.name as TableRoute])
</script>

<style scoped></style>
