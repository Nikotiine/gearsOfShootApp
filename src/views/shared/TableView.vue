<template>
  <component :is="formComponent" />
</template>
<script setup lang="ts">
import { AdminRouterEnum } from '@/enum/router/admin-router.enum'
import OpticCollarTableView from '@/views/optic/collar/OpticCollarTableView.vue'
import MagazineTableView from '@/views/weapon/magazine/MagazineTableView.vue'
import AmmunitionTableView from '@/views/ammunition/AmmunitionTableView.vue'
import FactoriesTableView from '@/views/factory/FactoriesTableView.vue'
import OpticTableView from '@/views/optic/OpticTableView.vue'
import SoundReducerTableView from '@/views/accessory/rds/SoundReducerTableView.vue'
import { useRoute } from 'vue-router'
import { computed, watch } from 'vue'
import { useOpticCollarStore } from '@/stores/optic-collar.store'
import { useWeaponMagazineStore } from '@/stores/weapon-magazine.store'
import { useAmmunitionStore } from '@/stores/ammunition.store'
import { useFactoryStore } from '@/stores/factory.store'
import { useSoundReducerStore } from '@/stores/sound-noise-reducer.store'
import { useOpticStore } from '@/stores/optic.store'
import { useBreadcrumbStore } from '@/stores/breadcrumb.store'
import { useI18n } from 'vue-i18n'
import InvoiceTableComponent from '@/components/__invoice/InvoiceTableComponent.vue'
import { useInvoiceStore } from '@/stores/invoice.store'

const route = useRoute()
const breadcrumbStore = useBreadcrumbStore()
const { t } = useI18n()
enum TableRoute {
  OPTIC_LIST = AdminRouterEnum.OPTIC_LIST,
  RDS_LIST = AdminRouterEnum.RDS_LIST,
  FACTORY_LIST = AdminRouterEnum.FACTORY_LIST,
  AMMUNITION_LIST = AdminRouterEnum.AMMUNITION_LIST,
  MAGAZINE_LIST = AdminRouterEnum.MAGAZINE_LIST,
  OPTIC_COLLAR_LIST = AdminRouterEnum.OPTIC_COLLAR_LIST,
  INVOICE_LIST = AdminRouterEnum.INVOICE_LIST
}
const componentMap = {
  [TableRoute.OPTIC_COLLAR_LIST]: OpticCollarTableView,
  [TableRoute.MAGAZINE_LIST]: MagazineTableView,
  [TableRoute.AMMUNITION_LIST]: AmmunitionTableView,
  [TableRoute.FACTORY_LIST]: FactoriesTableView,
  [TableRoute.RDS_LIST]: SoundReducerTableView,
  [TableRoute.OPTIC_LIST]: OpticTableView,
  [TableRoute.INVOICE_LIST]: InvoiceTableComponent
}
const storeMap = {
  [TableRoute.OPTIC_COLLAR_LIST]: useOpticCollarStore,
  [TableRoute.MAGAZINE_LIST]: useWeaponMagazineStore,
  [TableRoute.AMMUNITION_LIST]: useAmmunitionStore,
  [TableRoute.FACTORY_LIST]: useFactoryStore,
  [TableRoute.RDS_LIST]: useSoundReducerStore,
  [TableRoute.OPTIC_LIST]: useOpticStore,
  [TableRoute.INVOICE_LIST]: useInvoiceStore
}

const formComponent = computed(() => componentMap[route.name as TableRoute])
const currentStore = computed(() => {
  const storeFn = storeMap[route.name as TableRoute]
  return storeFn ? storeFn() : null
})

watch(
  () => route.name,
  () => {
    if (currentStore.value) {
      const i18nPrefix = currentStore.value.getI18NPrefix
      breadcrumbStore.setStep({
        label: t(i18nPrefix + 'list'),
        index: 1,
        path: route.fullPath
      })
    }
  },
  { immediate: true }
)
</script>

<style scoped></style>
