<template>
  <Breadcrumb :home="home" :model="items">
    <template #item="{ item, props }">
      <a v-bind="props.action" @click="toto(item)" class="cursor-pointer">
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

const { home } = defineProps<{
  home: BreadCrumbState
}>()
const store = useBreadcrumbStore()
const toto = store.goToStep
const { breadcrumbs: items } = storeToRefs(store)
/*const home = ref({
  icon: 'pi pi-home',
  path: '/admin'
})*/
</script>

<style scoped></style>
