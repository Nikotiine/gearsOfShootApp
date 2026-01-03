<template>
  <component :is="detailComponent" v-if="id" :id="id" :key="id" :isAdminRoute="isAdminRoute" />
</template>

<script setup lang="ts">
import { PublicRouterEnum } from '@/enum/router/public-router.enum'
import SoundReducerDetailView from '@/views/accessory/rds/SoundReducerDetailView.vue'
import AmmunitionDetailView from '@/views/ammunition/AmmunitionDetailView.vue'
import OpticDetailView from '@/views/optic/OpticDetailView.vue'
import RiffleDetailView from '@/views/weapon/riffle/RiffleDetailView.vue'
import HandGunDetailView from '@/views/weapon/handgun/HandGunDetailView.vue'
import MagazineDetailView from '@/views/weapon/magazine/MagazineDetailView.vue'
import { useWeaponMagazineStore } from '@/stores/weapon-magazine.store'
import { useAmmunitionStore } from '@/stores/ammunition.store'
import { useSoundReducerStore } from '@/stores/sound-noise-reducer.store'
import { useOpticStore } from '@/stores/optic.store'
import { useRiffleStore } from '@/stores/riffle.store'
import { useHandGunStore } from '@/stores/hand-gun.store'
import { computed, type Ref, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useBreadcrumbStore } from '@/stores/breadcrumb.store'

const route = useRoute()
const breadcrumbStore = useBreadcrumbStore()
const id = ref<string | undefined>(route.params.id ? (route.params.id as string) : undefined)
enum DetailRoute {
  RDS_DETAIL = PublicRouterEnum.PUBLIC_RDS_DETAIL,
  AMMUNITION_DETAIL = PublicRouterEnum.PUBLIC_AMMUNITION_DETAIL,
  //OPTIC_COLLAR_DETAIL = PublicRouterEnum.PUBLIC_OPTIC_DETAIL,
  OPTIC_DETAIL = PublicRouterEnum.PUBLIC_OPTIC_DETAIL,
  RIFFLE_DETAIL = PublicRouterEnum.PUBLIC_RIFFLE_DETAIL,
  HANDGUN_DETAIL = PublicRouterEnum.PUBLIC_HANDGUN_DETAIL,
  MAGAZINE_DETAIL = PublicRouterEnum.PUBLIC_MAGAZINE_DETAIL
}
const componentMap = {
  [DetailRoute.RDS_DETAIL]: SoundReducerDetailView,
  [DetailRoute.AMMUNITION_DETAIL]: AmmunitionDetailView,
  // [DetailRoute.OPTIC_COLLAR_DETAIL]: OpticCollarDetailView,
  [DetailRoute.OPTIC_DETAIL]: OpticDetailView,
  [DetailRoute.RIFFLE_DETAIL]: RiffleDetailView,
  [DetailRoute.HANDGUN_DETAIL]: HandGunDetailView,
  [DetailRoute.MAGAZINE_DETAIL]: MagazineDetailView
}
const storeMap = {
  // [DetailRoute.OPTIC_COLLAR_DETAIL]: useOpticCollarStore,
  [DetailRoute.MAGAZINE_DETAIL]: useWeaponMagazineStore,
  [DetailRoute.AMMUNITION_DETAIL]: useAmmunitionStore,
  [DetailRoute.RDS_DETAIL]: useSoundReducerStore,
  [DetailRoute.OPTIC_DETAIL]: useOpticStore,

  [DetailRoute.RIFFLE_DETAIL]: useRiffleStore,
  [DetailRoute.HANDGUN_DETAIL]: useHandGunStore
}

const detailComponent = computed(() => componentMap[route.name as DetailRoute])
const currentStore = computed(() => {
  const storeFn = storeMap[route.name as DetailRoute]
  return storeFn ? storeFn() : null
})
const isAdminRoute = computed<boolean>(() => {
  return Boolean(route.meta.admin)
})
</script>

<style scoped></style>
