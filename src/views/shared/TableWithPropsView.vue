<template>
  <component :is="component" :category="category" />
</template>
<script setup lang="ts">
import { RouterEnum } from '@/enum/router.enum'
import AmmunitionTableView from '@/views/ammunition/AmmunitionTableView.vue'
import MagazineTableView from '@/views/weapon/magazine/MagazineTableView.vue'

import HandGunTableView from '@/views/weapon/handgun/HandGunTableView.vue'
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import RiffleTableComponent from '@/components/__weapon/riffle/RiffleTableComponent.vue'
import { useHandGunStore } from '@/stores/hand-gun.store'
import { useWeaponMagazineStore } from '@/stores/weapon-magazine.store'
import { useAmmunitionStore } from '@/stores/ammunition.store'
import { useRiffleStore } from '@/stores/riffle.store'
import { useBreadcrumbStore } from '@/stores/breadcrumb.store'
import { useI18n } from 'vue-i18n'
// Dependances
const route = useRoute()
const breadcrumbStore = useBreadcrumbStore()
const { t } = useI18n()

const { category } = defineProps<{
  category: string
}>()
enum TableWithProps {
  AMMUNITION = RouterEnum.AMMUNITION_LIST,
  MAGAZINE = RouterEnum.MAGAZINE_LIST,
  HANDGUN = RouterEnum.HANDGUN_LIST,
  RIFFLE = RouterEnum.RIFFLE_LIST
}

const componentMap = {
  [TableWithProps.HANDGUN]: HandGunTableView,
  [TableWithProps.AMMUNITION]: AmmunitionTableView,
  [TableWithProps.MAGAZINE]: MagazineTableView,
  [TableWithProps.RIFFLE]: RiffleTableComponent
}
const storeMap = {
  [TableWithProps.HANDGUN]: useHandGunStore,
  [TableWithProps.AMMUNITION]: useAmmunitionStore,
  [TableWithProps.MAGAZINE]: useWeaponMagazineStore,
  [TableWithProps.RIFFLE]: useRiffleStore
}
const component = computed(() => componentMap[route.name as TableWithProps])
const currentStore = computed(() => {
  const storeFn = storeMap[route.name as TableWithProps]
  return storeFn ? storeFn() : null
})
watch(
  () => route.name,
  () => {
    if (currentStore.value) {
      const i18nPrefix = currentStore.value.getI18NPrefix
      breadcrumbStore.setStep({
        label: t(i18nPrefix + 'list', { key: category }),
        index: 1,
        path: route.fullPath
      })
    }
  },
  { immediate: true }
)
</script>

<style scoped></style>
