<template>
  <component :is="detailComponent" v-if="id" :id="id" :key="id" />
</template>
<script setup lang="ts">
import { RouterEnum } from '@/enum/router.enum'

import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import SoundReducerDetailComponent from '@/components/__accessory/rds/SoundReducerDetailComponent.vue'
import AmmunitionDetailView from '@/views/ammunition/AmmunitionDetailView.vue'
import OpticCollarDetailComponent from '@/components/__optic/OpticCollarDetailComponent.vue'
import OpticDetailComponent from '@/components/__optic/OpticDetailComponent.vue'
import RiffleDetailComponent from '@/components/__weapon/riffle/RiffleDetailComponent.vue'
import HandGunDetailComponent from '@/components/__weapon/handgun/HandGunDetailComponent.vue'
import MagazineDetailComponent from '@/components/__weaponMagazine/MagazineDetailComponent.vue'
import { useFormStore } from '@/stores/form.store'
import InvoiceDetailComponent from '@/components/__invoice/InvoiceDetailComponent.vue'
import { useOpticCollarStore } from '@/stores/optic-collar.store'
import { useWeaponMagazineStore } from '@/stores/weapon-magazine.store'
import { useAmmunitionStore } from '@/stores/ammunition.store'
import { useFactoryStore } from '@/stores/factory.store'
import { useSoundReducerStore } from '@/stores/sound-noise-reducer.store'
import { useOpticStore } from '@/stores/optic.store'
import { useInvoiceStore } from '@/stores/invoice.store'
import { useRiffleStore } from '@/stores/riffle.store'
import { useHandGunStore } from '@/stores/hand-gun.store'
import { useBreadcrumbStore } from '@/stores/breadcrumb.store'
import { useI18n } from 'vue-i18n'
const route = useRoute()
const breadcrumbStore = useBreadcrumbStore()
const { t } = useI18n()
const formStore = useFormStore()
const id = ref<string | undefined>(route.params.id ? (route.params.id as string) : undefined)
enum DetailRoute {
  RDS_DETAIL = RouterEnum.RDS_DETAIL,
  AMMUNITION_DETAIL = RouterEnum.AMMUNITION_DETAIL,
  OPTIC_COLLAR_DETAIL = RouterEnum.OPTIC_COLLAR_DETAIL,
  OPTIC_DETAIL = RouterEnum.OPTIC_DETAIL,
  RIFFLE_DETAIL = RouterEnum.RIFFLE_DETAIL,
  HANDGUN_DETAIL = RouterEnum.HANDGUN_DETAIL,
  MAGAZINE_DETAIL = RouterEnum.MAGAZINE_DETAIL,
  INVOICE_DETAIL = RouterEnum.INVOICE_DETAIL
}
const componentMap = {
  [DetailRoute.RDS_DETAIL]: SoundReducerDetailComponent,
  [DetailRoute.AMMUNITION_DETAIL]: AmmunitionDetailView,
  [DetailRoute.OPTIC_COLLAR_DETAIL]: OpticCollarDetailComponent,
  [DetailRoute.OPTIC_DETAIL]: OpticDetailComponent,
  [DetailRoute.RIFFLE_DETAIL]: RiffleDetailComponent,
  [DetailRoute.HANDGUN_DETAIL]: HandGunDetailComponent,
  [DetailRoute.MAGAZINE_DETAIL]: MagazineDetailComponent,
  [DetailRoute.INVOICE_DETAIL]: InvoiceDetailComponent
}

const storeMap = {
  [DetailRoute.OPTIC_COLLAR_DETAIL]: useOpticCollarStore,
  [DetailRoute.MAGAZINE_DETAIL]: useWeaponMagazineStore,
  [DetailRoute.AMMUNITION_DETAIL]: useAmmunitionStore,
  [DetailRoute.RDS_DETAIL]: useSoundReducerStore,
  [DetailRoute.OPTIC_DETAIL]: useOpticStore,
  [DetailRoute.INVOICE_DETAIL]: useInvoiceStore,
  [DetailRoute.RIFFLE_DETAIL]: useRiffleStore,
  [DetailRoute.HANDGUN_DETAIL]: useHandGunStore
}
const detailComponent = computed(() => componentMap[route.name as DetailRoute])
const currentStore = computed(() => {
  const storeFn = storeMap[route.name as DetailRoute]
  return storeFn ? storeFn() : null
})
formStore.setFormStatus('show')
watch(
  () => route.name,
  () => {
    if (currentStore.value) {
      const i18nPrefix = currentStore.value.getI18NPrefix
      breadcrumbStore.setStep({
        label: t(i18nPrefix + 'detail'),
        index: 2,
        path: route.fullPath
      })
    }
  },
  { immediate: true }
)
</script>

<style scoped></style>
