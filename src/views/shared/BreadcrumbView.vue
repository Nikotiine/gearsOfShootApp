<template>
  <Breadcrumb :home="isAdmin ? adminHome : publicHome" :model="items">
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
import { useUserStore } from '@/stores/user.store'
import { AdminRouterEnum } from '@/enum/router/admin-router.enum'

const store = useBreadcrumbStore()
const { isAdmin } = useUserStore()
const gotToStep = store.goToStep
const { breadcrumbs: items } = storeToRefs(store)
const publicHome = ref<BreadCrumbState>({
  label: store.createLabel('publicDashboard', 'home'),
  index: 0,
  to: {
    name: PublicRouterEnum.HOME
  },
  icon: 'pi pi-home'
})
const adminHome = ref<BreadCrumbState>({
  label: store.createLabel('admin', 'home'),
  index: 0,
  to: {
    name: AdminRouterEnum.ADMIN_DASHBOARD
  },
  icon: 'pi pi-home'
})
</script>

<style scoped></style>
