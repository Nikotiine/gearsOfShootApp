<template>
  <Breadcrumb :home="home" :model="items">
    <template #item="{ item, props }">
      <a v-bind="props.action" @click="gotToStep(item)" class="cursor-pointer">
        <span :class="[item.icon, 'text-color']" />
        <span class="text-surface-700 dark:text-surface-0 font-semibold">{{ item.label }}</span>
      </a>
    </template>
  </Breadcrumb>
</template>
<script setup lang="ts">
import Breadcrumb from 'primevue/breadcrumb'
import { type BreadCrumbState, useBreadcrumbStore } from '@/stores/breadcrumb.store'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { PublicRouterEnum } from '@/enum/router/public-router.enum'

const store = useBreadcrumbStore()
const gotToStep = store.goToStep
const { breadcrumbs: items } = storeToRefs(store)
const home = ref<BreadCrumbState>({
  label: store.createLabel('publicDashboard', 'home'),
  index: 0,
  to: {
    name: PublicRouterEnum.HOME
  },
  icon: 'pi pi-home'
})
</script>

<style scoped></style>
