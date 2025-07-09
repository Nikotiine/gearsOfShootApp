<template>
  <component :is="detailComponent" v-if="id" :id="id" :key="id" />
</template>
<script setup lang="ts">
import { RouterEnum } from '@/enum/router.enum'

import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import SoundReducerDetailComponent from '@/components/__accessory/rds/SoundReducerDetailComponent.vue'
import AmmunitionDetailComponent from '@/components/__ammunition/AmmunitionDetailComponent.vue'
import OpticCollarDetailComponent from '@/components/__optic/OpticCollarDetailComponent.vue'
import OpticDetailComponent from '@/components/__optic/OpticDetailComponent.vue'
import RiffleDetailComponent from '@/components/__weapon/riffle/RiffleDetailComponent.vue'
import HandGunDetailComponent from '@/components/__weapon/handgun/HandGunDetailComponent.vue'
const route = useRoute()
const id = ref<string | undefined>(route.params.id ? (route.params.id as string) : undefined)
enum DetailRoute {
  RDS_DETAIL = RouterEnum.RDS_DETAIL,
  AMMUNITION_DETAIL = RouterEnum.AMMUNITION_DETAIL,
  OPTIC_COLLAR_DETAIL = RouterEnum.OPTIC_COLLAR_DETAIL,
  OPTIC_DETAIL = RouterEnum.OPTIC_DETAIL,
  RIFFLE_DETAIL = RouterEnum.RIFFLE_DETAIL,
  HANDGUN_DETAIL = RouterEnum.HANDGUN_DETAIL
}
const componentMap = {
  [DetailRoute.RDS_DETAIL]: SoundReducerDetailComponent,
  [DetailRoute.AMMUNITION_DETAIL]: AmmunitionDetailComponent,
  [DetailRoute.OPTIC_COLLAR_DETAIL]: OpticCollarDetailComponent,
  [DetailRoute.OPTIC_DETAIL]: OpticDetailComponent,
  [DetailRoute.RIFFLE_DETAIL]: RiffleDetailComponent,
  [DetailRoute.HANDGUN_DETAIL]: HandGunDetailComponent
}
const detailComponent = computed(() => componentMap[route.name as DetailRoute])
</script>

<style scoped></style>
