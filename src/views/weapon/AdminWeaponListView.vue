<template>
  <div class="card p-4">
    <riffle-list-component :category="category" v-if="isRiffleType" />
    <hand-gun-list-component :category="category" v-if="!isRiffleType" />
  </div>
</template>
<script setup lang="ts">
import RiffleListComponent from '@/components/__weapon/riffle/RiffleTableComponent.vue'
import { computed, watch } from 'vue'
import HandGunListComponent from '@/components/__weapon/handgun/HandGunTableComponent.vue'

import { WeaponEnum } from '@/enum/weapon.enum'
import { useBreadcrumbStore } from '@/stores/breadcrumb.store'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
export type WeaponViewType = 'riffle' | 'handgun'
const { category, type } = defineProps<{
  category: string
  type: WeaponViewType
}>()
const { t } = useI18n()
const route = useRoute()
const isRiffleType = computed(() => {
  return type === WeaponEnum.RIFFLE
})
const stepperStore = useBreadcrumbStore()
watch(
  () => [route.fullPath, category],
  () => {
    stepperStore.setStep({
      label: isRiffleType.value
        ? `${t('riffle.list')} ${t('global.category')}: ${category}`
        : `${t('handgun.list')} ${t('global.category')}: ${category}`,
      index: 1,
      path: route.fullPath
    })
  },
  { immediate: true }
)
</script>

<style scoped></style>
